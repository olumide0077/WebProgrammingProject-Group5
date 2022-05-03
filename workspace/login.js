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

document.getElementById("signupbtn").addEventListener("click", function() {
    if(document.getElementById("signUpPassword").value != document.getElementById("confirmSignUpPassword").value) return alert('Password does not match!');

    axios.post('https://rest-api-webproject.herokuapp.com/signup', {
            username : document.getElementById("signUpUsername").value,
            email: document.getElementById("signUpEmail").value,
            password : document.getElementById("signUpPassword").value
        })
        .then(function (response) {
            if(response.data){
                window.localStorage.setItem('userAccess', JSON.stringify(response.data));
                window.location = "./homepage.html"
            }
        })
        .catch(function (error) {
            alert(error.response.data.error)
        });
});

document.getElementById("signinBtn").addEventListener("click", function() {

    axios.post('https://rest-api-webproject.herokuapp.com/signin', {
            email: document.getElementById("signinEmail").value,
            password : document.getElementById("signinPassword").value
        })
        .then(function (response) {
            console.log(response)
            if(response.data){
                window.localStorage.setItem('userAccess', JSON.stringify(response.data));
                window.location = "./homepage.html"
            }
        })
        .catch(function (error) {
            alert(error.response.data.error)
        });
});