// const mainMenu = document.querySelector('.navbar');
// const closeMenu = document.querySelector('.closeMenu');
// const openMenu = document.querySelector('.openMenu');

// openMenu.addEventListener("click ", show);
// closeMenu.addEventListener("click ", close);

// function show() {
//     mainMenu.style.display = 'flex';
//     mainMenu.style.top = '0';

// }

// function close() {

//     mainMenu.style.left = '-100%';
// }

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