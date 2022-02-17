class Auth {
    constructor() {
        document.querySelector("body").style.display = "none";
        const auth = localStorage.getItem("auth");
        this.validateAuth(auth);
    }

    validateAuth(auth) {
        if (!auth) {
            window.location.replace("../index.html");
        } else {
            document.querySelector("body").style.display = "block";
        }
    }

    logout() {
        const auth = localStorage.removeItem("auth");
        window.location.replace("../index.html");
    }
}