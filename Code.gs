/*
 * Reference
 * - https://github.com/jamiewilson/form-to-google-sheets
 * - https://developers.google.com/apps-script/reference/mail/mail-app
 * - https://developers.google.com/apps-script/guides/web
 */


/*
 * Send an email
 * String name,  
 */
function emailMe(name, email, message){
  var mailRecipient = "muhammadsabri1306@gmail.com";
  var mailSubject = "PortFolio Contact Form";

  var myLogoUrl = "https://muhammadsabri1306.github.io/assets/img/cat_i.png";
		var myLogoBlob = UrlFetchApp.fetch(myLogoUrl).getBlob().setName("myLogoBlob");
		var htmlMessage = "<div style='width:100%!important;min-width:100%;box-sizing:border-box;color:#000;font-family:Helvetica,Arial,sans-serif;font-weight:normal;text-align:left;line-height:150%;font-size:16px;margin:0;padding:0'> <p style='font-weight:bold;text-align:center;line-height:150%;text-decoration:none;font-size:16px;border-radius:3px;margin:0;padding:0px;border:none'>You've got email in your Portfolio Site (https://muhammadsabri1306.github.io/)</p> <div style='display:flex;justify-content:center;margin-top:20px;'><img src='cid:myLogo' style='width:200px;'></div><div style='padding:1em 2em;border:1px solid #343434;box-shadow:0 0 0.5em rgba(0,0,0,0.2);border-radius:0.5rem;'><p>Name: <b>" + name + "</b></p><p>Email: <b><i>" + email + "</i></b></p><p>" + message + "</p></div></div>";

    GmailApp.sendEmail(mailRecipient, mailSubject, message, {
      htmlBody: htmlMessage,
      inlineImages: { myLogo: myLogoBlob }
    });
}

function doPost(e) {
	var lock = LockService.getScriptLock();
	lock.waitLock(10000);

	try {
		var name = e.parameter.name;
		var email = e.parameter.email;
		var message = e.parameter.message;

    emailMe(name, email, message);

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
