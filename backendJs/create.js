"use strict";
// validatecreate article form

const form = document.getElementById("form");
const input = document.querySelectorAll("input");
const accessToken = localStorage.getItem("auth");
const token = accessToken.replace(/['"]+/g, "");
console.log(token);

form.onsubmit = async(e) => {
    e.preventDefault();
    // validateForm();

    let response = await fetch('https://test-my-brand-api.herokuapp.com/api/v1/articles', {
        method: 'POST',
        headers: {
            accept: 'application/json ',
            Authorization: `Bearer ${token}`,
        },
        body: new FormData(form),
    });

    if (response.status === 200) {
        let result = await response.json();
        alert("posted successfully!");
        form.reset();
        console.log(result)
    } else {
        console.log("failed to create post")
    }




};

//access form elements
const title = form.elements["title"];
const content = form.elements["body"];
const image = form.elements["file"];
const author = form.elements["user"];