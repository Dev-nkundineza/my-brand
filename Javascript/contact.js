const form = document.querySelector("#contactForm");
console.log(form);

const userName = form.elements[0];
const email = form.elements[1];
const message = form.elements[2];

const btn = form.elements[3];

form.addEventListener('submit', (e) => {
    e.preventDefault();

    validateInputs();




})

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');

}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};
const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateInputs = () => {
    const userNameValue = userName.value.trim();
    const emailValue = email.value.trim();
    const messageValue = message.value.trim();

    if (userNameValue === "") {
        setError(userName, 'invalid input');
    } else {
        setSuccess(userName);
    }
    //check the email validation
    if (emailValue === "") {
        setError(email, 'empty field');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'email does not exist!');
    } else {
        setSuccess(email);
    }

    if (messageValue === "") {
        setError(message, 'exist empty message');
    } else if (messageValue.length > 200) {
        setError(message, 'too long message');
    } else {
        setSuccess(message);
        myFunction();
    }
};

function myFunction() {

    let questions;

    if (localStorage.getItem("questions") === null) {
        questions = [];
    } else {
        questions = JSON.parse(localStorage.getItem("questions"))

    }

    const obj = {
        name: userName.value,
        email: email.value,
        message: message.value
    }

    if (userName.value === "" || email.value === "" || message.value === "") {
        alert("failed to submit empty form");
    } else {
        questions.push(obj);
        localStorage.setItem("questions", JSON.stringify(questions));

        console.log(userName.value);
        console.log(email.value);
        console.log(message.value);
        userName.value = "";
        email.value = "";
        message.value = "";
        alert("Message sent!")
    }




}