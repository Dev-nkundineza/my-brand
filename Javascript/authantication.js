class Auth {
    constructor() {
        document.querySelector("body").style.display = "none";
        const auth = localStorage.getItem("auth");
        this.validateAuth(auth);
    }


    validateAuth(auth) {

        if (auth ==  1) {

            document.querySelector("body").style.display = 'block'; // window.location.replace('http://127.0.0.1:5502/pages/signin.html');
        } else {
            window.location.replace('signin.html');

            logout();
        }
    }

    logout() {
        const auth = localStorage.removeItem("auth");
        window.location.replace('signin.html');
    }
}

console.log("hello")