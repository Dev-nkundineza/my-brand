const form = document.querySelector("#contactForm");
console.log(form);

const userName = form.elements[0];
const email = form.elements[1];
const message = form.elements[2];

const btn = form.elements[3];

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
    questions.push(obj);
    localStorage.setItem("questions", JSON.stringify(questions));

    console.log(userName.value);
    console.log(email.value);
    console.log(message.value);
    userName.value = "";
    email.value = "";
    message.value = "";



}


function showMessage(input, message, type) {
    const msg = input.parentNode.querySelector("small");

    msg.innerText = message;
    input.className = type ? "success" : "error";
    return type;

}

function showError(input, message) {
    return showMessage(input, message, false);
}

function showSuccess(input) {
    return showMessage(input, "", true);
}

function hasValue(input, message) {
    if (input.value.trim() === "") {
        return showError(input, message);
    }
    return showSuccess(input);
}

function validateEmail(input, requiredMsg, invalidMsg) {
    // check if the value is not empty
    if (!hasValue(input, requiredMsg)) {
        return false;
    }
    // validate email format
    const emailRegex =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const email = input.value.trim();
    if (!emailRegex.test(email)) {
        return showError(input, invalidMsg);
    }
    return true;
}