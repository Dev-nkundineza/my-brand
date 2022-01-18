let id = location.hash.split('')[1]
console.log(id);
let posts = JSON.parse(localStorage.getItem('posts'));
let post = posts[id];

console.log(post);

document.querySelector("#img").setAttribute("src", post.thumbnail)

document.querySelector("h1").innerHTML = post.title;
document.querySelector("#body").innerHTML = post.body;
document.querySelector("#publication-date").innerHTML = post.date;
document.querySelector("#author").innerHTML = `By,${post.author}`;
const form = document.querySelector("form");

visitor = form.elements[0];
commentBody = form.elements[1];
btn = form.elements[2];

form.addEventListener('submit', (e) => {
    e.preventDefault();
    validateForm();

})

function validateForm() {
    if (!visitor.value || !commentBody.value) {
        alert("field is empty!");
    } else if (visitor.value.length < 3) {
        alert("username is short")
    } else if (commentBody.value.length > 300) {
        alert("the comment is too long")
    } else {
        saveComment();
        addComment();
        alert("added successfully!");
    }
}

const ul = document.querySelector("#ul");

function saveComment() {

    let comment;

    if (localStorage.getItem("comments") === null) {
        comment = [];
    } else {
        comment = JSON.parse(localStorage.getItem("comments"))
    }

    let newObj = {
        name: visitor.value,
        comment: commentBody.value,

    }

    comment.push(newObj);
    localStorage.setItem("comments", JSON.stringify(comment))
    form.reset();
    location.reload();
}


// comments list
const allComments = JSON.parse(localStorage.getItem("comments"));

function addComment() {

    console.log(allComments)

    for (let index = 0; index < allComments.length; index++) {
        const h4 = document.createElement("h4")
        h4.textContent = allComments[index].name;

        const paragraph = document.createElement("P") //
        paragraph.textContent = allComments[index].comment;
        paragraph.style.marginTop = " 20px";
        const li = document.createElement("li");
        const div = document.createElement("div")
        div.style.marginTop = "15px";
        const thumbsUp = document.createElement("i")
        thumbsUp.setAttribute("class", "icon-thumbs-up")
        thumbsUp.addEventListener('click', (e) => {
            e.preventDefault();
            addLike();

        })
        const span1 = document.createElement("span")
        span1.textContent = "0";
        span1.style.marginRight = "30px";
        let clicked = false;

        // add like
        function addLike() {
            if (!clicked) {
                clicked = true;
                span1.textContent++;
            } else {
                clicked = false;
                span1.textContent--;
                return false;
            }


        }


        const span2 = document.createComment("span");
        // span2.innerHTML = `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`;
        const thumbsDown = document.createElement("i")
        thumbsDown.setAttribute("class", "icon-thumbs-down")
        const span3 = document.createElement("span")
        span3.textContent = "0";
        thumbsDown.addEventListener("click", disLike)

        // add dislike
        function disLike() {
            if (!clicked) {
                clicked = true;
                span3.textContent++;
            } else {
                clicked = false;
                span3.textContent--;
                return false;
            }


        }
        const span4 = document.createComment("span");

        const hr = document.createElement("hr");

        div.append(thumbsUp, span1, span2, thumbsDown, span3, span4)
        li.append(h4, paragraph, div, hr);
        li.style.fontSize = "18px";

        ul.prepend(li)


    }
}

addComment();

document.querySelector("#no-comments").innerHTML = allComments.length + " " + "comments ";