'use strict';
// validatecreate article form

const form = document.querySelector("form");
const input = document.querySelectorAll("input")
console.log(form);
console.log(input);

//access form elements
const title = form.elements['title'];
const body = form.elements['body'];
const filePath = form.elements['file'];
const date = form.elements['date'];
const author = form.elements['user'];



function addPostToLs() {
    let posts;
    if (localStorage.getItem("posts") === null) {
        posts = [];
    } else {
        posts = JSON.parse(localStorage.getItem("posts"));
    }
    const obj = {
        title: title.value,
        body: body.value,
        thumbnail: filePath.value,
        date: date.value,
        author: author.value
    }

    posts.push(obj);
    localStorage.setItem("posts", JSON.stringify(posts));
    console.log("successfully created");
    title.value = "";
    body.value = "";
    filePath.value = "";
    date.value = "";
    author.value = "";

}