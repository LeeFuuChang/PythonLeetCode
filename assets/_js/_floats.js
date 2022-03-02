// float
const all_floats = document.querySelectorAll(".floatfixed");





// login
const login_float = document.querySelector("#login-float");
const login_float_close = login_float.querySelector("#login-float-content-header-close");
const login_float_username = login_float.querySelector("#login-float-content-username");
const login_float_password = login_float.querySelector("#login-float-content-password");
const login_float_submit = login_float.querySelector("#login-float-content-submit");
const login_float_signup = login_float.querySelector("#login-float-content-noaccount-signup");
// signup
const signup_float = document.querySelector("#signup-float");
const signup_float_close = signup_float.querySelector("#signup-float-content-header-close");
const signup_float_email = signup_float.querySelector("#signup-float-content-email");
const signup_float_username = signup_float.querySelector("#signup-float-content-username");
const signup_float_password = signup_float.querySelector("#signup-float-content-password");
const signup_float_confirm = signup_float.querySelector("#signup-float-content-confirm");
const signup_float_submit = signup_float.querySelector("#signup-float-content-submit");
const signup_float_login = signup_float.querySelector("#signup-float-content-noaccount-login");
// listeners
showLogin = function(){
    login_float_username.value = "";
    login_float_password.value = "";
    login_float.classList.add("active");
};
login_float_close.addEventListener("click", function(){
    if(login_float.classList.contains("active")){
        login_float.classList.remove("active");
    }
});
login_float_submit.addEventListener("click", function(){
    let username = login_float_username.value;
    let password = login_float_password.value;
    let now_time = getNow();
    fetch(
        `/account/login?username=${username}&password=${password}&time=${now_time}`, {
            method:"GET"
        }
    ).then(res => {
        return res.json()
    }).then(result => {
        console.log(result);
        switch(result["state"]){
            case 1:
                console.log("Login OK");
                all_floats.forEach(float => {
                    if(float.classList.contains("active")){
                        float.classList.remove("active");
                    }
                });
                USER.login = true;
                USER["user_data"] = result["user_data"];
                document.querySelector("#pageheader-nav-right-user-nav-y-profile-username").innerText = USER["user_data"]["username"];
                LoginLoad();
                break;
            default:
                console.log("Invalid E-mail or Username or Password");
                alert("Invalid E-mail or Username or Password");
                break;
        };
    });
});
login_float_signup.addEventListener("click", function(){
    all_floats.forEach(float => {
        if(float.classList.contains("active")){
            float.classList.remove("active");
        };
    });
    signup_float.classList.add("active");
});

showSignUP = function(){
    signup_float_email.value = "";
    signup_float_username.value = "";
    signup_float_password.value = "";
    signup_float_confirm.value = "";
    signup_float.classList.add("active");
};
signup_float_close.addEventListener("click", function(){
    if(signup_float.classList.contains("active")){
        signup_float.classList.remove("active");
    };
});
signup_float_submit.addEventListener("click", function(){
    let email = signup_float_email.value;
    let username = signup_float_username.value;
    let password = signup_float_password.value;
    let confirm = signup_float_confirm.value;
    let now_time = getNow();
    if(password == confirm){
        fetch(
            `/account/signup?email=${email}&username=${username}&password=${password}&time=${now_time}`, {
                method:"GET"
            }
        ).then(res => {
            return res.json();
        }).then(result => {
            console.log(result);
            switch(result["state"]){
                case 1:
                    console.log("Register OK, Auto Login");
                    all_floats.forEach(float => {
                        if(float.classList.contains("active")){
                            float.classList.remove("active");
                        }
                    });
                    USER.login = true;
                    USER["user_data"] = result["user_data"];
                    document.querySelector("#pageheader-nav-right-user-nav-y-profile-username").innerText = USER["user_data"]["username"];
                    LoginLoad();
                    break;
                case -1:
                    console.log("E-mail already existed");
                    alert("E-mail already existed");
                    break;
                case -2:
                    console.log("Username already existed");
                    alert("Username already existed");
                    break;
            };
        });
    }else{
        alert("UnMatching password");
    };
});
signup_float_login.addEventListener("click", function(){
    all_floats.forEach(float => {
        if(float.classList.contains("active")){
            float.classList.remove("active");
        };
    });
    login_float_username.value = "";
    login_float_password.value = "";
    login_float.classList.add("active");
});