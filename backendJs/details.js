"use strict";

let id = location.hash.split('#')[1]
console.log(id);

const form = document.querySelector("form");

const visitor = form.elements[0];
const commentBody = form.elements[1];
const btn = form.elements[2];



form.addEventListener('submit', (e) => {
    e.preventDefault();
    validateForm();

})

async function validateForm() {
    if (!visitor.value || !commentBody.value) {
        alert("field is empty!");
    } else if (visitor.value.length < 3) {
        alert("username is short")
    } else if (commentBody.value.length > 300) {
        alert("the comment is too long")
    } else {
        await saveComment();
        getComments();
        alert("added successfully!");
    }
}

const ul = document.querySelector("#ul");



// get article by Id

const articleById = async() => {

    const res = await fetch(`https://test-my-brand-api.herokuapp.com/api/v1/articles/${id}`)
    const result = await res.json();

    if (res.status === 200) {
        let post = result.data;
        console.log(post)
        document.querySelector("#img").setAttribute("src", post.image)

        document.querySelector("h1").innerHTML = post.title;
        document.querySelector("#body").innerHTML = post.content;
        document.querySelector("#publication-date").innerHTML = `updated: ${post.createdAt}`
        document.querySelector("#author").innerHTML = `By,${post.author}`;
    } else {
        console.log('Error')
    }
}

articleById();


const saveComment = async() => {
    const newObj = {
        name: visitor.value,
        comment: commentBody.value,

    }
    console.log(JSON.stringify(newObj))
    const res = await fetch(`https://test-my-brand-api.herokuapp.com/api/v1/comment/${id}`, {
        method: 'POST',
        body: JSON.stringify(newObj),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await res.json();

    console.log(res)


    console.log(data)
    form.reset();
    location.reload();
}



// // get comments


const getComments = async() => {
    const commentResult = await fetch(`https://test-my-brand-api.herokuapp.com/api/v1/comment/${id}`)
    const comment = await commentResult.json();

    // comments list
    const allComments = comment.data;
    document.querySelector("#no-comments").innerHTML = allComments.length + " " + "comments ";
    console.log(allComments)

    function addComment() {

        for (let index = 0; index < allComments.length; index++) {
            const h4 = document.createElement("h4")
            h4.textContent = allComments[index].name;

            const paragraph = document.createElement("P")
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
            let notclicked = false;
            // add dislike
            function disLike() {
                if (!notclicked) {
                    notclicked = true;
                    span3.textContent++;
                } else {
                    notclicked = false;
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
}


getComments();