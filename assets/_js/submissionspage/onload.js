var submissions_more = true;
var submissions_reloading = true;
var submissions_reload = undefined;
var submissions_start = 1;
var submissions_end = 50;
window.onload = function(){
    GetIPLoginAccount(function(user_data){
        if(user_data){
            USER.login = true;
            USER["user_data"] = user_data;
            document.querySelector("#pageheader-nav-right-user-nav-y-profile-username").innerText = USER["user_data"]["username"];
        };
    }).then(function(v){
        fetch(
            `/submit/submissions?start=${submissions_start}&end=${submissions_end}`,
            {method:"GET"}
        ).then(res => {
            return res.json();
        }).then(res => {
            LoadSubmissionList(res["submissions"]);
            submissions_more = res["more"];
            if(!submissions_more){
                content_submissions_footer_more.style.display = "none";
            }else{
                content_submissions_footer_more.style.display = "flex";
            };
            submissions_reloading = false;
            submissions_reload = setInterval(ReloadSubmissionList, 60000);
        });
    });
};

function LoginLoad(){};
