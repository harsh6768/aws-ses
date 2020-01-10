let AWS                     =       require("aws-sdk");
let path                    =       require("path");

let configPath = path.join(__dirname, "../config/config.json");

AWS.config.loadFromPath(configPath);
// Instantiate SES.
var ses = new AWS.SES();

// Edit this with YOUR email address which are verified on aws ses plateform
var email = "harshchaurasiya6768@gmail.com";
let email1 = "harshchaurasiyahc123@gmail.com";

let verifyEmail = (req, res) => {
  // const email = req.body.email;

  let params = {
    EmailAddress: email1
  };

  //ses.verifyEmailIdentity() we can also use this method to verify the email
  ses.verifyEmailAddress(params, function(err, data) {
    if (err) res.send(err);
    else res.send(data);
  });
};

let listVerifiedEmails = (req, res) => {
  ses.listVerifiedEmailAddresses(function(err, data) {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
};

let deleteVerifiedEmail = (req, res) => {
  // const email = req.body.email;
  let params = {
    EmailAddress: email1
  };

  ses.deleteVerifiedEmailAddress(params, function(err, data) {
    if (err) res.send(err);
    else res.send(data);
  });
};

let createEmailTemplate = (req, res) => {
  var params = {
    Template: {
      TemplateName: "PROFILE-UPDATED-2",
      SubjectPart: "Greetings, {{name}}!",
      TextPart: "Dear {{name}},\r\nYour favorite animal is {{favoritecolor}}.",
      HtmlPart:
        "<h1>Hello {{name}}</h1><p>Your age is {{age}}<br/></p><p>Your favorite color is {{favoritecolor}}.</p>"
    }
  };

  ses.createTemplate(params, (err, data) => {
    if (err) throw err;
    res.send(data);
  });
};

let getListOfTemplates = (req, res) => {

  ses.listCustomVerificationEmailTemplates((err,data)=>{
    if(err) res.send(err.message);
    else res.send(data);
  })
};

let updateTemplate = (req, res) => {};

let sendEmail = (req, res) => {
  let params = {
    Destination: {
      //   CsAddresses: [],
      ToAddresses: ["harshchaurasiyahc123@gmail.com"]
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data:
            "<h1>We are from Jungleworks .</h1><br><p>You are getting this email because you have subscribed our News Letter</p>"
        }
        // Text: {
        //   Charset: "UTF-8",
        //   Data: "Hello from the amazon.com SES send email to test SES"
        // }
      },
      Subject: {
        Charset: "UTF-8",
        Data: "SES send email test"
      }
    },
    Source: "harshchaurasiya6768@gmail.com" /* required */
    // ReplyToAddresses: [
    //   "EMAIL_ADDRESS"
    //   /* more items */
    // ]
  };

  // Create the promise and SES service object

  ses.sendEmail(params, (err, data) => {
    if (err) throw err;
    res.send(data);
  });
};

let sendTemplateEmail = (req, res) => {
  let params = {
    Source: "harshchaurasiya6768@gmail.com",
    Template: "PROFILE-UPDATED-1",
    Destination: {
      ToAddresses: ["harshchaurasiyahc123@gmail.com"]
    },
    TemplateData: '{ "name":"Harsh", "favoritecolor": "Black ","age":21 }'
  };

  // Create the promise and SES service object
  let templatePromise = new AWS.SES({ apiVersion: "2010-12-01" })
    .sendTemplatedEmail(params)
    .promise();

  // Handle promise's fulfilled/rejected states
  templatePromise
    .then(function(data) {
      console.log(data);
      res.send(data);
    })
    .catch(function(err) {
      console.error(err, err.stack);
      res.send(err);
    });
};

