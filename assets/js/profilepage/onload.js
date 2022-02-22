var Profile_Owner = {
    "username":document.querySelector("#content-header-info-username").innerText,
    "user_data":undefined
}
window.onload = function(){
    GetIPLoginAccount(function(user_data){
        if(user_data){
            USER.login = true;
            USER["user_data"] = user_data;
        }
    });
    
    fetch(
        `/account/get?get=profile&username=${Profile_Owner["username"]}`,
        {method:"GET"}
    ).then(res => {
        return res.json();
    }).then(res => {
        if(res["state"]){
            Profile_Owner["user_data"] = res["profile_data"];
            content_header_info_username.innerText = Profile_Owner["user_data"]["username"];
            content_header_info_email.innerText = Profile_Owner["user_data"]["email"];
            content_header_frame_img.src = `/account/profile/${Profile_Owner["user_data"]["username"]}/get_profile_img`;
            LoadProfile();
        }
    })
}

function LoginLoad(){}

const content_inner_header_nav_profile = document.querySelector("#content-inner-header-nav-profile");
const content_inner_profile = document.querySelector("#content-inner-profile");
const content_inner_header_nav_submissions = document.querySelector("#content-inner-header-nav-submissions");
const content_inner_submissions = document.querySelector("#content-inner-submissions");
const content_inner_header_nav_posts = document.querySelector("#content-inner-header-nav-posts");
const content_inner_posts = document.querySelector("#content-inner-posts");