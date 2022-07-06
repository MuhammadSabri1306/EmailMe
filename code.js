/*
 * Code.gs file
 * 
 */

/*
 * @param String name
 * @param String email
 * @param String message
 *
 */
function emailMe(name, email, message){
    const mailRecipient = <YOUR EMAIL>;
    const mailSubject = <EMAIL SUBJECT>;
    
    const myLogoUrl = "https://muhammadsabri1306.github.io/assets/img/cat_i.png";
    const myLogoBlob = UrlFetchApp.fetch(myLogoUrl).getBlob().setName("myLogoBlob");
    const htmlMessage = "<div style='width:100%!important;min-width:100%;box-sizing:border-box;color:#000;font-family:Helvetica,Arial,sans-serif;font-weight:normal;text-align:left;line-height:150%;font-size:16px;margin:0;padding:0'> <p style='font-weight:bold;text-align:center;line-height:150%;text-decoration:none;font-size:16px;border-radius:3px;margin:0;padding:0px;border:none'>You've got email in your Portfolio Site (https://muhammadsabri1306.github.io/)</p> <div style='display:flex;justify-content:center;margin-top:20px;'><img src='cid:myLogo' style='width:200px;'></div><div style='padding:1em 2em;border:1px solid #343434;box-shadow:0 0 0.5em rgba(0,0,0,0.2);border-radius:0.5rem;'><p>Name: <b>" + name + "</b></p><p>Email: <b><i>" + email + "</i></b></p><p>" + message + "</p></div></div>";
    
    GmailApp.sendEmail(mailRecipient, mailSubject, message, {
        htmlBody: htmlMessage,
        inlineImages: { myLogo: myLogoBlob }
    });
}

function doPost(e) {
	const lock = LockService.getScriptLock();
	lock.waitLock(10000);

	try {
        const params = ["name", "email", "message"].map(item => e.parameter[item]);
		emailMe(...params);

		return ContentService
			.createTextOutput(JSON.stringify({ "result": "success" }))
			.setMimeType(ContentService.MimeType.JSON);
	}

	catch (err) {
		return ContentService
			.createTextOutput(JSON.stringify({ "result": "error", "error": err }))
			.setMimeType(ContentService.MimeType.JSON);
	}

	finally {
		lock.releaseLock();
	}
}
