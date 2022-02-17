const auth = localStorage.getItem("auth");
const user = localStorage.getItem("loggedUser");
const loggedUser = user.replace(/['"]+/g, "");
const dashboard = document.querySelector("#dashboard")
dashboard.style.display = 'none'
if (auth) {

    const signin = document.querySelector("#signin");
    signin.style.display = 'none'
    dashboard.style.display = 'inline'
    dashboard.style.backgroundColor = 'white'
    dashboard.style.borderRadius = '10'
    dashboard.style.color = 'black'
    dashboard.setAttribute("href", `../pages/dashboard.html#${loggedUser}`)
}



const navToggler = document.querySelector(".nav-toggler");
navToggler.addEventListener("click", navToggle);

function navToggle() {
    navToggler.classList.toggle("active");
    const nav = document.querySelector(".nav");
    nav.classList.toggle("open");
    if (nav.classList.contains("open")) {
        nav.style.maxHeight = nav.scrollHeight + "px";
    } else {
        nav.removeAttribute("style");
    }
}