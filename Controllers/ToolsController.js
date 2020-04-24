var MailConfig = require('../config/email');
var hbs = require('nodemailer-express-handlebars');
var gmailTransport = MailConfig.GmailTransport;

module.exports = {
    sendEmail: async (to) => {

        MailConfig.ViewOption(gmailTransport, hbs);
        let HelperOptions = {
            from: '"DER ELY" <lyesderouich@gmail.com>',
            to: to,
            subject: 'New Bracelet Device paired with your account',
            template: 'test',
            context: {
                name: "tariqul_islam",
                email: "tariqul.islam.rony@gmail.com",
                address: "52, Kadamtola Shubag dhaka"
            }
        };
        gmailTransport.sendMail(HelperOptions, (error,info) => {
            if(error) {
                console.log(error);
                res.json(error);
            }
            console.log("email is send");
            console.log(info);
            res.json(info)
        });
    }
}
