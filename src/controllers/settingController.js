require('dotenv').config();
const request = require('request');
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN

const getstartedButtonController = (req, res) => {
    // Construct the message body
    let request_body = {
        "get_started": {
            "payload": "GET_STARTED"
        }
    }

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": `https://graph.facebook.com/v2.6/me/messenger_profile?access_token=${PAGE_ACCESS_TOKEN}`,
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log(body);
        } else {
            console.error("Erorr");
            console.error(body);
        }
    });

    return res.send('create get started btn action');
}

module.exports = {
    getstartedButtonController
}