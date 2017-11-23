var accountSid = 'ACe1203a0b63e50b40aa0bb45685e8fbcb'; // Your Account SID from www.twilio.com/console
var authToken = '6b8baf669614f5f1e5f2c418c6f6aa98';   // Your Auth Token from www.twilio.com/console

var twilio = require('twilio');
var client = new twilio(accountSid, authToken);

function sendSMS(token) {
    console.log("enterinf sendSMS");
    client.messages.create({
        body: 'Your Token ID: ',
        to: '+919082963428',  // Text this number
        from: '+12345678901' // From a valid Twilio number
    })
        .then((message) => console.log("---------------", message.sid));
}

module.exports = {
    sendSMS
}