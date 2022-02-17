"use strict";
// fetch data from database
const accessToken = localStorage.getItem("auth");
const token = accessToken.replace(/['"]+/g, "");
let UserEmail = location.hash.split("#")[1];

console.log(UserEmail);

var tbody = document.querySelector("tbody");
const getPosts = async() => {
    const response = await fetch(
        "https://test-my-brand-api.herokuapp.com/api/v1/articles"
    );
    const result = await response.json();

    if (response.status === 200) {
        let posts = result.data;

        for (let index = 0; index < posts.length; index++) {
            const deletePost = async() => {
                const del = confirm("are you sure you want to delete the post?");
                if (del === true) {
                    const response = await fetch(
                        `https://test-my-brand-api.herokuapp.com/api/v1/articles/${posts[index]._id}`, {
                            method: "DELETE",
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );

                    const result = await response.json();

                    if (response.status === 200) {
                        console.log(result);
                        tbody.textContent = "";
                        location.reload();
                        alert("deleted successfull");
                    }
                }
            };

            const tr = document.createElement("tr");
            const td1 = document.createElement("td");
            td1.textContent = index + 1;
            const td2 = document.createElement("td");
            td2.textContent = posts[index].title;
            const td3 = document.createElement("td");
            td3.textContent = posts[index].createdAt;
            const td4 = document.createElement("td");
            const editButton = document.createElement("a");
            editButton.setAttribute("class", "edit");

            const editIcon = document.createElement("i");
            editButton.setAttribute("class", "icon-edit-sign");
            const label = document.createElement("span");
            label.textContent = "Edit";
            editButton.appendChild(editIcon);
            editButton.appendChild(label);
            editButton.addEventListener("click", editPost);
            td4.appendChild(editButton);
            td4.style.cursor = "pointer";
            //delete

            const td5 = document.createElement("td");
            const delButton = document.createElement("a");
            delButton.setAttribute("class", "delete");

            const delIcon = document.createElement("i");
            delIcon.setAttribute("class", "icon-trash");
            const label1 = document.createElement("span");
            label1.textContent = "Delete";
            delButton.appendChild(delIcon);
            delButton.appendChild(label1);
            td5.appendChild(delButton);
            td5.addEventListener("click", deletePost);
            td5.style.cursor = "pointer";

            //publish
            const td6 = document.createElement("td");
            const publishButton = document.createElement("a");
            publishButton.setAttribute("class", "publish");

            const publishIcon = document.createElement("i");
            publishIcon.setAttribute("class", "icon-edit-sign");
            const label2 = document.createElement("span");
            label2.textContent = "Publish";
            publishButton.append(publishIcon, label2);

            publishButton.addEventListener("click", () => {
                console.log("hello");
                posts[index].stat = true;
                localStorage.setItem("posts", JSON.stringify(posts));
                alert("successfully published!");
                location.reload();

                console.log(posts);
            });
            if (posts[index].stat === false) {
                td6.appendChild(publishButton);
                td6.style.cursor = "pointer";
            } else {
                td6.textContent = "published";
                td6.style.cssText = "color:green";
            }

            // //append td's to tr

            tr.append(td1, td2, td3, td4, td5, td6);

            tbody.appendChild(tr);

            //edit post
            function editPost() {
                location.assign(`../pages/update.html#${posts[index]._id} `);
            }
        }
    }
};

getPosts();

// profile section

const credential = [1, 2, 3, 4];

//imgdiv
const imgDiv = document.querySelector(".img-upload");
const img = document.querySelector("#profile-pic");
const file = document.querySelector("#file");
const uploadBtn = document.querySelector("#uploadBtn");

//on mouse hover
imgDiv.addEventListener("mouseenter", function() {
    uploadBtn.style.display = "block";
});

imgDiv.addEventListener("mouseleave", function() {
    uploadBtn.style.display = "none";
});

//declare a variable for choosen image

let imgProfile;

file.addEventListener("change", function() {
    //this refers to file
    const choosedFile = this.files[0];

    if (choosedFile) {
        const reader = new FileReader(); //FileReader is a predefined function of JS

        reader.addEventListener("load", function() {
            img.setAttribute("src", reader.result);
            console.log("ihi");
            credential[2] = reader.result;
            localStorage.setItem("accounts", JSON.stringify(credential));
            console.log(credential);
        });

        reader.readAsDataURL(choosedFile);
    }
});

const form = document.querySelector("#form");
// form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     validateForm();
// })
const username = form.elements[1];
const email = form.elements[2];
const password = form.elements[2];

function validateForm() {
    if (!username.value || !password.value) {
        alert("form is empty!");
    } else {
        updateProfile();
    }
}

const getUser = async() => {
    const response = await fetch(
        "https://test-my-brand-api.herokuapp.com/api/v1/user", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    const result = await response.json();


    if (response.status === 200) {
        const credential = result.data;

        for (let index = 0; index < credential.length; index++) {
            if ((credential[index].email = UserEmail)) {
                localStorage.setItem("loggedUser", JSON.stringify(credential[index].email));
                const getProfile = document.querySelector("#profile-1");
                getProfile.style.cssText =
                    "width:40px;height:40px;border-radius:50%;top:0";
                document.querySelector("#admin-user").textContent =
                    credential[index].username;
                img.setAttribute("src", credential[index].picture);
                getProfile.setAttribute("src", credential[index].picture);
                console.log(credential[index].picture);
                username.value = credential[index].username;
                email.value = credential[index].email;

                const updateProfile = async() => {
                    const formData = new FormData(form);
                    const response = await fetch(
                        `https://test-my-brand-api.herokuapp.com/api/v1/user/${credential[index]._id}`, {
                            method: "PATCH",
                            body: formData,
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );

                    const result = await response.json();

                    if (response.status === 200) {
                        console.log(result);
                        confirm("confirm updates");
                        form.reset();
                        location.reload();
                    } else {
                        console.log("failed to update user");
                    }
                };

                form.addEventListener("submit", (e) => {
                    e.preventDefault();
                    updateProfile();
                });
            } else {
                console.log("no such user found");
            }
        }
    }
};

getUser();

// update profile form
const profile = document.querySelector("#profile");
const button = document.querySelector(".update-profile");
const button2 = document.querySelector("#times");
button2.style.cursor = "pointer";
profile.addEventListener("click", () => {
    button.classList.remove("hidden");
});
button2.addEventListener("click", () => {
    button.classList.add("hidden");
});