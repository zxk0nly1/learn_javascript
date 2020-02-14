// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure
const accountSid = 'AC886ee57e81b71c9bcc63e1e2b01480b7';
const authToken = '4f9dc13b4d24fd071b80a7a5689aca61';
const client = require('twilio')(accountSid, authToken);

client.calls.create({
         url: 'http://demo.twilio.com/docs/voice.xml',
         to: '+8613709635045',
         from: '+15308365308'
       }).then(call => console.log(call.sid));