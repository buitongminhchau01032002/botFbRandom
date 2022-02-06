const request = require('request');
const templates = require('./templates');
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const BOT = 'Mitoo'

let stateChoose = {}

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
    return new Promise((resolve, reject) => {
        // Construct the message body
        let request_body = {
            "recipient": {
                "id": sender_psid
            },
            "message": response
        }

        // Send the HTTP request to the Messenger Platform
        request({
            "uri": "https://graph.facebook.com/v12.0/me/messages",
            "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
            "method": "POST",
            "json": request_body
        }, (err, res, body) => {
            if (!err) {
                console.log('message sent!');
                return resolve('');
            } else {
                console.error("Unable to send message:" + err);
                return reject(err);
            }
        });
    })

}
const getProfile = (sender_psid) => {
    return new Promise((resolve, reject) => {
        request({
            "uri": `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name&access_token=${PAGE_ACCESS_TOKEN}`,
            "method": "GET",
        }, (err, res, body) => {
            if (!err) {
                console.log('get profile done');
                profile = JSON.parse(body);
                console.log(profile);
                return resolve(profile);
            } else {
                console.error("get profile error: " + err);
                return reject(error);
            }
        });
    })
}

const sendQuickReply = (sender_psid, response) => {
    return new Promise((resolve, reject) => {
        // Construct the message body
        let request_body = {
            "recipient": {
                "id": sender_psid
            },
            "messaging_type": "RESPONSE",
            "message": response
        }

        // Send the HTTP request to the Messenger Platform
        request({
            "uri": "https://graph.facebook.com/v12.0/me/messages",
            "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
            "method": "POST",
            "json": request_body
        }, (err, res, body) => {
            if (!err) {
                console.log('message sent!');
                return resolve('');
            } else {
                console.error("Unable to send message:" + err);
                return reject(err);
            }
        });
    })
}


const replyGET_STARTED = async (sender_psid) => {
    let response1;
    response1 = { "text": `🙆‍♀️ Chào bạn, mình là ${BOT}` };
    let response2 = templates.mainMenu();
    await callSendAPI(sender_psid, response1);
    await callSendAPI(sender_psid, response2);
}

const replyMAIN_MENU = async (sender_psid) => {
    let response = templates.mainMenu();
    await callSendAPI(sender_psid, {
        text: `💁‍♀️ ${BOT} có một vài chức năng để bạn sử dụng nè ^^`
    });
    await callSendAPI(sender_psid, response);
}


const replySTART = async (sender_psid) => {
    let response = templates.start();
    await callSendAPI(sender_psid, response);
    delete stateChoose[sender_psid];
}


const replyCOIN_START = async (sender_psid) => {

    // Thêm ảnh

    let response1;
    let randString = Math.floor(Math.random() * 2) === 0 ? 'sấp' : 'ngửa';
    response1 = { "text": `${BOT} tung được mặt "${randString}" nè 😊` };
    await callSendAPI(sender_psid, response1);
    await sendQuickReply(sender_psid, templates.contiCoin());
}

const replyDICE_START = async (sender_psid) => {
    await sendQuickReply(sender_psid, templates.diceNum());
}

const replyDICE_FINISH = async (sender_psid, quantity) => {

    let num = [];
    for (let i = 0; i < quantity; i++) {
        num.push(Math.floor(Math.random() * 6) + 1);
    }

    for (let i = 0; i < quantity; i++) {
        let imgResponse = templates.imgDice(num[i]);
        await callSendAPI(sender_psid, imgResponse);
    }
    let responseString = `${BOT} tung được `;
    for (let i = 0; i < quantity; i++) {
        responseString += `${toSymbol(num[i]+'')} `;
    }
    responseString += 'nè!';
    await callSendAPI(sender_psid, { text: responseString });
    await sendQuickReply(sender_psid, templates.contiDice(quantity));
}

const replyCHOOSE_START = async (sender_psid) => {
    stateChoose[sender_psid] = [];
    await sendQuickReply(sender_psid, templates.chooseTyping());
}

const replyAddChoose = async (sender_psid, received_message) => {
    stateChoose[sender_psid].push(received_message.text)
    let stringList = stateChoose[sender_psid].reduce((str, cur) => str + `👉 ${cur} \n`, '')
    let response = { "text": "Các lựa chọn 📌: \n" + stringList };
    await callSendAPI(sender_psid, response);
    await sendQuickReply(sender_psid, templates.chooseTyping());
}

const replyCHOOSE_SUBMIT = async (sender_psid) => {

    // Add logic

    if (stateChoose[sender_psid].length === 0) {
        await callSendAPI(sender_psid, {
            text: `Bạn chưa gửi cho ${BOT} lựa chọn nào cả 😭😭😭`
        });
    } else if (stateChoose[sender_psid].length === 1) {
        await callSendAPI(sender_psid, {
            text: `Bạn chỉ có một lựa chọn thôi 😂, đó là: \n 👉 ${stateChoose[sender_psid][0]}`
        });
    } else {
        let rand = Math.floor(Math.random() * (stateChoose[sender_psid].length));
        let str = stateChoose[sender_psid][rand];
        await callSendAPI(sender_psid, {
            text: `${BOT} chọn được rồi nè 😊, đó là: \n 👉 ${str}`
        });
    }

    await sendQuickReply(sender_psid, templates.contiChoose());
    delete stateChoose[sender_psid];
    

}

// 0⃣1⃣2⃣3⃣4⃣5⃣6⃣7⃣8⃣9⃣

function toSymbol(str) {
    switch (str) {
        case "0":
            return '0⃣';
        case "1":
            return '1⃣';
        case "2":
            return '2⃣';
        case "3":
            return '3⃣';
        case "4":
            return '4⃣';
        case "5":
            return '5⃣';
        case "6":
            return '6⃣';
        case "7":
            return '7⃣';
        case "8":
            return '8⃣';
        case "9":
            return '9⃣';

        default:
            return '';
    }
}

module.exports = {
    stateChoose,
    replyGET_STARTED,
    replySTART,
    replyMAIN_MENU,
    replyCOIN_START,
    replyDICE_START,
    replyDICE_FINISH,
    replyCHOOSE_START,
    replyCHOOSE_SUBMIT,
    replyAddChoose
}