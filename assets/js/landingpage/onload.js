var USER = {
    "login":false,
    "user_data":undefined
}
window.onload = function(){
    GetIPLoginAccount(function(user_data){
        if(user_data){
            USER.login = true;
            USER["user_data"] = user_data;
            document.querySelector("#pageheader-nav-right-user-nav-y-profile-username").innerText = USER["user_data"]["username"];
        }
    }).then(function(_){
        StartLandingPageEditorAnimation();
    })
}

function LoginLoad(){}