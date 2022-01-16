'use strict';

const posts = JSON.parse(localStorage.getItem("posts"));


const tbody = document.querySelector("tbody");


function displayPost(index) {

    for (let index = 0; index < posts.length; index++) {
        // const table = document.querySelector("table");
        // const thead = document.createElement("thead");
        // const thead1 = document.createElement("th");
        // thead1.textContent = "N";
        // const sup = document.createElement("sup");
        // sup.textContent = "o";
        // const headtitle = document.createElement("th");
        // headtitle.textContent = "Title";

        // const date = document.createElement("th");
        // date.textContent = "Date published";
        // const action = document.createElement("th");
        // action.setAttribute("colspan", "3");
        // action.textContent = "Action";

        // thead1.appendChild(sup);
        // thead.appendChild(thead1, headtitle, date, action);
        // thead.appendChild(headtitle);
        // thead.appendChild(date);
        // thead.appendChild(action);
        // table.appendChild(thead);

        // const tbody = document.createElement("tbody");
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
        publishButton.appendChild(publishIcon);
        publishButton.appendChild(label2);
        td6.appendChild(publishButton);
        td5.style.cursor = "pointer";

        // //append td's to tr

        tr.append(td1, td2, td3, td4, td5, td6);

        tbody.appendChild(tr);


        // table.appendChild(tbody);


        //delete

        function deletePost() {
            let posts;

            const del = confirm("are you sure you want to delete comment?")

            if (del === true) {
                if (localStorage.getItem("posts") === null) {
                    posts = [];
                } else {
                    posts = JSON.parse(localStorage.getItem("posts"))
                }

            }

            posts.splice(index, 1);
            localStorage.setItem("posts", JSON.stringify(posts));

            tbody.innerHTML = "";
            displayPost();

        }

        //edit post 
        function editPost() {

            location.assign(`../pages/update.html#${index}`)
        }

    }
}

displayPost();