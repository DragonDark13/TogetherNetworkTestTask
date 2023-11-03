document.addEventListener('DOMContentLoaded', () => {

    function fillAgeOptions() {
        let array = [];
        for (let age = 18; age <= 80; age++) {
            array.push(age.toString());
        }
        return array;

    }

    const ageArray = fillAgeOptions();

    const dropdownValues = [
        {
            fieldNAme: 'role',
            inputType: "dropdown",
            label: "Who are you?",
            options: ["Engineer", "Business Development Executive", "Office Manager/PA", "Accountant", "VR Designer"]
        },
        {
            fieldNAme: 'age',
            inputType: "dropdown",
            label: "What is your age?",
            options: ageArray
        },
        {
            fieldNAme: 'address',
            inputType: "text",
            label: "I am from",
        },
        {
            fieldNAme: 'email',
            inputType: "email",
            label: "Your position?",
            options: ["Project Manager", "Product Manager", "Data Scientist"]
        },
        {
            fieldNAme: 'password',
            inputType: 'password',
            label: "Choose your profession",
            options: ["Software Developer", "UI/UX Designer", "Digital Marketer"]
        }
    ];

    initSliderForDropDown(dropdownValues);

    let isDropdownOpen = false;

    const toggleDropdown = (dropdownContainer, open) => {
        dropdownContainer.classList.remove(open ? 'closed' : 'open');
        dropdownContainer.classList.add(open ? 'open' : 'closed');
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

    document.querySelectorAll('.dropdown_area').forEach((dropdownArea) => {
        dropdownArea.addEventListener('click', handleDropdownAreaClick);
    });

    document.querySelectorAll('.dropdown_list_item').forEach((item) => {
        item.addEventListener('click', () => handleDropdownListItemClick(item));
    });

    document.addEventListener('click', handleCloseOpenDropdowns);

    function initSliderForDropDown(dropdownValues) {
        const stepSlider = document.querySelector('.form_step_slider');
        const slidesContainer = stepSlider.querySelector('.slides');
        const slidesProgressBar = stepSlider.querySelector('.slider_progress_bar');


        const createSlide = (stepSlideData, number) => {
            let labelForAttribute = `slide-checkbox-${number}`
            const newSlide = createSlideElement(number, stepSlideData);
            const newCheckbox = createCheckbox(number, labelForAttribute);
            const newSliderDot = createSliderDot(number, labelForAttribute);

            slidesContainer.insertBefore(newCheckbox, slidesProgressBar);
            slidesContainer.insertBefore(newSlide, slidesProgressBar);
            slidesProgressBar.appendChild(newSliderDot);
        }

        const createSlideElement = (number, stepSlideData) => {
            const newSlide = document.createElement('div');
            newSlide.className = "slide";
            newSlide.id = `slide-${number}`;

            let newInput;

            if (stepSlideData.inputType === "dropdown") {
                newInput = createDropdownInput(number, stepSlideData);
            } else {
                newInput = createTextInput(stepSlideData);
            }

            const prevButton = createPrevButton(number);
            const nextButton = createNextButton();

            newSlide.appendChild(prevButton);
            newSlide.appendChild(newInput);
            newSlide.appendChild(nextButton);

            return newSlide;
        }

        const createDropdownInput = (number, stepSlideData) => {
            const dropdownContainer = document.createElement('div');
            dropdownContainer.className = `dropdown_container dropdown_step${number}`;

            dropdownContainer.innerHTML = `
        <div class="dropdown_area" data-dropdown-value="">
            <div class="dropdown_label">${stepSlideData.label}</div>
            <div class="dropdown_input"></div>
            <div class="dropdown_icon">
                <img class="lightIcon" src="./images/arrowDropdown.svg" alt="arrowDropdown">
                <img class="darkIcon" src="./images/arrowDropdownDark.svg" alt="arrowDropdownDark">
            </div>
        </div>
        <ul class="dropdown_list">
            ${generateDropdownOptions(stepSlideData.options)}
        </ul>
    `;

            return dropdownContainer;
        }

        const createTextInput = (stepSlideData) => {
            const input = document.createElement("input");
            input.type = stepSlideData.inputType;
            return input;
        }

        const createPrevButton = (number) => {
            const prevButton = document.createElement('label');
            prevButton.setAttribute('for', `slide-checkbox-${number - 1}`);
            prevButton.className = "arrow_preview_btn";
            prevButton.innerHTML = '<img src="images/prev_arrow_icon.svg" alt="prev_arrow_icon">';
            return prevButton;
        }

        const createNextButton = () => {
            const nextButton = document.createElement('button');
            nextButton.className = "slider_next_btn";
            nextButton.innerHTML = `
        Next step
        <img src="./images/arrow_next_icon.svg" alt="arrow_next_icon">
    `;
            return nextButton;
        }


        const createCheckbox = (number, labelForAttribute) => {
            const newCheckbox = document.createElement('input');
            newCheckbox.type = "radio";
            newCheckbox.id = labelForAttribute;
            newCheckbox.name = "slide_checkbox";
            newCheckbox.checked = number === 1;
            return newCheckbox;
        }

        const createSliderDot = (number, labelForAttribute) => {
            const newSliderDot = document.createElement('label');
            newSliderDot.setAttribute('for', labelForAttribute);
            return newSliderDot;
        }

        const generateDropdownOptions = (dropDownList) => {
            const options = dropDownList.map((value) => `
      <li class="dropdown_list_item" data-dropdown-item="${value}">${value}</li>
    `);

            return options.join('');
        }


        dropdownValues.forEach((stepSlideData, i) => createSlide(stepSlideData, i + 1));

    }
});
