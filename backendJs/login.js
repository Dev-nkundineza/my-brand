const loginForm = document.querySelector('form ');

const user = loginForm.elements[0];
const password = loginForm.elements[1];
const element = document.querySelector(".error");

let token = "";



const logUserIn = async() => {
    const data = {
        email: user.value,
        password: password.value
    }
    const response = await fetch('https://test-my-brand-api.herokuapp.com/api/v1/user/login', {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        }
    });


    if (response.status === 200) {
        const result = await response.json();
        console.log(token)
        token = result.accessToken
        localStorage.setItem("auth", JSON.stringify(token));
        window.location.replace(`../pages/dashboard.html#${data.email}`)

    } else {
        alert("invalid credential,Try again")
        console.log("error,")
        user.value = "";
        password.value = "";
        return false;
    }

}



loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    loginValidation();

    logUserIn();
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