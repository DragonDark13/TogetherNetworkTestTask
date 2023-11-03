import {createSlideElement} from "./_createSliderItem.js";

export const initSliderForDropDown=(dropdownValues) =>{
    const stepSlider = document.querySelector('.form_step_slider');
    const slidesContainer = stepSlider.querySelector('.slides');
    const slidesProgressBar = stepSlider.querySelector('.slider_progress_bar');


    const createSlide = (stepSlideData, number) => {
        let labelForAttribute = `slide-checkbox-${number}`
        const newSlide = createSlideElement(number, stepSlideData,dropdownValues.length);
        const newCheckbox = createCheckbox(number, labelForAttribute);
        const newSliderDot = createSliderDot(number, labelForAttribute);

        slidesContainer.insertBefore(newCheckbox, slidesProgressBar);
        slidesContainer.insertBefore(newSlide, slidesProgressBar);
        slidesProgressBar.appendChild(newSliderDot);
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




    dropdownValues.forEach((stepSlideData, i) => createSlide(stepSlideData, i + 1));

}
