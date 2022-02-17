"use strict";

const accessToken = localStorage.getItem("auth");
const token = accessToken.replace(/['"]+/g, "");

const getQueries = async() => {
    const res = await fetch(
        "https://test-my-brand-api.herokuapp.com/api/v1/queries", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const result = await res.json();

    const ul = document.querySelector("#ul");

    // render html
    if (res.status === 200) {
        let question = result.data;
        for (let index = 0; index < question.length; index++) {
            const elem = Object.keys(question[index]);
            const val = Object.values(question[index]);

            const li = document.createElement("li");

            const h3 = document.createElement("h3");
            h3.textContent = elem[1] + `: ` + val[1];
            const h4 = document.createElement("h4");
            h4.textContent = elem[2] + `: ` + val[2];
            const h5 = document.createElement("h5");
            h5.textContent = elem[3] + `: `;

            const h6 = document.createElement("h6");
            h6.textContent = elem[4] + `: ` + val[4];
            h6.style.cssText = "float:right;font-style:italic;";
            const p = document.createElement("p");
            p.setAttribute("class", "paragraph-1");
            p.textContent = val[3];
            const div = document.createElement("div");
            div.setAttribute("class", "action");
            const a = document.createElement("a");
            a.setAttribute("class", "delete");
            a.textContent = "Delete";
            a.style.cursor = "pointer";
            a.addEventListener("click", deleteItem);
            const idelete = document.createElement("i");
            idelete.setAttribute("class", "icon-trash");
            const edit = document.createElement("a");
            edit.setAttribute("href", "https://mail.google.com/");
            edit.setAttribute("class", "publish");
            edit.textContent = "reply";
            const iedit = document.createElement("i");
            iedit.setAttribute("class", "icon-edit-sign");

            edit.appendChild(iedit);
            a.appendChild(idelete);
            div.append(edit, a);
            li.append(h6, h3, h4, h5, p, div);
            ul.prepend(li);


            // function to delete query
            async function deleteItem(id) {

                const del = confirm("are you sure you want to delete comment?")

                if (del === true) {
                    const response = await fetch(`https://test-my-brand-api.herokuapp.com/api/v1/queries/${question[index]._id}`, {
                        method: 'delete',
                        headers: {
                            Authorization: `Bearer ${token}`

                        },

                    })
                    if (response.status === 200) {
                        const result = await response.json();

                        // console.log(result)
                    }

                    ul.innerHTML = "";
                    getQueries();
                    // location.reload();



                } else {
                    return false;
                }


            }


        }


    }
};



getQueries();