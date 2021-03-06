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
let newAuthor = form.elements[3];
newAuthor.value = post.author;




let btn = document.querySelector(".submit-button");
btn.addEventListener('click', updatePost);


//function to update a post

//get current date

const timeNow = new Date();
const year = timeNow.getFullYear();
const month = `${timeNow.getMonth() + 1}`.padStart(2, 0);
const date = `${timeNow.getDate()}`.padStart(2, 0);
const hour = timeNow.getHours();
const minutes = timeNow.getMinutes();

// end

function updatePost() {

    let newpost = {
        title: newTitle.value,
        body: newBody.value,
        thumbnail: imgUrl,
        date: `${date}/${month}/${year},${hour}:${minutes}`,
        author: newAuthor.value,
        stat: post.stat,
        Comments: post.Comments,



    }
    if (!imgUrl) {
        alert("no image of post")
    } else {
        posts.splice(id, 1, newpost);
        localStorage.setItem("posts", JSON.stringify(posts));
        alert("successfully updated")
        window.location.replace("../pages/dashboard.html");
        console.log(posts)
    }


}