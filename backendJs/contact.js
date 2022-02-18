'use strict';
// get form fields

const form = document.querySelector("#contactForm");
// console.log(form);

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


// get user location
var userLocation;
const successCallback = (position) => {

    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+ ${longitude}&key=3d0e1fbd479240748dbff71203882eed`)
        .then(response => response.json())
        .then(response => {
            let allDetails = response.results[0].components;

            // console.table(allDetails);

            let { country, city } = allDetails;

            userLocation = `${country},${city}`;

            return userLocation;


        }).catch(() => {

            userLocation = "no location provided";

        });


};
const errorCallback = (error) => {
    console.log(position);
};
navigator.geolocation.getCurrentPosition(successCallback, errorCallback)


//


//

const myFunction = async() => {
    const userData = {
        name: userName.value,
        email: email.value,
        message: message.value,
        location: userLocation
    }

    // console.log(JSON.stringify(userData));

    if (userName.value === "" || email.value === "" || message.value === "") {
        alert("failed to submit empty form");
    } else {

        const res = await fetch('https://test-my-brand-api.herokuapp.com/api/v1/queries', {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: { 'Content-Type': 'application/json' },


        })

        if (res.status === 200) {
            const response = await res.json()
            console.log(response);

        } else {
            alert('error occured,message ca not be sent')

        }
        alert("Message sent!")
        form.reset();
    }
}