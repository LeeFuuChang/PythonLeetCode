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
    }).then(function(v){
        fetch(
            `user_list?start=${problem_list_start}&end=${problem_list_end}`,
            {method:"GET"}
        ).then(res => {
            return res.json();
        }).then(res => {
            LoadProblemList(res["user_list"]);
            user_list_more = res["more"];
            if(!user_list_more){
                content_rankings_footer_more.style.display = "none";
            }
        })
    })
}