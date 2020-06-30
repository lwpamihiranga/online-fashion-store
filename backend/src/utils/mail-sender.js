const sgMail = require('@sendgrid/mail');

exports.sendManagerMail = (receiverMail, receiverName) => {
    sgMail.setApiKey(
        process.env.SENDGRID_API_KEY ||
            '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'
    );

    const msg = {
        to: receiverMail,
        from: 'fashionstore@guerrillamail.net', // do not change this mail
        subject: 'Manager Account Created',
        text: 'Your manager account has been created.',
        html: `<h3>Hello ${receiverName},</h3>
            <p>Your manager account has been created. Login to your account and start working.</p>
            <p>Thanks,<br/> Admin Team</p>`,
    };
    sgMail
        .send(msg)
        .then((info) => {
            console.log('Email sent! Info: ', info);
        })
        .catch((err) => {
            console.log('Cannot send the email, error: ', err);
        });
};
