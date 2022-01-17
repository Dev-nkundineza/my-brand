'use strict';
const post = JSON.parse(localStorage.getItem("posts"));

console.log(post);
//truncate the paragraph
function truncateParagraph(str) {
    if (str.length > 150) {
        return (str.substring(0, 150) + "....");
    } else {
        return str;
    }
}



function displayArticle(index) {
    // const post = JSON.parse(localStorage.getItem("posts"));
    // console.log(post)

    for (let index = 0; index < post.length; index++) {

        const blogCard = document.querySelector(".blog-card");

        const card = document.createElement("div")
        card.setAttribute('class', 'card');
        const imgdiv = document.createElement("div")
        imgdiv.setAttribute('class', 'photo img-1');
        imgdiv.style.backgroundImage = " `url(${post[index].thumbnail})`";

        const img = document.createElement("img")
        img.setAttribute("src", post[index].thumbnail)
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
        const span1 = document.createElement("span")
        span1.style.paddingRight = "20px";

        const icon2 = document.createElement("i")
        icon2.setAttribute('class', 'icon-thumbs-down');
        const span2 = document.createElement("span");
        thumbs.appendChild(icon1);
        thumbs.appendChild(span);
        thumbs.appendChild(span1);
        thumbs.appendChild(icon2);

        thumbs.appendChild(span2);

        const title = document.createElement("h1");
        title.textContent = post[index].title;
        console.log(title);
        const body = document.createElement("p");
        body.textContent = truncateParagraph(post[index].body);
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

            window.location.assign(`http://127.0.0.1:5502/pages/details.html#${index}`)
        }

    }


}

displayArticle();