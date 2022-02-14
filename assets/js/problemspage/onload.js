var USER = {
    "login":false,
    "user_data":undefined
}
var problem_list_start = 1;
var problem_list_end = 50;
window.onload = function(){
    GetIPLoginAccount(function(user_data){
        if(user_data){
            USER.login = true;
            USER["user_data"] = user_data;
            document.querySelector("#pageheader-nav-right-user-nav-y-profile-username").innerText = USER["user_data"]["username"];
        }
    }).then(function(v){
        fetch(
            `problem_list?start=${problem_list_start}&end=${problem_list_end}`,
            {method:"GET"}
        ).then(res => {
            return res.json();
        }).then(res => {
            LoadProblemList(res["problem_list"]);
        })
    })
}