'use strict';

// fetch data from localstorage
const posts = JSON.parse(localStorage.getItem("posts"));
var tbody = document.querySelector("tbody");

// function to display post from local storage to admin 

function displayPost(index) {

    for (let index = 0; index < posts.length; index++) {
        console.log(posts[index].title);

        const tr = document.createElement("tr");
        const td1 = document.createElement("td");
        td1.textContent = index + 1;
        const td2 = document.createElement("td");
        td2.textContent = posts[index].title;
        const td3 = document.createElement("td");
        td3.textContent = posts[index].date;
        const td4 = document.createElement("td");
        const editButton = document.createElement("a");
        editButton.setAttribute("class", "edit");

        const editIcon = document.createElement("i");
        editButton.setAttribute("class", "icon-edit-sign");
        const label = document.createElement("span");
        label.textContent = "Edit";
        editButton.appendChild(editIcon);
        editButton.appendChild(label);
        editButton.addEventListener("click", editPost)
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
        td5.addEventListener("click", deletePost)
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
            localStorage.setItem("posts", JSON.stringify(posts))
            alert("successfully published!")
            location.reload();

            console.log(posts);





        })
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


        // table.appendChild(tbody);


        //delete

        function deletePost() {
            let postTodelete;

            const del = confirm("are you sure you want to delete comment?")

            if (del === true) {
                if (localStorage.getItem("posts") === null) {
                    postTodelete = [];
                } else {
                    postTodelete = JSON.parse(localStorage.getItem("posts"))
                }


            }
            postTodelete.splice(index, 1);
            localStorage.setItem("posts", JSON.stringify(postTodelete));

            tbody.textContent = "";
            displayPost();
            location.reload();
            alert("deleted successfull")




        }


        //edit post 
        function editPost() {

            location.assign(`../pages/update.html#${index}`)
        }

    }
}


displayPost();

// profile section

const credential = JSON.parse(localStorage.getItem("accounts"))


//imgdiv
const imgDiv = document.querySelector('.img-upload');
const img = document.querySelector('#profile-pic');
console.log(img);
const file = document.querySelector('#file');
const uploadBtn = document.querySelector('#uploadBtn');

//on mouse hover
imgDiv.addEventListener('mouseenter', function() {
    uploadBtn.style.display = "block";
});

imgDiv.addEventListener('mouseleave', function() {
    uploadBtn.style.display = "none";
});


//declare a variable for choosen image

let imgProfile;

file.addEventListener('change', function() {
    //this refers to file
    const choosedFile = this.files[0];

    if (choosedFile) {

        const reader = new FileReader(); //FileReader is a predefined function of JS

        reader.addEventListener('load', function() {
            img.setAttribute("src", reader.result);
            console.log("ihi");
            credential[2] = reader.result;
            localStorage.setItem("accounts", JSON.stringify(credential));
            console.log(credential);
        });

        reader.readAsDataURL(choosedFile);


    }
});



const getProfile = document.querySelector("#profile-1");
getProfile.style.cssText = "width:40px;height:40px;border-radius:50%;top:0";
getProfile.setAttribute("src", credential[2]);

//end


//ACCOUNTS CREDENTIALS



const form = document.querySelector("#form");
form.addEventListener('submit', (e) => {
    e.preventDefault();
    validateForm();
})
const username = form.elements[1];
const password = form.elements[2];
username.value = credential[0];
password.value = credential[1];
console.log(typeof username);

function validateForm() {
    if (!username.value || !password.value) {
        alert("form is empty!");
    } else {
        updateProfile();
    }
}


function updateProfile() {
    credential[0] = username.value;
    credential[1] = password.value;
    // credential[2] = reader.readAsDataURL(imgProfile);
    localStorage.setItem("accounts", JSON.stringify(credential));
    confirm("confirm updates");
    form.reset();
    location.reload();
}


// update profile form
const profile = document.querySelector("#profile");
const button = document.querySelector(".update-profile");
const button2 = document.querySelector("#times");
button2.style.cursor = "pointer";
profile.addEventListener("click", () => {

    button.classList.remove('hidden');


});
button2.addEventListener("click", () => {

    button.classList.add('hidden');


});


// name of admin user


document.querySelector("#admin-user").textContent = credential[0];