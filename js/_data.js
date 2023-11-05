const ageArray = fillAgeOptions();

function fillAgeOptions() {
    let array = [];
    for (let age = 18; age <= 80; age++) {
        array.push(age.toString());
    }
    return array;

}

const textGenerated = function () {
    const termsOfUseLink = document.createElement('a');
    termsOfUseLink.href = 'https://example.com/terms';
    termsOfUseLink.textContent = 'Terms of Use';

    const privacyPolicyLink = document.createElement('a');
    privacyPolicyLink.href = 'https://example.com/privacy';
    privacyPolicyLink.textContent = 'Privacy Policy';

    const firstPart = 'By clicking the button above you agree to our ';
    const andText = ' and ';
    const lastPart = ' including use of cookies and to receive newsletters, account updates and offers sent by StarCompany.';

    const container = document.createElement('div');
    container.innerHTML = firstPart + termsOfUseLink.outerHTML + andText + privacyPolicyLink.outerHTML + lastPart;

    return container;
}


export const dropdownValues = [
    {
        fieldName: 'gender',
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
        fieldName: 'location',
        inputType: "text",
        label: "I am from",
        minLength: 15,
        maxLength: 30,
        additionalText: "E.g.: New Roads or 70760\n" +
            "We don’t use postal addresses to contact members directly!"
    },
    {
        fieldName: 'email',
        inputType: "email",
        minLength: 3,
        maxLength: 30,
        label: "Your email adress",
    },
    {
        fieldName: 'password',
        inputType: 'password',
        minLength: 10,
        maxLength: 20,
        label: "Create your password",
        additionalText: textGenerated(),
    }
];

export const messagesText = {
    emptyFieldMessage: "This field is required",
    minimumTextLength: "The number of characters should not be less than",
    maximumTextLength: "The number of characters should not exceed",
    emailIsNotCorrect: "Please enter a valid email address",
    passwordMessage: "Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, and one digit."
}

export const regFields = {
    emailRegExp: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    passwordRegExp: /^(?=.*\d)(?=.*[a-zа-яіїєґ])(?=.*[A-ZА-ЯІЇЄҐ]).{8,}$/,
}