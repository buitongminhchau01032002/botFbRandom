const request = require('request')
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;


// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
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
            console.log('message sent!')
        } else {
            console.error("Unable to send message:" + err);
        }
    });
}

const replayGET_STARTED = (sender_psid) => {
    let response1;
    let profile = getProfile(sender_psid);
    response1 = { "text": `Xin chào ${profile.first_name} ${profile.last_name}, mình là Mitoo` };
    callSendAPI(sender_psid, response1);
}



const getProfile = (sender_psid) => {

    let profile = {};

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name&access_token=${PAGE_ACCESS_TOKEN}`,
        "method": "GET",
    }, (err, res, body) => {
        if (!err) {
            console.log('get profile done');
            console.log(body);
            profile = JSON.parse(body);
        } else {
            console.error("get profile error: " + err);
        }
    });
    console.log(profile);

    return profile;
}


module.exports = {
    replayGET_STARTED
}