/*
 * Function to build the email's content.
 * 
 */
function emailMe(name, email, message){
    const mailRecipient = <YOUR EMAIL>; // Enter your gmail as recipient
    const mailSubject = <EMAIL SUBJECT>; // Enter the mail subject
    
    // Get the image to append in the HTML mail content (if you have)
    const myLogoUrl = "https://muhammadsabri1306.github.io/assets/img/cat_i.png";
    const myLogoBlob = UrlFetchApp.fetch(myLogoUrl).getBlob().setName("myLogoBlob");

    // Use HTML as the mail content 
    const htmlMessage = "<div style='width:100%!important;min-width:100%;box-sizing:border-box;color:#000;font-family:Helvetica,Arial,sans-serif;font-weight:normal;text-align:left;line-height:150%;font-size:16px;margin:0;padding:0'> <p style='font-weight:bold;text-align:center;line-height:150%;text-decoration:none;font-size:16px;border-radius:3px;margin:0;padding:0px;border:none'>You've got email in your Portfolio Site (https://muhammadsabri1306.github.io/)</p> <div style='display:flex;justify-content:center;margin-top:20px;'><img src='cid:myLogo' style='width:200px;'></div><div style='padding:1em 2em;border:1px solid #343434;box-shadow:0 0 0.5em rgba(0,0,0,0.2);border-radius:0.5rem;'><p>Name: <b>" + name + "</b></p><p>Email: <b><i>" + email + "</i></b></p><p>" + message + "</p></div></div>";
    
    // Send email
    GmailApp.sendEmail(mailRecipient, mailSubject, message, {
        htmlBody: htmlMessage,
        inlineImages: { myLogo: myLogoBlob }
    });
}

/*
 * Function that trigger by POST method.
 * 
 */
function doPost(e) {

	/*
	 * Gets a lock that prevents any user from concurrently running a section of code. A code section
	 * guarded by a script lock cannot be executed simultaneously regardless of the identity of the user.
	 * https://developers.google.com/apps-script/reference/lock/lock-service#getScriptLock()
	 *
	 **/
	const lock = LockService.getScriptLock();

	/*
	 * Attempts to acquire the lock, timing out with an exception after the provided number of milliseconds.
	 * This method is the same as tryLock(timeoutInMillis) except that it throws an exception when the lock
	 * could not be acquired instead of returning false.
	 * https://developers.google.com/apps-script/reference/lock/lock#waitLock(Integer)
	 *
	 **/
	lock.waitLock(10000);

	try {
		// Get the POST parameters
        const params = ["name", "email", "message"].map(item => e.parameter[item]);

        // Use the parameters to send an email
		emailMe(...params);

		// Return success results as JSON
		return ContentService
			.createTextOutput(JSON.stringify({ "result": "success" }))
			.setMimeType(ContentService.MimeType.JSON);

	}

	catch (err) {

		// Return error results as JSON
		return ContentService
			.createTextOutput(JSON.stringify({ "result": "error", "error": err }))
			.setMimeType(ContentService.MimeType.JSON);

	}

	finally {

		// Releases the lock, allowing other processes waiting on the lock to continue.
		lock.releaseLock();
		
	}
}
