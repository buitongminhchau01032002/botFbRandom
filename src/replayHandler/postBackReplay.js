const {callSendAPI} = require('../fbHandler');

const replayGET_STARTED = (sender_psid) => {
    let response1;
    response1 = {"text": 'Xin chào ABC, mình là Mitoo'};
    callSendAPI(sender_psid, response1);
}

module.exports = {
    replayGET_STARTED
}