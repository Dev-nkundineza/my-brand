'@import contact.js'
const loginForm = document.querySelector('form ');

const user = loginForm.elements[0];
const password = loginForm.elements[1];
const element = document.querySelector(".error");

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    loginValidation();

    login();
})

// function loginValidation() console.log(loginForm);
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

const loginValidation = () => {
    const user1 = user.value.trim();
    const password1 = password.value.trim();


    if (user1 === "") {
        setError(user, 'invalid credential');
    } else {
        setSuccess(user);
    }



    if (password1 === "") {
        setError(password, 'invalid password');
    } else {
        setSuccess(password);
    }
};

function login() {
    const userName = "admin";
    const passKey = 123;

    if (user.value != userName || password.value != passKey) {
        // setError(password, ' password mismatch');
        alert("invalid credentials");

        user.value = "";
        password.value = "";

        return false;

    } else {
        window.location.replace('http://127.0.0.1:5502/pages/dashboard.html');
    }
}