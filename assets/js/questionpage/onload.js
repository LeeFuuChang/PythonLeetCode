var QUESTION = undefined;
var USER = {
    "login":false,
    "user_data":undefined
}
window.onload = function(){
    fetch(
        `${document.querySelector("#question-id").value}/get`, {method:"GET"}
    ).then(res => {
        return res.json();
    }).then(res => {
        QUESTION = res.question;
        Load_Question_Description(QUESTION);
        Load_Question_Discussions(QUESTION);
        codeEditor.default = (QUESTION.predefine ? `${QUESTION.predefine}\n\n` : "") + QUESTION.default;
        if(!QUESTION["prev"]){
            inner_footer_nav_prev.style.cursor = "not-allowed";
        }
        if(!QUESTION["next"]){
            inner_footer_nav_next.style.cursor = "not-allowed";
        }
        codeEditor.render(
            CurrentsEditorOptions.font,
            CurrentsEditorOptions.theme.toLowerCase(), 
            CurrentsEditorOptions.bind.toLowerCase(),
            codeEditor.default
        );
    })

    GetIPLoginAccount(function(user_data){
        if(user_data){
            USER.login = true;
            USER["user_data"] = user_data;
            document.querySelector("#pageheader-nav-right-user-nav-y-profile-username").innerText = USER["user_data"]["username"];
    
            if(USER["user_data"]["like_problems"].indexOf(QUESTION.id) >= 0){
                content_content_inner_description_header_nav_like.classList.add("active");
            }else if(USER["user_data"]["dislike_problems"].indexOf(QUESTION.id) >= 0){
                content_content_inner_description_header_nav_dislike.classList.add("active");
            }
            if(USER["user_data"]["favorite_problems"].indexOf(QUESTION.id) >= 0){
                content_content_inner_description_header_nav_favorite.classList.add("active");
            }

            Load_User_Question_Submissions(USER["user_data"]);
            CurrentsEditorOptions = USER["user_data"]["editor"];
            codeEditor.render(
                parseInt(CurrentsEditorOptions.font),
                CurrentsEditorOptions.theme.toLowerCase(), 
                CurrentsEditorOptions.bind.toLowerCase(),
                codeEditor.renderedEditor.getValue()
            );
        }
    });
}

function LoginLoad(){
    Load_User_Question_Submissions(USER["user_data"]);
    CurrentsEditorOptions = USER["user_data"]["editor"];
    codeEditor.render(
        parseInt(CurrentsEditorOptions.font),
        CurrentsEditorOptions.theme.toLowerCase(), 
        CurrentsEditorOptions.bind.toLowerCase(),
        codeEditor.renderedEditor.getValue()
    );
}