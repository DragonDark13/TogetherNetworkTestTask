import {createTextInput} from "./_createTextInput.js";

export const createSlideElement = (number, stepSlideData,dataArrayLength) => {
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
    let nextButton;

    if (number < dataArrayLength) {
        nextButton = createNextButton()
    } else {
        nextButton = createStartButton();
    }

    let baseSlideContent = document.createElement("div");
    baseSlideContent.className = "base_slide_content";


    baseSlideContent.appendChild(prevButton);
    baseSlideContent.appendChild(newInput);
    baseSlideContent.appendChild(nextButton);

    newSlide.appendChild(baseSlideContent);

    if (stepSlideData.additionalText) {
        let additionalSlideTextBlock = document.createElement("div");
        additionalSlideTextBlock.className = "additional_slide_text_block"
        additionalSlideTextBlock.innerText = stepSlideData.additionalText;
        newSlide.appendChild(additionalSlideTextBlock)

    }


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


const createPrevButton = (number) => {
    const prevButton = document.createElement('label');
    prevButton.setAttribute('for', `slide-checkbox-${number - 1}`);
    prevButton.className = "arrow_preview_btn";
    prevButton.innerHTML = '<img src="images/prev_arrow_icon.svg" alt="prev_arrow_icon">';
    return prevButton;
}

const createButtonForSlider = (className = "", btnText = `Next step`, iconSrc = './images/arrow_next_icon.svg') => {
    const nextButton = document.createElement('button');
    nextButton.className = "slider_next_btn";
    if (className.trim() !== '') {
        nextButton.classList.add(className);
    }
    if (btnText.trim() !== '') {
        nextButton.innerText = btnText.trim();
    }

    if (iconSrc.trim() !== '') {
        const icon = document.createElement('img');
        icon.src = iconSrc;
        icon.alt = 'icon';
        nextButton.appendChild(icon)
    }


    return nextButton;
}

const createNextButton = () => {
    return createButtonForSlider();
}

const createStartButton = () => {
    return createButtonForSlider("btn_success", "Start now", "./images/start_btn_icon.svg");
}

const generateDropdownOptions = (dropDownList) => {
    const options = dropDownList.map((value) => `
      <li class="dropdown_list_item" data-dropdown-item="${value}">${value}</li>
    `);

    return options.join('');
}
