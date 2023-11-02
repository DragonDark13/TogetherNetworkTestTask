document.addEventListener('DOMContentLoaded', function () {


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
    const stepSlider = document.querySelector('.form_step_slider');
    const slidesContainer = stepSlider.querySelector('.slides');
    const slidesProgressBar = stepSlider.querySelector('.slider_progress_bar')

    // Об'єкти із значеннями для кожного слайда

    const numberOfSlides = dropdownValues.length;

    for (let i = 1; i <= numberOfSlides; i++) {
        // Створюємо новий слайд


        // newCheckbox.style.display = "none";


        const newSlide = document.createElement('div');
        newSlide.id = `slide-${i}`;

        let newSliderAnchor = i === 1 ? `slide-${i}` : `slide-${i - 1}`;


        // Вміст нового слайду
        newSlide.innerHTML = `
    <a href="#${newSliderAnchor}" class="arrow_preview_btn">
      <img src="images/prev_arrow_icon.svg" alt="prev_arrow_icon">
    </a>
    <div class="dropdown_container dropdown_step${i} active">
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

        let slideCheckBoxId = `slide-checkbox-${i}`;

        const newSliderDot = document.createElement('label');
        newSliderDot.setAttribute('for', slideCheckBoxId);
        newSliderDot.textContent = i;
        slidesProgressBar.appendChild(newSliderDot);
        // Додаємо новий слайд до контейнера слайдів
        const newCheckbox = document.createElement('input');
        newCheckbox.type = "radio";
        newCheckbox.id = slideCheckBoxId;
        newCheckbox.name = `slide_checkbox`;
        slidesContainer.appendChild(newCheckbox);
        slidesContainer.appendChild(newSlide);

        // Додаємо посилання до контейнера progress-bar

    }

// Функція для генерації варіантів дропдауну
    function generateDropdownOptions(slideNumber) {
        const options = dropdownValues[slideNumber - 1].options.map((value) => `
    <li class="dropdown_list_item" data-dropdown-item="${value}">${value}</li>
  `);

        return options.join('');
    }
});