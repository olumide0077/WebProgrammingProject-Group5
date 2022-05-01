var loginForm = document.querySelector("form.login");
        var signupForm = document.querySelector("form.signup");
        var loginBtn = document.querySelector("label.login");
        var signupBtn = document.querySelector("label.signup");
        var signuplink = document.querySelector(".signup-link a");
        var loginText = document.querySelector(".title-text .login");
        var signupText = document.querySelector(".title-text .signup");
        signupBtn.onclick = (()=>{
            loginForm.style.marginLeft = "-50%";
            loginText.style.marginLeft = "-50%";
        });
        loginBtn.onclick = (()=>{
            loginForm.style.marginLeft = "0%";
            loginText.style.marginLeft = "0%";

        });
        signuplink.onclick = (()=>{
            signupBtn.click();
            return false;
        });