import {dropdownValues, messagesText, regFields} from "./_data.js"
import {initSliderForDropDown} from "./_initSlider.js";
import {headerInitFunction} from "./_header.js";

document.addEventListener('DOMContentLoaded', () => {


    const sliderAddEventsFunction = () => {
        const sliderInputContainers = document.querySelectorAll('.slider_input_container');
        const passwordInput = document.getElementById('password');

        let isDropdownOpen = false;

        const toggleDropdown = (dropdownContainer, open) => {
            dropdownContainer.classList.remove(open ? 'closed' : 'open');
            dropdownContainer.classList.add(open ? 'open' : 'closed');

            if (!open) {

                const baseSlideContent = dropdownContainer.closest('.base_slide_content');

                const nextButton = baseSlideContent.querySelector('.slider_next_btn');

                const currentSlide = dropdownContainer.closest('.slide');

                if (currentSlide.dataset.currentValue.trim() !== "") {
                    nextButton.removeAttribute('disabled');
                } else {
                    nextButton.setAttribute('disabled', 'disabled');
                }
            }

            isDropdownOpen = open;


        };


        const handleDropdownAreaClick = (event) => {
            const dropdownArea = event.target.closest('.dropdown_area');
            if (dropdownArea) {
                const dropdownContainer = dropdownArea.parentNode;
                const dropdownInput = dropdownContainer.querySelector('.dropdown_input');
                const currentSlide = dropdownArea.closest('.slide');
                const selectedValue = currentSlide.dataset.currentValue;

                if (selectedValue === "") {
                    const firstListItem = dropdownContainer.querySelector('.dropdown_list_item');
                    if (firstListItem) {
                        const firstValue = firstListItem.dataset.dropdownItem;
                        dropdownInput.textContent = firstValue;
                        currentSlide.dataset.currentValue = firstValue;
                        firstListItem.classList.add('selectedItem');
                    }
                }

                toggleDropdown(dropdownContainer, !isDropdownOpen);

                if (!dropdownContainer.classList.contains('active')) {
                    dropdownContainer.classList.add('active');
                }

            }
        };

        const handleDropdownListItemClick = (item) => {
            const selectedValue = item.getAttribute('data-dropdown-item');
            const dropdownContainer = item.closest('.dropdown_container');
            const dropdownInput = dropdownContainer.querySelector('.dropdown_input');
            const currentSlide = item.closest('.slide');

            dropdownContainer.querySelectorAll('.dropdown_list_item').forEach((listItem) => {
                listItem.classList.remove('selectedItem');
            });

            item.classList.add('selectedItem');
            dropdownInput.textContent = selectedValue;
            currentSlide.dataset.currentValue = selectedValue;

            toggleDropdown(dropdownContainer, false);
        };

        const handleCloseOpenDropdowns = (event) => {
            const openDropdownContainers = document.querySelectorAll('.dropdown_container.open');

            openDropdownContainers.forEach((dropdownContainer) => {
                if (!dropdownContainer.contains(event.target)) {
                    toggleDropdown(dropdownContainer, false);
                }
            });
        };


        const toNextStepFunc = (button) => {
            let step = Number(button.closest(".slide").dataset.currentStep);
            sendRequestData(step);

        }

        const handleInputEvent = (input, foundObject, messagesText, regFields) => {
            const errorMessage = (text) => {
                invalidMessage.innerText = text;
            };

            const baseSlideContent = input.closest('.base_slide_content');
            const invalidMessage = baseSlideContent.querySelector(".invalid_message");
            const nextButton = baseSlideContent.querySelector('.slider_next_btn');

            nextButton.setAttribute('disabled', "disabled");
            input.classList.add("invalid");

            input.addEventListener('keyup', (event) => {
                if (event.key === 'Enter') {
                    const nextButton = input.closest('.base_slide_content').querySelector('.slider_next_btn');
                    if (nextButton) {
                        nextButton.click();
                    }
                }
            });

            input.addEventListener('input', (event) => {
                const value = input.value;

                if (value.trim() === "") {
                    errorMessage(messagesText.emptyFieldMessage);
                } else if (foundObject.fieldName === 'password' && !regFields.passwordRegExp.test(value)) {
                    errorMessage(messagesText.passwordMessage);
                } else if (foundObject.fieldName === 'email' && !regFields.emailRegExp.test(value)) {
                    errorMessage(messagesText.emailIsNotCorrect);
                } else if (value.trim().length < foundObject.minLength) {
                    errorMessage(`${messagesText.minimumTextLength}  ${foundObject.minLength}`);
                } else if (value.trim().length > foundObject.maxLength) {
                    errorMessage(`${messagesText.maximumTextLength}  ${foundObject.maxLength}`);
                } else {
                    nextButton.removeAttribute('disabled');
                    input.classList.remove("invalid");
                    const currentSlide = input.closest('.slide');
                    currentSlide.dataset.currentValue = value;
                }
            });
        };


        document.querySelectorAll('.dropdown_area').forEach((dropdownArea) => {
            dropdownArea.addEventListener('click', handleDropdownAreaClick);
        });

        document.querySelectorAll('.dropdown_list_item').forEach((item) => {
            item.addEventListener('click', () => handleDropdownListItemClick(item));
        });


        document.addEventListener('click', handleCloseOpenDropdowns);

        document.querySelectorAll(".slider_next_btn").forEach((btn) => {
            btn.addEventListener('click', () => toNextStepFunc(btn))
        })

        passwordInput.addEventListener('input', (event) => {
            event.target.value = event.target.value.replace(/ /g, '');
        });

        sliderInputContainers.forEach((sliderInputContainer) => {
            const input = sliderInputContainer.querySelector('input');
            const fieldNameToFind = input.getAttribute('name');
            const foundObject = dropdownValues.find(item => item.fieldName === fieldNameToFind);

            if (!input || !fieldNameToFind || !foundObject) {
                console.log('Об\'єкт не знайдений');
                return;
            }

            handleInputEvent(input, foundObject, messagesText, regFields);
        });


    }

    const sendRequestData = (maxStep) => {
        const slides = document.querySelectorAll('div[data-current-step]:not([data-current-step=""])');
        const dataObject = {};

        slides.forEach(slide => {
            const currentStep = parseInt(slide.dataset.currentStep, 10);
            if (currentStep <= maxStep) {
                const currentName = slide.dataset.currentName;
                const currentValue = (currentName === "age") ? Number(slide.dataset.currentValue) : slide.dataset.currentValue;

                if (currentName && currentValue) {
                    dataObject[currentName] = currentValue;
                }
            }
        });


        const jsonData = JSON.stringify(dataObject);

        console.log(jsonData);


        const xhr = new XMLHttpRequest();

        xhr.open("POST", "https://run.mocky.io/v3/f6ca495a-0a08-40de-9889-e73d49d011d2");

        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onload = function () {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                console.log("Відповідь від сервера:", response);

                if (maxStep === dropdownValues.length ) {
                    document.querySelector(".form_step_slider").classList.add("hidden");
                    document.querySelector(".success_registration_container").classList.remove("hidden");
                } else {
                    let nextStep = maxStep + 1;
                    const radioInput = document.querySelector(`#slide-checkbox-${nextStep}`);
                    radioInput.checked = true;
                }


            } else {
                console.error("Помилка при виконанні запиту");
                alert("Помилка при виконанні запиту");
            }
        };

        xhr.send(jsonData);

    }


    initSliderForDropDown(dropdownValues, sliderAddEventsFunction);
    headerInitFunction();


});
