
# Send Email with Google Apps Script

#### Create HTML Contact Form, send it to gmail with API using Javascript.  


## Reference

 - [jamiewilson/form-to-google-sheets](https://github.com/jamiewilson/form-to-google-sheets)
 - [Web Apps - Google Apps Script](https://developers.google.com/apps-script/guides/web)
 - [GmailApp - Google Apps Script](https://developers.google.com/apps-script/reference/gmail/gmail-app)


## 1. Create Apps Script project

First, you need to create new project. You can find the guide [here](https://developers.google.com/apps-script/guides/projects#create_a_project_from_google_drive). Go to Editor, open your Code.gs and enter the script. In code below, the API accept 3 parameter (name, email, message) that request by POST method (doPost()), or you can change it to GET (doGet()). Here is the [referrence](https://developers.google.com/apps-script/guides/triggers?hl=en#dogete_and_doposte).

```js
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
```

> You also can check the [code-detail.js](/) in this repo for more detail.

## 2. Deploy your script as a Web App

Read the deployment guide [here](https://developers.google.com/apps-script/guides/web#deploy_a_script_as_a_web_app). Copy the deployment's url.

## 3. Create HTML Form and JS script to handle it

Here i try to send 3 parameter (name, email, message) to my Apps Script endpoint. Send your form data to your SCRIPT URL.

```html
<form name="contact-form" method="post">
    <input type="text" name="name" placeholder="Enter your name" required>
    <input type="email" name="email" placeholder="Enter your email" required>
    <textarea name="message" placeholder="Type your message here.." required></textarea>
    <button type="submit">Send</button>
</form>

<script>
const emailMe = (formName, handler) => {
    const scriptURL = <SCRIPT URL>
    const contactForm = document.forms[formName];
    const { onSuccess, onError } = handler;
    
    contactForm.addEventListener("submit", e => {
        e.preventDefault();
        fetch(scriptURL, {
            method: "POST",
            body: new FormData(contactForm)
        }).then(onSuccess).catch(onError);
	});
};

emailMe("contact-form", {
    onSuccess: response => {
        ...
    },
    onError: error => {
        ...
    }
});
</script>
```
