// customdialog.js file, for HW4 part 2

// global variable used to track which dialog box is open on the screen
// can be set to alert, confirm, or prompt
var currentDialog;
// functions to import to nativedialogs.html for my custom dialogs
// add event listener to custom alert
function customAlert() {
    // select alert button
    let customAlertButton = document.getElementById('custom-alert-button');
    // select output
    let displayCustomOutput = document.getElementById('custom-out');
    // add event listener to alert button
    customAlertButton.addEventListener('click', () => {
        displayCustomOutput.innerText = '';
        currentDialog = 'alert';
        document.querySelector('#dialog-msg').innerText = 'you alerted!';
        // hide unused elements
        document.querySelector('#dialog-input-box').classList.add('hidden');
        document.querySelector('#dialog-cancel-button').classList.add('hidden');
        setTimeout(() => {
            dialog.classList.remove('hidden');
            dialog.showModal();
        }, 100);
    });
}
// // add event listener to custom confirm
function customConfirm() {
    // select confirm button
    let customConfirmButton = document.getElementById('custom-confirm-button');
    // select output
    let displayCustomOutput = document.getElementById('custom-out');
    // add event listener to alert button
    customConfirmButton.addEventListener('click', () => {
        displayCustomOutput.innerText = '';
        currentDialog = 'confirm';
        document.querySelector('#dialog-msg').innerText = 'are you sure you want to confirm?';
        // hide unused elements
        document.querySelector('#dialog-input-box').classList.add('hidden');
        setTimeout(() => {
            dialog.classList.remove('hidden');
            dialog.showModal();
        }, 100);
    });
}
// add event listener to custom prompt
function customPrompt() {
// select confirm button
    let customPromptButton = document.getElementById('custom-prompt-button');
    // select output
    let displayCustomOutput = document.getElementById('custom-out');
    // add event listener to alert button
    customPromptButton.addEventListener('click', () => {
        displayCustomOutput.innerText = '';
        currentDialog = 'prompt';
        // hide unused elements
        document.querySelector('#dialog-msg').classList.add('hidden');
        setTimeout(() => {
            dialog.classList.remove('hidden');
            dialog.showModal();
        }, 100);
    });
}
// add event listeners to dialog buttons
function initButtons() {
    let customOkButton = document.getElementById('dialog-ok-button');
    let customCancelButton = document.getElementById('dialog-cancel-button');
    let customOutput = document.getElementById('custom-out');
    let dialogInput = document.getElementById('dialog-prompt-input');
    let dialog = document.getElementById('dialog');
    let dialogChildren = dialog.querySelectorAll('*');
    customOkButton.addEventListener('click', () => {
        switch(currentDialog) {
            case 'alert':
                break;
            case 'confirm':
                customOutput.innerText = `The value returned by the confirm method is: true`
                break;
            case 'prompt':
                let cleaned = DOMPurify.sanitize(dialogInput.value);
                customOutput.innerText = `prompt result: ${cleaned}`;
                dialogInput.value = '';
                break;
            default:
                console.log('ok was clicked, but currentDialog not set');
                break;
        }
        dialog.classList.add('hidden');
        dialog.close();
        dialogChildren.forEach(function(element) {
            element.classList.remove("hidden");
        });
    });
    customCancelButton.addEventListener('click', () => {
        switch(currentDialog) {
            case 'alert':
                console.log('cancel was clicked, but currentDialog set to alert');
                break;
            case 'confirm':
                customOutput.innerText = 'The value returned by the confirm method is: false';
                break;
            case 'prompt':
                customOutput.innerText = 'Prompt result: user did not enter anything :(';
                dialogInput.value = '';
                break;
            default:
                console.log('cancel was clicked, but currentDialog not set');
                break;
        }
        dialog.classList.add('hidden');
        dialog.close();
        dialogChildren.forEach(function(element) {
            element.classList.remove("hidden");
        });
    });
}
// runs when page is furst opened, sets all event listeners
function initCustomDialog() {
    initButtons();
    customAlert();
    customConfirm();
    customPrompt();
}

export { customAlert, customConfirm, customPrompt, initCustomDialog, initButtons, currentDialog };