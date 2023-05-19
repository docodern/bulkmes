const SibApiV3Sdk = require('sib-api-v3-sdk');
const defaultClient = SibApiV3Sdk.ApiClient.instance;

// Configure API key authorization: api-key
var apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.NEXT_PUBLIC_SENDINBLUE_API;

let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();


const sendinblue = (sendSmtpEmail) => {
    apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
        console.log('API called successfully. Returned data: ' + JSON.stringify(data));
      }, function(error) {
        console.error(error);
      });
}

module.exports = sendinblue