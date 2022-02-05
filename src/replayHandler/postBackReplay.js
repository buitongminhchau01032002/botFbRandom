const request = require('request')
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

const replayGET_STARTED = async (sender_psid) => {
    let response1;
    let profile = await getProfile(sender_psid);
    response1 = { "text": `Xin chào ${profile.last_name} ${profile.first_name}, mình là Mitoo` };
    let response2 = getMainMenu();
    await callSendAPI(sender_psid, response1);
    await callSendAPI(sender_psid, response2);
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


const getMainMenu = () => {
    return {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "Mình là Mitoo",
                        "subtitle": "Bạn có thể trò chuyện với Mitoo bằng một số lựa chọn bên dưới",
                        "image_url": "https://picsum.photos/id/102/300/400",
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Mitoo là ai?",
                                "payload": "ABOUT",
                            },
                            {
                                "type": "postback",
                                "title": "Bắt đầu ngay",
                                "payload": "START",
                            },
                            {
                                "type": "postback",
                                "title": "Góp ý cho Mitoo",
                                "payload": "FEED_BACK",
                            }
                        ],
                    },
                    {
                        "title": "Mình là Mitoo",
                        "subtitle": "Bạn có thể trò chuyện với Mitoo bằng một số lựa chọn bên dưới",
                        "image_url": "https://picsum.photos/id/102/300/400",
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Mitoo là ai?",
                                "payload": "ABOUT",
                            },
                            {
                                "type": "postback",
                                "title": "Bắt đầu ngay",
                                "payload": "START",
                            },
                            {
                                "type": "postback",
                                "title": "Góp ý cho Mitoo",
                                "payload": "FEED_BACK",
                            }
                        ],
                    }
                ]
            }
        }
    }
}

module.exports = {
    replayGET_STARTED
}