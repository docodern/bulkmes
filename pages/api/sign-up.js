const SibApiV3Sdk = require('sib-api-v3-sdk');
const defaultClient = SibApiV3Sdk.ApiClient.instance;

export default async function handler(req, res) {
  const body = req.body;

  if (!body.email) {
    return res.status(400).json({
      error: "Email not found",
    });
  }

  var apiKey = defaultClient.authentications['api-key'];
  apiKey.apiKey = process.env.NEXT_PUBLIC_SENDINBLUE_API;

  let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  sendSmtpEmail.subject = `${body.subject ? body.subject + " " + body.email : "Contact Form"}`;
  sendSmtpEmail.to = [{"email":"support@bulkmes.com"}];
  sendSmtpEmail.params = {
    "FIRSTNAME": body.name,
    "EMAIL": body.email,
    "TEXT": body.text,
    "SMS": body.sms ? body.sms : ""
  };
  sendSmtpEmail.templateId = body.id;



  const sendinblue = (sendSmtpEmail) => {
    apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
        console.log('API called successfully. Returned data: ' + JSON.stringify(data));
        res.redirect(302, "/");
      }, function(error) {
        console.error(error);
        res.status(400).json({
          error
        });
      });
  }

  sendinblue(sendSmtpEmail);

}
