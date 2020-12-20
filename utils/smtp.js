const nodemailer = require('nodemailer')
const { user_smtp, password_smtp } = process.env
const smtp = (email, subject, text) => {
    new Promise((resolve, reject) => {

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: user_smtp,
                pass: password_smtp
            }
        });

        const mailOptions = {
            from: 'refactory@gmail.com',
            to: email,
            subject: subject,
            text: text
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                reject(error);
            } else {
                resolve(true)
            }
        });
    })
}

module.exports = smtp