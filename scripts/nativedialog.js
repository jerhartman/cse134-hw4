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
    displayOutput.innerText = '';
    setTimeout(() => {
        alert('you alerted!');
    }, 100);
});
// confirm button
confirmButton.addEventListener('click', () => {
    displayOutput.innerText = '';
    setTimeout(() => {
        bool = window.confirm('are you sure you want to confirm?');
        displayOutput.innerText = `The value returned by the confirm method is: ${bool}`;
    }, 100);
});
// prompt button
promptButton.addEventListener('click', () => {
    displayOutput.innerText = '';
    setTimeout(() => {
        input = window.prompt('what is your name?', '');
        if (input == null) {
            displayOutput.innerText = "prompt result: user did not enter anything :("
        }
        else {
            displayOutput.innerHTML = `prompt result: ${input}`;
        }
    }, 100);
});
// safer prompt button
saferPromptButton.addEventListener('click', () => {
    displayOutput.innerText = '';
    setTimeout(() => {
        input = window.prompt('what is your name?', '');
        if (input == null) {
            displayOutput.innerText = "prompt result: user did not enter anything :("
        }
        else {
            let cleaned = DOMPurify.sanitize(input);
            displayOutput.innerText = `prompt result: ${cleaned}`;
        }
    }, 100);
});