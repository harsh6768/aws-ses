const Router=require('express').Router();

const controller=require('../controller/main-controller');
const sesNodemailerController=require('../controller/ses-nodemailer-controller');


Router.route('/verifyEmailAddress').get(controller.verifyEmail);
Router.route('/listVerifiedEmailAddresses').get(controller.listVerifiedEmails);
Router.route('/deleteVerifiedEmailAddress').get(controller.deleteVerifiedEmail);
Router.route('/createTemplate').get(controller.createEmailTemplate);
Router.route('/getListOfTemplates').get(controller.getListOfTemplates);
Router.route('/updateTemplate').get(controller.updateTemplate);
Router.route('/sendEmail').get(controller.sendEmail);
Router.route('/sendTemplateEmail').get(controller.sendTemplateEmail);
Router.route('/createCustomisedTemplate').get(controller.createCustomisedEmailTemplate);
Router.route('/sendBulkEmailWithCustomisedEmail').get(controller.sendBulkWithCustomisedEmail);

//sending email using nodemailer with aws smtp 
Router.route('/sendEmailWithNodeMailer').get(sesNodemailerController.sendEmailWithNodemailer);

module.exports=Router;
