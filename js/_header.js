import {messagesText, regFields} from "./_data.js";


const toggleLoginForm = (showForm) => {
    const formContainer = document.querySelector(".header_log_in_form_container");
    const logInBtn = document.querySelector(".log_in_btn");

    formContainer.classList.toggle('hidden', !showForm);
    logInBtn.classList.toggle('hidden', showForm);
};


export const headerInitFunction = () => {
    const emailInput = document.getElementById('email_in_login_form');
    const passwordInput = document.getElementById('password_in_login_form');
    const emailInvalidMessage = emailInput.closest(".input_container").querySelector(".invalid_message");
    const passwordInvalidMessage = passwordInput.closest(".input_container").querySelector(".invalid_message");

    emailInvalidMessage.innerText = messagesText.emptyFieldMessage;
    passwordInvalidMessage.innerText = messagesText.emptyFieldMessage;


    const setupInput = (input, messagesText, regFields, invalidMessage, checkLength = true) => {
        const logInButton = document.querySelector('.log_in_btn_in_form');


        input.addEventListener('input', () => {
            const value = input.value;
            input.value = value.replace(/ /g, '');
            input.closest('.input_container').classList.add('invalid');

            function invalidMessageFunc(text) {
                invalidMessage.innerText = text;
            }

            invalidMessageFunc("")


            if (value.trim() === "") {
                invalidMessageFunc(messagesText.emptyFieldMessage)
            } else if (input === emailInput && !regFields.emailRegExp.test(value)) {
                invalidMessageFunc(messagesText.emailIsNotCorrect)
            } else if (input === passwordInput && !regFields.passwordRegExp.test(value)) {
                invalidMessageFunc(messagesText.passwordMessage)
            } else if (checkLength) {
                const minLength = parseInt(input.getAttribute('minlength'));
                const maxLength = parseInt(input.getAttribute('maxlength'));

                if (value.trim().length < minLength) {
                    invalidMessageFunc(`${messagesText.minimumTextLength} ${minLength}`)
                } else if (value.trim().length > maxLength) {
                    invalidMessageFunc(`${messagesText.maximumTextLength} ${maxLength}`)
                }
            }

            const isInvalid = !!invalidMessageFunc.innerText;
            input.closest('.input_container').classList.toggle('invalid', isInvalid);
            logInButton.disabled = emailInput.value.trim() === "" || passwordInput.value.trim() === "" || isInvalid;
        });
    };

    document.querySelector(".log_in_btn").addEventListener("click", () => toggleLoginForm(true));
    document.querySelector(".log_in_btn_in_form").addEventListener("click", () => toggleLoginForm(false));
    setupInput(emailInput, messagesText, regFields, emailInvalidMessage, false);
    setupInput(passwordInput, messagesText, regFields, passwordInvalidMessage);
}