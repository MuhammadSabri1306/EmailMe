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

exports.mail = (setupMail) => {
	return functions.https.onRequest((req, res) => {
		cors(req, res, () => {

			const name = req.query.name;
			const email = req.query.email;
			const message = req.query.message;
			const mailContent = setupMail(name, email, message);

	        const mailOptions = {
	            from: myGmail.senderName + " <" + myGmail.senderUser + ">",
	            to: myGmail.destMail,
	            subject: myGmail.mailSubject,
	            html: mailContent
	        };

	        return transporter.sendMail(mailOptions, (erro, info) => {
	        	if(erro)
	        		return res.send(erro.toString());
	        	return res.send('Sended');
	        });
	    });
	});
};
