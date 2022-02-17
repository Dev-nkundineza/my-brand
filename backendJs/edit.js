// fetching data from blog lists by id
let id = location.hash.split('#')[1]
console.log(id);
const accessToken = localStorage.getItem("auth");
const token = accessToken.replace(/['"]+/g, "");
console.log(token)




//get form elements

let form = document.querySelector("form");

const title = form.elements[0]
const content = form.elements[1]
const author = form.elements[3]
console.log(title)
const update = async() => {

    let formData = new FormData(form);
    const response = await fetch(`https://test-my-brand-api.herokuapp.com/api/v1/articles/${id}`, {
        method: 'PATCH',
        body: formData,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    if (response.status === 200) {
        alert("successfully updated")
        window.location.replace("../pages/dashboard.html");
        const result = await response.json();
        console.log(result)
    } else {
        console.log("failed to update user")
    }
}


const getArticle = async() => {
    const res = await fetch(`https://test-my-brand-api.herokuapp.com/api/v1/articles/${id}`, {
        method: 'GET'
    })

    const result = await res.json();

    if (res.status === 200) {

        title.value = result.data.title;
        content.value = result.data.content;
        author.value = result.data.author;
        console.log(result)
    }
}

getArticle();




let btn = document.querySelector(".submit-button");
btn.addEventListener('click', update);


//function to update a post

//get current date

// const timeNow = new Date();
// const year = timeNow.getFullYear();
// const month = `${timeNow.getMonth() + 1}`.padStart(2, 0);
// const date = `${timeNow.getDate()}`.padStart(2, 0);
// const hour = timeNow.getHours();
// const minutes = timeNow.getMinutes();

// end

// function updatePost() {

//     let newpost = {
//         title: newTitle.value,
//         body: newBody.value,
//         thumbnail: imgUrl,
//         date: `${date}/${month}/${year},${hour}:${minutes}`,
//         author: newAuthor.value,
//         stat: post.stat,
//     }
//     if (!imgUrl) {
//         alert("no image of post")
//     } else {
//         posts.splice(id, 1, newpost);
//         localStorage.setItem("posts", JSON.stringify(posts));
//         alert("successfully updated")
//         window.location.replace("../pages/dashboard.html");
//         console.log(posts)
//     }


// }