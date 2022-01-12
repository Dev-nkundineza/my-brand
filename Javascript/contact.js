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