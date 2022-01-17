'use strict';
// validatecreate article form

const form = document.querySelector("form");
const input = document.querySelectorAll("input")


//access form elements
const title = form.elements['title'];
const body = form.elements['body'];
const filePath = form.elements['file'];
const date = form.elements['date'];
const author = form.elements['user'];

var imgUrl;


document.querySelector("#imageInput").addEventListener("change", function() {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        imgUrl = reader.result;

    })
    reader.readAsDataURL(this.files[0]);
})

console.log(`${imgUrl}`);





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
    alert("posted successfully!");

}