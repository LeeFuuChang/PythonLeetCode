function LoginLoad(){}

const content_header = document.querySelector("#content-header");

const content_header_info_username = document.querySelector("#content-header-info-username");
const content_header_info_email = document.querySelector("#content-header-info-email");
const content_header_frame_img = document.querySelector("#content-header-frame-img");
const content_header_frame_input = document.querySelector("#content-header-frame-input");
var Profile_Owner = {
    "username":content_header_info_username.innerText,
    "user_data":undefined
}

const content_inner_header_nav_profile = document.querySelector("#content-inner-header-nav-profile");
const content_inner_profile = document.querySelector("#content-inner-profile");
const content_inner_header_nav_submissions = document.querySelector("#content-inner-header-nav-submissions");
const content_inner_submissions = document.querySelector("#content-inner-submissions");
const content_inner_header_nav_posts = document.querySelector("#content-inner-header-nav-posts");
const content_inner_posts = document.querySelector("#content-inner-posts");

window.onload = function(){
    GetIPLoginAccount(function(user_data){
        if(user_data){
            USER.login = true;
            USER["user_data"] = user_data;
            document.querySelector("#pageheader-nav-right-user-nav-y-profile-username").innerText = USER["user_data"]["username"];
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

            if(USER["login"] && Profile_Owner["username"] == USER["user_data"]["username"]){
                content_header_frame_img.addEventListener("click", function(){
                    content_header_frame_input.click();
                })
                content_header_frame_input.addEventListener("change", function(value){
                    let file = value.target.files[0];
                    let fdta = new FormData();
                    content_header_frame_img.src = URL.createObjectURL(file);
                    console.log(URL.createObjectURL(file));
                    fdta.append("profile_img", file);
                    fetch(
                        `/account/update?type=profile_img&username=${USER["user_data"]["username"]}`,{
                        method:"POST",
                        body:fdta
                    }).then(res => {
                        return res.json();
                    }).then(res => {
                        if(res["state"]){
                            USER["user_data"] = res["user_data"];
                        }
                    })
                })
            }else{
                content_header_frame_img.style.cursor = "unset";
            }
        }
    })
}
