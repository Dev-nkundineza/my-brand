let id = location.hash.split('')[1]
console.log(id);
let posts = JSON.parse(localStorage.getItem('posts'));
let post = posts[id];


let form = document.querySelector("form");
let newTitle = form.elements[0];
newTitle.value = post.title;
let newBody = form.elements[1];
newBody.value = post.body;
let img = form.elements[2];
let newDate = form.elements[3];
newDate.value = post.date;
let newAuthor = form.elements[4];
newAuthor.value = post.author;

let btn = document.querySelector(".submit-button");
btn.addEventListener('click', updatePost);

function updatePost() {

    let newpost = {
        title: newTitle.value,
        body: newBody.value,
        thumbnail: img.value,
        date: newDate.value,
        author: newAuthor.value
    }
    let posts = JSON.parse(localStorage.getItem("posts"));
    posts.splice(id, 1, newpost);
    localStorage.setItem("posts", JSON.stringify(posts));
    alert("successfully updated")
    window.location.replace("http://127.0.0.1:5502/pages/dashboard.html");
    console.log(posts)

}
console.log(form);