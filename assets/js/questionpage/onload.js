function getNow(){
    let TIMER = new Date();
    let Year = TIMER.getFullYear().toString().padStart(4, "0");
    let Month = (TIMER.getMonth()+1).toString().padStart(2, "0");
    let Dat = TIMER.getDate().toString().padStart(2, "0");
    let Hour = TIMER.getHours().toString().padStart(2, "0");
    let Min = TIMER.getMinutes().toString().padStart(2, "0");
    return `${Year}/${Month}/${Dat} ${Hour}:${Min}`;
}
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
        codeEditor.default = (QUESTION.predefine ? `${QUESTION.predefine}\n\n` : "") + QUESTION.default;
        codeEditor.render(
            CurrentsEditorOptions.font,
            CurrentsEditorOptions.theme.toLowerCase(), 
            CurrentsEditorOptions.bind.toLowerCase(),
            codeEditor.default
        );

        if(res["user_data"]){
            all_floats.forEach(float => {
                if(float.classList.contains("show")){
                    float.classList.remove("show");
                }
            })
            console.log("Login OK");
            USER.login = true;
            USER["user_data"] = res["user_data"];
            Load_User_Question_Submissions(USER["user_data"]);
            CurrentsEditorOptions = USER["user_data"]["editor"];
            codeEditor.render(
                parseInt(CurrentsEditorOptions.font),
                CurrentsEditorOptions.theme.toLowerCase(), 
                CurrentsEditorOptions.bind.toLowerCase(),
                codeEditor.renderedEditor.getValue()
            );
        }
    })
}
