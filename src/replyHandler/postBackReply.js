const request = require('request');
const templates = require('./templates');
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const BOT = 'Mitoo'

let stateChoose = []

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
    let profile = await getProfile(sender_psid);
    response1 = { "text": `Xin chào ${profile.last_name} ${profile.first_name}, mình là ${BOT}` };
    let response2 = templates.mainMenu();
    await callSendAPI(sender_psid, response1);
    await callSendAPI(sender_psid, response2);
}

const replyMAIN_MENU = async (sender_psid) => {
    let response = templates.mainMenu();
    await callSendAPI(sender_psid, response);
}


const replySTART = async (sender_psid) => {
    let response = templates.start();
    await callSendAPI(sender_psid, response);
}


const replyCOIN_START = async (sender_psid) => {

    // Thêm ảnh

    let response1;
    let randString = Math.floor(Math.random() * 2) === 0 ? 'sấp' : 'ngửa';
    response1 = { "text": `${BOT} tung được mặt "${randString}" nè!` };
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
    let responseString = `${BOT} tung được "${num[0]}"`;
    for (let i = 1; i < quantity; i++) {
        responseString += `, "${num[i]}" `;
    }
    responseString += (quantity === 1 ? " nè!" : "nè!");
    await callSendAPI(sender_psid, { text: responseString });
    await sendQuickReply(sender_psid, templates.contiDice(quantity));
}

const replyCHOOSE_START = async (sender_psid) => {
    stateChoose = stateChoose.filter(item => item.id !== sender_psid);
    await sendQuickReply(sender_psid, templates.chooseTyping());
    stateChoose.push({
        id: sender_psid,
        listChoose: []
    })
    console.log(stateChoose)
}

const replyCHOOSE_SUBMIT = async (sender_psid) => {

    await sendQuickReply(sender_psid, templates.contiChoose());

}

module.exports = {
    replyGET_STARTED,
    replySTART,
    replyMAIN_MENU,
    replyCOIN_START,
    replyDICE_START,
    replyDICE_FINISH,
    replyCHOOSE_START,
    replyCHOOSE_SUBMIT
}