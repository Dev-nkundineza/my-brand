const loginForm = document.querySelector('form ');

const user = loginForm.elements[0];
const password = loginForm.elements[1];
const element = document.querySelector(".error");

let token = "";



const logUserIn = async(object) => {
    const response = await fetch('https://test-my-brand-api.herokuapp.com/api/v1/user/login', {
        method: 'POST',
        body: JSON.stringify(object),
        headers: {
            "Content-Type": "application/json",
        }
    });


    if (response.status === 200) {
        const result = await response.json();
        console.log(token)
        token = result.accessToken
        localStorage.setItem("auth", JSON.stringify(token));
        window.location.replace(`../pages/dashboard.html`)

    } else {
        alert("invalid credential,Try again")

        user.value = "";
        password.value = "";
        return false;
    }

}



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




const login = async() => {


    const data = {
        email: user.value,
        password: password.value
    }

    const res = await fetch('https://test-my-brand-api.herokuapp.com/api/v1/user');

    // const result = await res.json();
    // console.log(result)

    if (res.status === 200) {
        logUserIn(data);

    } else {
        console.log("failed to fetch users")
    }

}

// function login() {



//     if (user.value != accounts[0] || password.value != accounts[1]) {
//         // setError(password, ' password mismatch');
//         alert("invalid credentials");

//         user.value = "";
//         password.value = "";

//         return false;

//     } else {

//         window.location.replace('../pages/dashboard.html');
//         localStorage.setItem("auth", 1);
//     }
// }