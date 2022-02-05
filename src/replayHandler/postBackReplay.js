const request = require('request');
const template = require('../templates');
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;


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

const replayGET_STARTED = async (sender_psid) => {
    let response1;
    let profile = await getProfile(sender_psid);
    response1 = { "text": `Xin chào ${profile.last_name} ${profile.first_name}, mình là Mitoo` };
    let response2 = template.getMainMenuTemplate();
    await callSendAPI(sender_psid, response1);
    await callSendAPI(sender_psid, response2);
}

const replayMAIN_MENU = async (sender_psid) => {
    let response = template.getMainMenuTemplate();
    await callSendAPI(sender_psid, response);
}


const replaySTART = async (sender_psid) => {
    let response = template.getStartTemplate();
    await callSendAPI(sender_psid, response);
}



module.exports = {
    replayGET_STARTED,
    replaySTART,
    replayMAIN_MENU
}