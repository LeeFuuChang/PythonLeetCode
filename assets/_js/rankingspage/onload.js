var user_list_more = false;
var user_list_start = 1;
var user_list_end = 50;
window.onload = function(){
    GetIPLoginAccount(function(user_data){
        if(user_data){
            USER.login = true;
            USER["user_data"] = user_data;
            document.querySelector("#pageheader-nav-right-user-nav-y-profile-username").innerText = USER["user_data"]["username"];
        };
    }).then(function(v){
        fetch(
            `/account/user_list?start=${user_list_start}&end=${user_list_end}`,
            {method:"GET"}
        ).then(res => {
            return res.json();
        }).then(res => {
            LoadRankings(res["user_list"]);
            user_list_more = res["more"];
            if(!user_list_more){
                content_rankings_footer_more.style.display = "none";
            }else{
                content_rankings_footer_more.style.display = "flex";
            };
        });
    });
};

function LoginLoad(){};
