'@import contact.js'
const loginForm = document.querySelector('form ');

const user = loginForm.elements[0];
const password = loginForm.elements[1];

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    loginValidation();
    autoRedirect();
    // login();
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
    const passKey = "12345678";

    if (user.value != userName && password.value != passKey) {
        setError(password, ' password mismatch');
        setError(userName, 'invalid username');

        return false;

    } else {
        return true;
    }
}

function autoRedirect() {
    if (!login && location.pathname != '/signin')
        redirect('/signin')

    if (login && location.pathname === '/signin/') redirect('/dashboard')
}