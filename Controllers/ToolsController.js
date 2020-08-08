var MailConfig = require('../config/email');
var hbs = require('nodemailer-express-handlebars');
var gmailTransport = MailConfig.GmailTransport;

module.exports = {

    sendEmail: async (req, res, respond = true) => {

        console.log(req.body);
        const { to, subject, content } = req.body;
        //req.body.to,req.body.subject,req.body.content)

        MailConfig.ViewOption(gmailTransport, hbs);
        let HelperOptions = {
            from: '"Admin" <lyesderouich@gmail.com>',
            to: to,
            subject: subject,
            template: 'test',
            context: {
                content: content
            }
        };
        gmailTransport.sendMaijpg(HelperOptions, (error, info) => {
            if (respond) {
                if (error) {
                    console.log(error);
                    res.json(error);
                } else {
                    console.log("email is send");
                    console.log(info);
                    res.json(info)
                }
            }
        });
    }
}
