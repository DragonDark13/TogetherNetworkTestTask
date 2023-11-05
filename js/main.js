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
                const dropdownArea = dropdownContainer.querySelector('.dropdown_area');

                const baseSlideContent = dropdownContainer.closest('.base_slide_content');

                // Знайдіть кнопку "slider_next_btn" в батьківському елементі
                const nextButton = baseSlideContent.querySelector('.slider_next_btn');

                // Активуйте або відключіть кнопку в залежності від значення dropdownInput
                if (dropdownArea.dataset.dropdownValue.trim() !== "") {
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
                const selectedValue = dropdownArea.dataset.dropdownValue;

                if (selectedValue === "") {
                    const firstListItem = dropdownContainer.querySelector('.dropdown_list_item');
                    if (firstListItem) {
                        const firstValue = firstListItem.dataset.dropdownItem;
                        dropdownInput.textContent = firstValue;
                        dropdownArea.dataset.dropdownValue = firstValue;
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
            const dropdownArea = dropdownContainer.querySelector('.dropdown_area');

            dropdownContainer.querySelectorAll('.dropdown_list_item').forEach((listItem) => {
                listItem.classList.remove('selectedItem');
            });

            item.classList.add('selectedItem');
            dropdownInput.textContent = selectedValue;
            dropdownArea.dataset.dropdownValue = selectedValue;

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
            let nextStep = step + 1;
            const radioInput = document.querySelector(`#slide-checkbox-${nextStep}`);
            radioInput.checked = true;
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

// Додайте обробник подій для passwordInput
        passwordInput.addEventListener('input', (event) => {
            event.target.value = event.target.value.replace(/ /g, ''); // Замініть всі пробіли на порожній рядок
        });

// Ітеруйтесь через кожен контейнер та додайте обробник подій для input
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


    initSliderForDropDown(dropdownValues, sliderAddEventsFunction);
    headerInitFunction();


});
