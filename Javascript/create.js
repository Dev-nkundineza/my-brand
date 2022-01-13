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

// const btn = document.querySelector(".submit-button");
// btn.addEventListener("click", addPost);

// function addPost() {

//     for (let i = 0; i <= input.length; i++) {

//         if (input[i].value !== "") {

//             addPostToLs();
//         } else {
//             alert("oops! invalid form")
//         }
//     }
// }

// add form data to the local storage

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
    console.log(title.value);
    console.log(body.value);
    console.log(filePath.value);
    console.log(date.value);
    console.log(author.value);
    title.value = "";
    body.value = "";
    filePath.value = "";
    date.value = "";
    author.value = "";

}