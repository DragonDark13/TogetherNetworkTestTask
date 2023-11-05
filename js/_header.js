import {messagesText, regFields} from "./_data.js";

const emailInput = document.getElementById('email_in_login_form');
const passwordInput = document.getElementById('password_in_login_form');
const emailInvalidMessage = emailInput.closest(".input_container").querySelector(".invalid_message");
const passwordInvalidMessage = passwordInput.closest(".input_container").querySelector(".invalid_message");
const logInButton = document.querySelector('.log_in_btn_in_form');

const toggleLoginForm = (showForm) => {
    const formContainer = document.querySelector(".header_log_in_form_container");
    const logInBtn = document.querySelector(".log_in_btn");

    formContainer.classList.toggle('hidden', !showForm);
    logInBtn.classList.toggle('hidden', showForm);
};


const setupInput = (input, messagesText, regFields, invalidMessage, checkLength = true) => {
    input.addEventListener('input', () => {
        const value = input.value;
        input.value = value.replace(/ /g, '');
        input.closest('.input_container').classList.add('invalid');
        invalidMessage.innerText = "";

        if (value.trim() === "") {
            invalidMessage.innerText = messagesText.emptyFieldMessage;
        } else if (input === emailInput && !regFields.emailRegExp.test(value)) {
            invalidMessage.innerText = messagesText.emailIsNotCorrect;
        } else if (input === passwordInput && !regFields.passwordRegExp.test(value)) {
            invalidMessage.innerText = messagesText.passwordMessage;
        } else if (checkLength) {
            const minLength = parseInt(input.getAttribute('minlength'));
            const maxLength = parseInt(input.getAttribute('maxlength'));

            if (value.trim().length < minLength) {
                invalidMessage.innerText = `${messagesText.minimumTextLength} ${minLength}`;
            } else if (value.trim().length > maxLength) {
                invalidMessage.innerText = `${messagesText.maximumTextLength} ${maxLength}`;
            }
        }

        const isInvalid = !!invalidMessage.innerText;
        input.closest('.input_container').classList.toggle('invalid', isInvalid);
        logInButton.disabled = emailInput.value.trim() === "" || passwordInput.value.trim() === "" || isInvalid;
    });
};


export const headerInitFunction = () => {
    document.querySelector(".log_in_btn").addEventListener("click", () => toggleLoginForm(true));
    document.querySelector(".log_in_btn_in_form").addEventListener("click", () => toggleLoginForm(false));
    setupInput(emailInput, messagesText, regFields, emailInvalidMessage, false);
    setupInput(passwordInput, messagesText, regFields, passwordInvalidMessage);
}