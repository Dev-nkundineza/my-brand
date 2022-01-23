'use strict';


const ul = document.querySelector("#ul");


function displayItems() {
    const question = JSON.parse(localStorage.getItem("questions"));

    for (let index = 0; index < question.length; index++) {
        const elem = Object.keys(question[index]);
        const val = Object.values(question[index])
            // const ul = document.querySelector("#ul");

        const li = document.createElement("li");



        const h3 = document.createElement("h3");
        h3.textContent = elem[0] + `:` + val[0];
        const h4 = document.createElement("h4");
        h4.textContent = elem[1] + `:` + val[1];
        const h5 = document.createElement("h5");
        h5.textContent = elem[2] + `:`;

        const h6 = document.createElement("h6");
        h6.textContent = elem[3] + `:` + val[3];
        h6.style.cssText = "float:right;font-style:italic;";
        const p = document.createElement("p");
        p.setAttribute('class', 'paragraph-1')
        p.textContent = val[2];
        const div = document.createElement("div")
        div.setAttribute('class', 'action');
        const a = document.createElement("a")
        a.setAttribute('class', 'delete');
        a.textContent = 'Delete';
        a.style.cursor = "pointer";
        a.addEventListener("click", deleteItem)
        const idelete = document.createElement("i");
        idelete.setAttribute('class', 'icon-trash');
        const edit = document.createElement("a");
        edit.setAttribute('href', 'https://mail.google.com/');
        edit.setAttribute('class', 'publish');
        edit.textContent = "reply";
        const iedit = document.createElement("i");
        iedit.setAttribute('class', 'icon-edit-sign');

        edit.appendChild(iedit);
        a.appendChild(idelete);
        div.append(edit, a);
        li.append(h6, h3, h4, h5, p, div);
        ul.prepend(li);
        console.log(ul);


        // function to delete query

        function deleteItem() {
            let questions;

            const del = confirm("are you sure you want to delete comment?")

            if (del === true) {
                if (localStorage.getItem("questions") === null) {
                    questions = [];
                } else {
                    questions = JSON.parse(localStorage.getItem("questions"))
                }

            }

            questions.splice(index, 1);
            localStorage.setItem("questions", JSON.stringify(questions));
            ul.innerHTML = "";
            displayItems();
            location.reload();


        }
    }



}
displayItems();