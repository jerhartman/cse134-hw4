// code for HW4 ----------------------------------------------------------
// select dom elements
let alertButton = document.getElementById('alert-button');
let confirmButton = document.getElementById('confirm-button');
let promptButton = document.getElementById('prompt-button');
let saferPromptButton = document.getElementById('safer-prompt-button');
let displayOutput = document.getElementById('out');
let bool;
let input;
// alert button
alertButton.addEventListener('click', () => {
    displayOutput.innerHTML = '';
    setTimeout(() => {
        alert('you alerted!');
    }, 100);
});
// confirm button
confirmButton.addEventListener('click', () => {
    displayOutput.innerHTML = '';
    setTimeout(() => {
        bool = window.confirm('are you sure you want to confirm?');
        displayOutput.innerHTML = `The value returned by the confirm method is: ${bool}`;
    }, 100);
});
// prompt button
promptButton.addEventListener('click', () => {
    displayOutput.innerHTML = '';
    setTimeout(() => {
        input = window.prompt('what is your name?', '');
        if (input == null) {
            displayOutput.innerHTML = "prompt result: user did not enter anything :("
        }
        else {
            displayOutput.innerHTML = `prompt result: ${input}`;
        }
    }, 100);
});
// safer prompt button
saferPromptButton.addEventListener('click', () => {
    displayOutput.innerHTML = '';
    setTimeout(() => {
        input = window.prompt('what is your name?', '');
        if (input == null) {
            displayOutput.innerHTML = "prompt result: user did not enter anything :("
        }
        else {
            let cleaned = DOMPurify.sanitize(input);
            displayOutput.innerHTML = `prompt result: ${cleaned}`;
        }
    }, 100);
});