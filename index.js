const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const cors = require("cors")({ origin: true });
admin.initializeApp();

const myGmail = {
	mailProvider: "gmail",
	senderName: "Muhammad Sabri",
	senderUser: "sabriahmad1306@gmail.com",
	senderPass: "@Palattae13061998",
	destMail: "muhammadsabri1306@gmail.com",
	mailSubject: "Portfolio Site's Contact"
};

let transporter = nodemailer.createTransport({
    service: myGmail.mailProvider,
    auth: {
        user: myGmail.senderUser,
        pass: myGmail.senderPass
    }
});

exports.sendMail = functions.https.onRequest((req, res) => {
	
	cors(req, res, () => {
		const name = req.query.name;
		const email = req.query.email;
		const message = req.query.message;

        const mailOptions = {
            from: myGmail.senderName + " <" + myGmail.senderUser + ">",
            to: myGmail.destMail,
            subject: myGmail.mailSubject,
            html: `<div style="width:100%!important;min-width:100%;box-sizing:border-box;color:#000;font-family:Helvetica,Arial,sans-serif;font-weight:normal;text-align:left;line-height:150%;font-size:16px;margin:0;padding:0"><p style="font-weight:bold;text-align:center;line-height:150%;text-decoration:none;font-size:16px;border-radius:3px;margin:0;padding:0px;border:none">You've got email in your Portfolio Site (https://muhammadsabri1306.github.io/)</p><div style="display:flex;justify-content:center;margin-top:20px;"><img src="https://muhammadsabri1306.github.io/assets/img/cat_i.png" style="width:200px;" alt="Portfolio's logo"></div><div style="padding:1em 2em;border:1px solid #343434;box-shadow:0 0 0.5em rgba(0,0,0,0.2);border-radius:0.5rem;"><p>Name: <b>${ name }</b></p><p>Email: <b><i>${ email }</i></b></p><p>${ message }</p></div></div>`
        };

        return transporter.sendMail(mailOptions, (erro, info) => {
        	if(erro)
        		return res.send(erro.toString());
        	return res.send('Sended');
        });
    });

});