let createCustomisedEmailTemplate = (req, res) => {
  let params = {
    Template: {
      TemplateName: "Preferences-1",
      SubjectPart:
        "Subscription Preferences for {{contact.firstName}} {{contact.lastName}}",
      HtmlPart: `<h1>Your Preferences</h1>
                           <p>You have indicated that you are interested in receiving 
                             information about the following subjects:</p>
                           <ul>
                             {{#each subscription}}
                               <li>{{interest}}</li>
                             {{/each}}
                           </ul>
                           <p>You can change these settings at any time by visiting 
                              the <a href=https://www.example.com/prefererences/i.aspx?id={{meta.userId}}>
                              Preference Center</a>.</p>`,
      TextPart: `Your Preferences\n\nYou have indicated that you are interested in 
                           receiving information about the following subjects:\n
                           {{#each subscription}}
                             - {{interest}}\n
                           {{/each}}
                           \nYou can change these settings at any time by 
                           visiting the Preference Center at 
                           https://www.example.com/prefererences/i.aspx?id={{meta.userId}}`
    }
  };

  ses.createTemplate(params, (err, data) => {
    if (err) throw err;
    res.send(data);
  });
};

let sendBulkWithCustomisedEmail = (req, res) => {
  let params = {
    Source: "harshchaurasiya6768@gmail.com",
    Template: "Preferences",
    Destinations: [
      {
        Destination: {
          ToAddresses: ["harshchaurasiya6768@gmail.com"]
        },
        ReplacementTemplateData:
          '{"meta":{"userId":"51806220607"},"contact":{"firstName":"Octivia","lastName":"Iyengar"},"subscription":[{"interest":"Sports"},{"interest":"Travel"},{"interest":"Cooking"}]}'
      },
      {
        Destination: {
          ToAddresses: ["harshchaurasiyahc123@gmail.com"]
        },
        ReplacementTemplateData:
          '{"meta":{"userId":"1981624758263"},"contact":{"firstName":"Harsh","lastName":"Chaurasiya"},"subscription":[{"interest":"Technology"},{"interest":"Politics"}]}'
      }
    ],
    DefaultTemplateData:
      '{"meta":{"userId":""},"contact":{"firstName":"Friend","lastName":""},"subscription":[]}'
  };

  let templatePromise = new AWS.SES({ apiVersion: "2010-12-01" })
    .sendBulkTemplatedEmail(params)
    .promise();

  // Handle promise's fulfilled/rejected states
  templatePromise
    .then(function(data) {
      console.log(data);
      res.send(data);
    })
    .catch(function(err) {
      console.error(err, err.stack);
      res.send(err);
    });
};

/**
 * createCustomTemplateEmailVerification won't work because we are in sandbox
 * @param {*} req 
 * @param {*} res 
 */
let createCustomTemplateForEmailVerification= (req, res) => {
  let params = {
    TemplateName: "A-VerifyEmail-2",
    FromEmailAddress: "harshchaurasiya6768@gmail.com",
    TemplateSubject: "Please confirm your email address",
    TemplateContent: `<html>
                        <head></head>
                        <body style="font-family:sans-serif;">
                          <h1 style="text-align:center">Ready to start sending 
                          email with ProductName?</h1>
                          <p>We here at Example Corp are happy to have you on
                            board! There's just one last step to complete before
                            you can start sending email. Just click the following
                            link to verify your email address. Once we confirm that 
                            you're really you, we'll give you some additional 
                            information to help you get started with ProductName.</p>
                        </body>
                        </html>`,
    SuccessRedirectionURL: "https://www.example.com/verifysuccess",
    FailureRedirectionURL: "https://www.example.com/verifyfailure"
  };

  var templatePromise = new AWS.SES({ apiVersion: "2010-12-01" })
    .createCustomVerificationEmailTemplate(params)
    .promise();

  // Handle promise's fulfilled/rejected states
  templatePromise
    .then(function(data) {
      console.log(data);
      res.send(data);
    })
    .catch(function(err) {
      console.error(err, err.stack);
      res.send(err);
    });
}

module.exports = {
  verifyEmail,
  listVerifiedEmails,
  deleteVerifiedEmail,
  createEmailTemplate,
  getListOfTemplates,
  updateTemplate,
  sendEmail,
  sendTemplateEmail,
  createCustomisedEmailTemplate,
  sendBulkWithCustomisedEmail,
  createCustomTemplateForEmailVerification
};
