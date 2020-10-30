const nodemailer = require('nodemailer');
console.log(process.env.MAILID);
exports.contact = function(req, res) {
    var name = req.body.name;
    var message = JSON.stringify(req.body);
    var to = process.env.MAILTO;
    var smtpTransport = nodemailer.createTransport({
        // service: "Gmail",
        host: process.env.MAILHOST,
        port: process.env.MAILPORT,
        // secure: true,
        auth: {
            user: process.env.MAILID,
            pass: process.env.MAILIDP
        }
    });
    var mailOptions = {
        from: process.env.MAILID,
        to: to,
        subject: name + ' | Has a Query !',
        text: message
    }
    smtpTransport.sendMail(mailOptions, function(error, response) {
        if (error) {
            res.send({ msg: "Unable to submit, Please Try Again." });
            console.log(error);
        } else {
            console.log(response);
            res.send({ msg: "Thanks For contacting us. we will contact you soon." });
        }
    });
}