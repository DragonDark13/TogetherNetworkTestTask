document.addEventListener('DOMContentLoaded', () => {
    const dropdownValues = [
        {
            label: "Who are you?",
            options: ["Business Development Executive", "Office Manager/PA", "Accountant"]
        },
        {
            label: "What's your role?",
            options: ["VR Designer", "Engineer", "Graphic Designer"]
        },
        {
            label: "Select your title",
            options: ["Marketing Manager", "Sales Representative", "Consultant"]
        },
        {
            label: "Your position?",
            options: ["Project Manager", "Product Manager", "Data Scientist"]
        },
        {
            label: "Choose your profession",
            options: ["Software Developer", "UI/UX Designer", "Digital Marketer"]
        }
    ];

    createSliderForDropDown(dropdownValues);
    document.querySelector('.dropdown_area').addEventListener('click', (event) => {
        const dropdownArea = event.target.closest('.dropdown_area');
        if (dropdownArea) {
            const dropdownContainer = dropdownArea.parentNode;
            dropdownContainer.classList.toggle('open');
        }
    });

    function createSliderForDropDown(dropdownValues) {
        const stepSlider = document.querySelector('.form_step_slider');
        const slidesContainer = stepSlider.querySelector('.slides');
        const slidesProgressBar = stepSlider.querySelector('.slider_progress_bar')

        const numberOfSlides = dropdownValues.length;


        const createSlide = (i) => {
            const newSlide = createSlideElement(i);
            const newCheckbox = createCheckbox(i);
            const newSliderDot = createSliderDot(i);

            slidesContainer.insertBefore(newCheckbox, slidesProgressBar);
            slidesContainer.insertBefore(newSlide, slidesProgressBar);
            slidesProgressBar.appendChild(newSliderDot);
        }

        const createSlideElement = (i) => {
            const newSlide = document.createElement('div');
            newSlide.className = "slide";
            newSlide.id = `slide-${i}`;
            newSlide.innerHTML = `
    <a href="#${getSliderAnchor(i)}" class="arrow_preview_btn">
      <img src="images/prev_arrow_icon.svg" alt="prev_arrow_icon">
    </a>
    <div class="dropdown_container dropdown_step${i}">
      <div class="dropdown_area">
        <div class="dropdown_label">${dropdownValues[i - 1].label}</div>
        <div class="dropdown_input">${dropdownValues[i - 1].options[0]}</div>
        <div class="dropdown_icon"><img src="./images/arrowDropdown.svg" alt="arrowDropdown"></div>
      </div>
      <ul class="dropdown_list">
        ${generateDropdownOptions(i)}
      </ul>
    </div>
    <button class="slider_next_btn">
      Next step
      <img src="./images/arrow_next_icon.svg" alt="arrow_next_icon">
    </button>
  `;
            return newSlide;
        }

        const createCheckbox = (i) => {
            const newCheckbox = document.createElement('input');
            newCheckbox.type = "radio";
            newCheckbox.id = `slide-checkbox-${i}`;
            newCheckbox.name = "slide_checkbox";
            newCheckbox.checked = i === 1;
            return newCheckbox;
        }

        const createSliderDot = (i) => {
            const newSliderDot = document.createElement('label');
            newSliderDot.setAttribute('for', `slide-checkbox-${i}`);
            return newSliderDot;
        }

        const getSliderAnchor = (i) => {
            return i === 1 ? `slide-${i}` : `slide-${i - 1}`;
        }

        const generateDropdownOptions = (slideNumber) => {
            const options = dropdownValues[slideNumber - 1].options.map((value) => `
      <li class="dropdown_list_item" data-dropdown-item="${value}">${value}</li>
    `);

            return options.join('');
        }

        for (let i = 1; i <= numberOfSlides; i++) {
            createSlide(i);
        }
    }
});
