import {messagesText} from "./_data.js";

export const createSlideElement = (number, stepSlideData, dataArrayLength) => {
    const newSlide = document.createElement('div');
    newSlide.setAttribute('data-current-step', number);

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

        if (typeof stepSlideData.additionalText === "object") {
            additionalSlideTextBlock.appendChild(stepSlideData.additionalText)
        } else {
            additionalSlideTextBlock.innerText = stepSlideData.additionalText;
        }
        newSlide.appendChild(additionalSlideTextBlock)

    }


    return newSlide;
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

    nextButton.disabled = true;


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

export const createDropdownInput = (number, stepSlideData) => {
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

export const createTextInput = (stepSlideData) => {

    const createContainer = (fieldName) => {
        const container = document.createElement("label");
        container.classList.add("input_container", "slider_input_container");
        container.setAttribute("for", fieldName);
        return container;
    };

    const createLabel = (text) => {
        const label = document.createElement("div");
        label.classList.add("custom_label");
        label.textContent = text;
        return label;
    };

    const createInput = ({inputType, fieldName, minLength = 10, maxLength = 15}) => {
        const input = document.createElement("input");
        input.type = inputType;
        input.id = fieldName;
        input.name = fieldName;
        input.minLength = minLength;
        input.maxLength = maxLength;
        input.required = true;
        return input;
    };

    const createInvalidMessage = (text) => {
        const message = document.createElement("div");
        message.classList.add("invalid_message");
        message.textContent = text;
        return message;
    };

    const createInputBgBlock = () => {
        const inputBgBlock = document.createElement("div");
        inputBgBlock.classList.add("input_bg_block");
        return inputBgBlock;
    };

    const newTextInputContainer = createContainer(stepSlideData.fieldName);
    const label = createLabel(stepSlideData.label);
    const input = createInput(stepSlideData);
    const invalidMessage = createInvalidMessage(messagesText.emptyFieldMessage);
    const newInputBgBlock = createInputBgBlock();

    const updateInputState = () => {
        if (input.value.trim() !== '') {
            newTextInputContainer.classList.add('filled');
        } else {
            newTextInputContainer.classList.remove('filled');
        }
    };

    input.addEventListener('focus', updateInputState);
    input.addEventListener('blur', updateInputState);
    input.addEventListener('input', updateInputState);

    newTextInputContainer.appendChild(input);
    newTextInputContainer.appendChild(label);
    newTextInputContainer.appendChild(newInputBgBlock);
    newTextInputContainer.appendChild(invalidMessage);

    return newTextInputContainer;
};
