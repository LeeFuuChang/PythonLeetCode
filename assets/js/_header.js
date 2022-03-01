























// Header nav right

// User
const pageheader_nav_right_user = document.querySelector("#pageheader-nav-right-user");
const pageheader_nav_right_user_icon = pageheader_nav_right_user.querySelector("#pageheader-nav-right-user-icon");
const pageheader_nav_right_user_nav_y = pageheader_nav_right_user.querySelector("#pageheader-nav-right-user-nav-y");
const pageheader_nav_right_user_nav_n = pageheader_nav_right_user.querySelector("#pageheader-nav-right-user-nav-n");
pageheader_nav_right_user_icon.addEventListener("click", function(){
    let target = undefined;
    if(USER.login){
        target = pageheader_nav_right_user_nav_y;
    }else{
        target = pageheader_nav_right_user_nav_n;
    }
    if(target.classList.contains("active")){
        target.classList.remove("active");
    }else{
        target.classList.add("active");
    }
})


// User yes login nav
pageheader_nav_right_user_nav_y.addEventListener("mouseleave", function(){
    pageheader_nav_right_user_nav_y.classList.remove("active");
})

const pageheader_nav_right_user_nav_y_profile = pageheader_nav_right_user_nav_y.querySelector("#pageheader-nav-right-user-nav-y-profile");
pageheader_nav_right_user_nav_y_profile.addEventListener("click", function(){
    location = `/account/profile/${USER["user_data"]["username"]}`;
    pageheader_nav_right_user_nav_y.classList.remove("active");
})

const pageheader_nav_right_user_nav_y_favorite = pageheader_nav_right_user_nav_y.querySelector("#pageheader-nav-right-user-nav-y-favorite");
pageheader_nav_right_user_nav_y_favorite.addEventListener("click", function(){
    pageheader_nav_right_user_nav_y.classList.remove("active");
})

const pageheader_nav_right_user_nav_y_submissions = pageheader_nav_right_user_nav_y.querySelector("#pageheader-nav-right-user-nav-y-submissions");
pageheader_nav_right_user_nav_y_submissions.addEventListener("click", function(){
    location = `/account/profile/${USER["user_data"]["username"]}/submissions`;
    pageheader_nav_right_user_nav_y.classList.remove("active");
})

const pageheader_nav_right_user_nav_y_logout = pageheader_nav_right_user_nav_y.querySelector("#pageheader-nav-right-user-nav-y-logout");
pageheader_nav_right_user_nav_y_logout.addEventListener("click", function(){
    pageheader_nav_right_user_nav_y.classList.remove("active");
    fetch(
        `/account/logout?username=${USER["user_data"]["username"]}`,
        {method:"GET"}
    ).then(res => {
        return res.json();
    }).then(res => {
        if(res["state"]){
            USER.login = false;
            USER["user_data"] = undefined;
        }
    })
    location.href = "/";
})


// User no Login nav
pageheader_nav_right_user_nav_n.addEventListener("mouseleave", function(){
    pageheader_nav_right_user_nav_n.classList.remove("active");
})

const pageheader_nav_right_user_nav_n_login = pageheader_nav_right_user_nav_n.querySelector("#pageheader-nav-right-user-nav-n-login");
pageheader_nav_right_user_nav_n_login.addEventListener("click", function(){
    pageheader_nav_right_user_nav_n.classList.remove("active");
    showLogin();
})

const pageheader_nav_right_user_nav_n_signup = pageheader_nav_right_user_nav_n.querySelector("#pageheader-nav-right-user-nav-n-signup");
pageheader_nav_right_user_nav_n_signup.addEventListener("click", function(){
    pageheader_nav_right_user_nav_n.classList.remove("active");
    showSignUP();
})
