/*
 * Here the js code to send your form data to your Apps Script endpoint
 */
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
