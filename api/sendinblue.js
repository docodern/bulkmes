const SibApiV3Sdk = require('sib-api-v3-sdk');
const defaultClient = SibApiV3Sdk.ApiClient.instance;

// Configure API key authorization: api-key
var apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = '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';

let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();


const sendinblue = (sendSmtpEmail) => {
    apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
        console.log('API called successfully. Returned data: ' + JSON.stringify(data));
      }, function(error) {
        console.error(error);
      });
}

module.exports = sendinblue