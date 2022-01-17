// fetching data from blog lists by id
let id = location.hash.split('')[1]
console.log(id);
let posts = JSON.parse(localStorage.getItem('posts'));
let post = posts[id];

// converting image
let imgUrl;

document.querySelector("#imageInput").addEventListener("change", function() {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        imgUrl = reader.result;

    })
    reader.readAsDataURL(this.files[0]);
})





//....end....//

//get form elements

let form = document.querySelector("form");
let newTitle = form.elements[0];
newTitle.value = post.title;
let newBody = form.elements[1];
newBody.value = post.body;
let newDate = form.elements[3];
newDate.value = post.date;
let newAuthor = form.elements[4];
newAuthor.value = post.author;

let btn = document.querySelector(".submit-button");
btn.addEventListener('click', updatePost);


//function to update a post

function updatePost() {

    let newpost = {
        title: newTitle.value,
        body: newBody.value,
        thumbnail: imgUrl,
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