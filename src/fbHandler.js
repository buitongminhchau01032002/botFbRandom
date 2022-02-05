require('dotenv').config();
const request = require('request')
const sendMess = require('./replyHandler/postBackReply')
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

// Handles messages events
function handleMessage(sender_psid, received_message) {
    // Checks if the message contains text
    if (received_message.quick_reply) {
        // Create the payload for a basic text message, which
        // will be added to the body of our request to the Send API
        handleQuickReply(sender_psid, received_message);
    } 
}

const handleQuickReply = (sender_psid, received_message) => {
    let payload = received_message.quick_reply.payload;
    switch (payload) {
        case 'START':
            sendMess.replySTART(sender_psid);
            break;
        case 'COIN_START':
            sendMess.replyCOIN_START(sender_psid);
            break;
        default:
            console.log('Incorrect quick reply');
    }
}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {
    let response;

    // Get the payload for the postback
    let payload = received_postback.payload;

    // Set the response based on the postback payload
    switch (payload) {
        case 'GET_STARTED':
            sendMess.replyGET_STARTED(sender_psid);
            break;
        case 'MAIN_MENU':
            sendMess.replyMAIN_MENU(sender_psid);
            break;
        case 'START':
            sendMess.replySTART(sender_psid);
            break;
        case 'COIN_START':
            sendMess.replyCOIN_START(sender_psid);
            break;
        default:
            response = { "text": "Ôoo! Mitoo không hiểu được tin nhắn của bạn" }
    }
}

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
        "qs": { "access_token": PAGE_ACCESS_TOKEN },
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




module.exports = {
    handleMessage,
    handlePostback,
    callSendAPI
}