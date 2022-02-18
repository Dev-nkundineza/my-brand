'use strict';

//getting posts by using fetch api

const getArticles = async() => {
    const res = await fetch('https://test-my-brand-api.herokuapp.com/api/v1/articles')
    const result = await res.json();

    if (res.status === 200) {
        console.log(result.data.length);
        console.log(result.data);

        let post = result.data


        // get articles data

        for (let index = 0; index < post.length; index++) {

            if (post[index].status === true) {
                const blogCard = document.querySelector(".blog-card");

                const card = document.createElement("div")
                card.setAttribute('class', 'card');
                const imgdiv = document.createElement("div")
                imgdiv.setAttribute('class', 'photo img-1');
                imgdiv.style.backgroundImage = " `url(${post[index].thumbnail})`";

                const img = document.createElement("img")
                img.setAttribute("src", post[index].image)
                img.setAttribute("alt", 'no photo');
                img.style.cssText = "width:100%; height:100%"
                imgdiv.appendChild(img);
                console.log(imgdiv);
                const description = document.createElement("div")
                description.setAttribute('class', 'description');
                const thumbs = document.createElement("div")
                const icon1 = document.createElement("i")
                icon1.setAttribute('class', 'icon-thumbs-up');
                const span = document.createElement("span");
                span.textContent = "0";
                const span1 = document.createElement("span")
                span.style.paddingRight = "20px";

                icon1.addEventListener('click', addLike)
                let clicked = false;

                function addLike() {
                    if (!clicked) {
                        clicked = true;
                        span.textContent++;
                    } else {
                        clicked = false;
                        span.textContent--;
                        return false;
                    }


                }


                const icon2 = document.createElement("i")
                icon2.setAttribute('class', 'icon-thumbs-down');
                const span2 = document.createElement("span");
                span2.textContent = "0";
                thumbs.appendChild(icon1);
                thumbs.appendChild(span);
                thumbs.appendChild(span1);
                thumbs.appendChild(icon2);

                thumbs.appendChild(span2);
                icon2.addEventListener('click', disLike)
                let notclicked = false;

                function disLike() {
                    if (!notclicked) {
                        notclicked = true;
                        span2.textContent++;
                    } else {
                        notclicked = false;
                        span2.textContent--;
                        return false;
                    }


                }
                const title = document.createElement("h1");
                title.textContent = post[index].title;
                console.log(title);
                const body = document.createElement("p");
                body.textContent = truncateParagraph(post[index].content);
                const link = document.createElement("a")
                link.addEventListener("click", details);
                const btn = document.createElement("button");
                btn.textContent = "Read More";

                link.appendChild(btn);
                description.appendChild(thumbs);
                description.appendChild(title);
                description.appendChild(body);
                description.appendChild(link);

                card.appendChild(imgdiv);
                card.appendChild(description);
                blogCard.appendChild(card);
                // document.appendChild(blogCard);

                // console.log(blogCard);

                function details() {

                    window.location.assign(`../pages/details.html#${post[index]._id}`)
                }

            }

        }
        return result;

    } else {
        return false;
    }
}


//truncate the paragraph
function truncateParagraph(str) {
    if (str.length > 150) {
        return (str.substring(0, 150) + "....");
    } else {
        return str;
    }
}



getArticles();