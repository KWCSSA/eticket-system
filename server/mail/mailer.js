const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const qr_code = require('./qr-generator');
dotenv.config();
// async..await is not allowed in global scope, must use a wrapper
module.exports = {
    send_mail: async function(clinetInfo) {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        let testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass // generated ethereal password
                // user: process.env.KW_MAIL, 
                // pass: process.env.KW_PW 
            }
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"KWCSSA" <service@kwcssa.com>', // sender address
            to: clinetInfo.email, // list of receivers
            subject: 'Waterloo Idol eTicket Confirmation', // Subject line
            text: 'eTicket', // plain text body
            html: `<b>Dear ${clinetInfo.name}:</b><p>This is your eTicket for Waterloo Idol.</p>`, // html body
            // attachments: qr_code.generateQR(clinetInfo)
        });


        console.log('Message sent: %s', info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }
}
