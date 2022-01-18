const auth = new Auth();

document.querySelector(".logout").addEventListener("click", (e) => {
    if (confirm("you want to logout?")) {
        auth.logout();
    }

})