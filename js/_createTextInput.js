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

    const createInput = (inputType, fieldName) => {
        const input = document.createElement("input");
        input.type = inputType;
        input.id = fieldName;
        input.name = fieldName;
        input.maxLength = 20;
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
    const input = createInput(stepSlideData.inputType, stepSlideData.fieldName);
    const invalidMessage = createInvalidMessage("Невірний ввід");
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
