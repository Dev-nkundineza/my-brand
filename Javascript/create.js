'use strict';
// validatecreate article form

const form = document.querySelector("form");
const input = document.querySelectorAll("input")

form.addEventListener("submit", (e) => {
    e.preventDefault()
    validateForm();

})

//access form elements
const title = form.elements['title'];
const body = form.elements['body'];
const filePath = form.elements['file'];
const author = form.elements['user'];
var imgUrl;


// function to validate create form
function validateForm() {
    if (!title.value || !body.value || !filePath.value || !author.value) {
        alert("some field is missing")
        return false;
    } else if (title.value.length < 3 || body.value.length < 10 || author.value < 3) {
        alert("some input are shorter");
        return false;

    } else {
        addPostToLs();
    }
}

// converting image to dat url for storage

document.querySelector("#imageInput").addEventListener("change", function() {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        imgUrl = reader.result;

    })
    reader.readAsDataURL(this.files[0]);
})


// get time

const timeNow = new Date();
const year = timeNow.getFullYear();
const month = `${timeNow.getMonth() + 1}`.padStart(2, 0);
const date = `${timeNow.getDate()}`.padStart(2, 0);
const hour = timeNow.getHours();
const minutes = timeNow.getMinutes();
//


// function of adding a post

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
        thumbnail: imgUrl,
        date: `${date}/${month}/${year},${hour}:${minutes}`,
        author: author.value,
        stat: false,
        Comments: []

    }

    posts.push(obj);
    localStorage.setItem("posts", JSON.stringify(posts));
    title.value = "";
    body.value = "";
    filePath.value = "";
    author.value = "";
    alert("posted successfully!");

}