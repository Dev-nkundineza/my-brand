let accounts;
if (localStorage.getItem("accounts") === null) {
    accounts = ["admin", 123];
} else {
    accounts = JSON.parse(localStorage.getItem("accounts"))
}


localStorage.setItem("accounts", JSON.stringify(accounts));

//
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

    if (user.value != accounts[0] || password.value != accounts[1]) {
        // setError(password, ' password mismatch');
        alert("invalid credentials");

        user.value = "";
        password.value = "";

        return false;

    } else {

        window.location.replace('../pages/dashboard.html');
        localStorage.setItem("auth", 1);
    }
}