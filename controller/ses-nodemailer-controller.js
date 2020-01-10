//https://www.npmjs.com/package/handlebars

let aws                     =       require("aws-sdk");
let path                    =       require('path')
let nodemailer              =       require("nodemailer");
let Handlebars              =       require("handlebars");

let configPath              =       path.join(__dirname, "../config/config.json");

// configure AWS SDK
aws.config.loadFromPath(configPath);


// create Nodemailer SES transporter
let transporter = nodemailer.createTransport({
  SES: new aws.SES({
    apiVersion: "2010-12-01"
  })
});

let sendEmailWithNodemailer = (req, res) => {

  //importing html template as js object
  let source = require('../email-templates/test_template').source;

  //compile the html template
  let template = Handlebars.compile(source);

  let data = {
    "MC:SUBJECT": "TEST_SUBJECT",
    MC_PREVIEW_TEXT: "TEST_PREVIEW_TEXT",
    ActivationCode: "https://sylvan.com?activationCode=vfso3kdo53kd",
    CURRENT_YEAR: "2020"
  };

  let resultedTemplate = template(data);

  // send some mail
  transporter.sendMail(
    {
      from: "harshchaurasiya6768@gmail.com",  //email should be verified on aws plateform
      to: "harshchaurasiyahc123@gmail.com",   //if you are in sand box then to email should also verified
      subject: "Test Message",
      html: resultedTemplate,
      ses: {
        // optional extra arguments for SendRawEmail
        // Tags: [{
        //     Name: 'tag name',
        //     Value: 'tag value'
        // }]
      }
    },
    (err, info) => {
      console.log(err, "========", info);
      return res.send(info);
    }
  );
};

module.exports = {
  sendEmailWithNodemailer
};
