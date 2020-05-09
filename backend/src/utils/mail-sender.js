const nodemailer = require('nodemailer');

let transport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: 'df564336fc07e3',
        pass: 'a895dc678bab7d',
    },
});

exports.sendManagerMail = (senderMail, receiverMail, receiverName) => {
    const message = {
        from: senderMail,
        to: receiverMail,
        subject: 'Manager Account Created',
        html: `<h3>Hello ${receiverName},</h3>
            <p>Your manager account has been created. Login to your account and start working.</p>
            <p>Thanks,<br/> Admin Team</p>`,
    };

    transport
        .sendMail(message)
        .then((info) => {
            console.log('Email sent! Info: ', info);
        })
        .catch((err) => {
            console.log('Cannot send the email, error: ', err);
        });
};
