const ageArray = fillAgeOptions();

function fillAgeOptions() {
    let array = [];
    for (let age = 18; age <= 80; age++) {
        array.push(age.toString());
    }
    return array;

}


export const dropdownValues = [
    {
        fieldName: 'role',
        inputType: "dropdown",
        label: "Who are you?",
        options: ["Engineer", "Business Development Executive", "Office Manager/PA", "Accountant", "VR Designer"]
    },
    {
        fieldName: 'age',
        inputType: "dropdown",
        label: "What is your age?",
        options: ageArray
    },
    {
        fieldName: 'address',
        inputType: "text",
        label: "I am from",
        additionalText: "E.g.: New Roads or 70760\n" +
            "We don’t use postal addresses to contact members directly!"
    },
    {
        fieldName: 'email',
        inputType: "email",
        label: "Your email adress",
    },
    {
        fieldName: 'password',
        inputType: 'password',
        label: "Create your password",
    }
];