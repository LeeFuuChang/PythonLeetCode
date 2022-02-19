window.onload = function(){
    GetIPLoginAccount(function(user_data){
        if(user_data){
            USER.login = true;
            USER["user_data"] = user_data;
            content_header_info_username.innerText = USER["user_data"]["username"];
            content_header_info_email.innerText = USER["user_data"]["email"];

            content_header_frame_img.src = `/account/profile/${USER["user_data"]["username"]}/get_profile_img`;
        }
    });
}

function LoginLoad(){}