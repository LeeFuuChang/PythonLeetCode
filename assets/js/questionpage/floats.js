// float
const all_floats = document.querySelectorAll(".floatfixed");




// editor-reset
const editor_reset_button = document.querySelector("#content-header-nav-right-reset");
const editor_reset_float = document.querySelector("#editor-reset");
const editor_reset_content_footer_cancel = editor_reset_float.querySelector("#editor-reset-content-footer-cancel");
const editor_reset_content_footer_confirm = editor_reset_float.querySelector("#editor-reset-content-footer-confirm");
editor_reset_button.addEventListener("click", function(){
    if(editor_reset_float.classList.contains("show")) return;
    editor_reset_float.classList.add("show");
})
editor_reset_content_footer_cancel.addEventListener("click", function(){
    editor_reset_float.classList.remove("show");
})
editor_reset_content_footer_confirm.addEventListener("click", function(){
    editor_reset_float.classList.remove("show");

    codeEditor.renderedEditor.setValue(codeEditor.default);
})





// editor-settings
const Supports = {
    "font":[12, 13, 14, 15, 16, 17, 18, 19, 20],
    "theme":[
        "3024-day",
        "3024-night",
        "abbott",
        "abcdef",
        "ambiance-mobile",
        "ambiance",
        "ayu-dark",
        "ayu-mirage",
        "base16-dark",
        "base16-light",
        "bespin",
        "blackboard",
        "cobalt",
        "colorforth",
        "darcula",
        "dracula",
        "duotone-dark",
        "duotone-light",
        "eclipse",
        "elegant",
        "erlang-dark",
        "gruvbox-dark",
        "hopscotch",
        "icecoder",
        "idea",
        "isotope",
        "juejin",
        "leetcode",
        "lesser-dark",
        "liquibyte",
        "lucario",
        "material-darker",
        "material-ocean",
        "material-palenight",
        "material",
        "mbo",
        "mdn-like",
        "midnight",
        "monokai",
        "moxer",
        "neat",
        "neo",
        "night",
        "nord",
        "oceanic-next",
        "panda-syntax",
        "paraiso-dark",
        "paraiso-light",
        "pastel-on-dark",
        "railscasts",
        "rubyblue",
        "seti",
        "shadowfox",
        "solarized",
        "ssms",
        "the-matrix",
        "tomorrow-night-bright",
        "tomorrow-night-eighties",
        "ttcn",
        "twilight",
        "vibrant-ink",
        "xq-dark",
        "xq-light",
        "yeti",
        "yonce",
        "zenburn",
    ],
    "bind":[
        "Emacs",
        "Sublime",
        "Vim"
    ]
}
var CurrentsEditorOptions = {
    "font":"14",
    "theme":"eclipse",
    "bind":"Sublime"
}
const editor_settings_button = document.querySelector("#content-header-nav-right-settings");
const editor_settings_float = document.querySelector("#editor-settings");
const editor_settings_font_select = editor_settings_float.querySelector("#editor-settings-font-select");
const editor_settings_theme_select = editor_settings_float.querySelector("#editor-settings-theme-select");
const editor_settings_bind_select = editor_settings_float.querySelector("#editor-settings-bind-select");
const editor_settings_content_footer_cancel = editor_settings_float.querySelector("#editor-settings-content-footer-cancel");
const editor_settings_content_footer_confirm = editor_settings_float.querySelector("#editor-settings-content-footer-confirm");
editor_settings_float.load = function(){
    Supports.font.forEach(fs => {
        let option = document.createElement("option");
        option.value = fs;
        option.innerText = `${fs}px`;
        editor_settings_font_select.appendChild(option);
    })
    editor_settings_font_select.value = parseInt(CurrentsEditorOptions.font);
    Supports.theme.forEach(the => {
        let option = document.createElement("option");
        option.value = the.toLowerCase();
        option.innerText = the;
        editor_settings_theme_select.appendChild(option);
    })
    editor_settings_theme_select.value = CurrentsEditorOptions.theme.toLowerCase();
    Supports.bind.forEach(bd => {
        let option = document.createElement("option");
        option.value = bd.toLowerCase();
        option.innerText = bd;
        editor_settings_bind_select.appendChild(option);
    })
    editor_settings_bind_select.value = CurrentsEditorOptions.bind.toLowerCase();

    codeEditor.render(
        parseInt(CurrentsEditorOptions.font),
        CurrentsEditorOptions.theme.toLowerCase(), 
        CurrentsEditorOptions.bind.toLowerCase(),
        codeEditor.renderedEditor.getValue()
    );
}
editor_settings_float.load();

editor_settings_button.addEventListener("click", function(){
    if(editor_settings_float.classList.contains("show")) return;
    editor_settings_float.classList.add("show");
    editor_settings_font_select.value = parseInt(CurrentsEditorOptions.font);
    editor_settings_theme_select.value = CurrentsEditorOptions.theme.toLowerCase();
    editor_settings_bind_select.value = CurrentsEditorOptions.bind.toLowerCase();
})

editor_settings_content_footer_cancel.addEventListener("click", function(){
    editor_settings_float.classList.remove("show");
})
editor_settings_content_footer_confirm.addEventListener("click", function(){
    editor_settings_float.classList.remove("show");
    let selected_font = editor_settings_font_select.value;
    let selected_theme = editor_settings_theme_select.value;
    let selected_bind = editor_settings_bind_select.value;
    CurrentsEditorOptions.font = selected_font.toString();
    CurrentsEditorOptions.theme = selected_theme.charAt(0).toUpperCase() + selected_theme.slice(1);
    CurrentsEditorOptions.bind = selected_bind.charAt(0).toUpperCase() + selected_bind.slice(1);
    codeEditor.render(
        selected_font,
        selected_theme,
        selected_bind,
        codeEditor.renderedEditor.getValue()
    );
    USER["user_data"]["editor"] = CurrentsEditorOptions;
    if(USER.login){
        fetch(
            `/account/editor?username=${USER["user_data"]["username"]}&font=${selected_font}&theme=${selected_theme}&bind=${selected_bind}`,
            {
                method:"GET"
            }
        ).then(res => {
            console.log("Update Editor Settings", res.json()["state"] ? "Success" : "Failed");
        })
    }
})





// run-test
const run_test_button = document.querySelector("#content-content-editor-footer-nav-right-test");
const run_test_float = document.querySelector("#run-test");
const run_test_content_cases = document.querySelector("#run-test-content-cases");
const run_test_content_footer_cancel = run_test_float.querySelector("#run-test-content-footer-cancel");
const run_test_content_footer_confirm = run_test_float.querySelector("#run-test-content-footer-confirm");
run_test_button.addEventListener("click", function(){
    if(run_test_float.classList.contains("show")) return;
    run_test_float.classList.add("show");
    let testCases = run_test_content_cases.querySelectorAll(".run-test-content-cases-item-left-var-textarea");
    for(let i=0; i<3; i++){
        testCases[i].value = QUESTION.example[`ex${i+1}`].input.split(", ").join("\n");
    }
    run_test_content_cases.querySelectorAll(".run-test-content-cases-item-right-title").forEach(title => {
        title.innerText = "Result";
    })
    run_test_content_cases.querySelectorAll(".run-test-content-cases-item-right-output-textarea").forEach(tt => {
        tt.value = "";
    })
    
    run_test_content_cases.querySelectorAll(".run-test-content-cases-item-right").forEach(resultArea => {
        if(resultArea.classList.contains("run-test-content-case-passed")) resultArea.classList.remove("run-test-content-case-passed");
        if(resultArea.classList.contains("run-test-content-case-failed")) resultArea.classList.remove("run-test-content-case-failed");
    })
})
run_test_content_footer_cancel.addEventListener("click", function(){
    run_test_float.classList.remove("show");
})
run_test_content_footer_confirm.addEventListener("click", function(){
    let problem_id = QUESTION.id;
    let code = codeEditor.renderedEditor.getValue().toString();
    run_test_content_cases.querySelectorAll(".run-test-content-cases-item").forEach(
        case_item => {
            let inputDefinition = case_item.querySelector(".run-test-content-cases-item-left-var-textarea").value.toString();
            Object.keys(codeEditor.StringReplacement).forEach(key => {
                code = code.replaceAll(key, codeEditor.StringReplacement[key]);
                inputDefinition = inputDefinition.replaceAll(key, codeEditor.StringReplacement[key]);
            })
            code = codeEditor.removeComment(code);
            inputDefinition = codeEditor.removeComment(inputDefinition);
            fetch(
                `/submit/test?id=${problem_id}&inputDefinition=`+inputDefinition + `&code=`+code,
                {
                    method:"GET"
                }
            ).then(res => {
                return res.json()
            }).then(res => {
                let result = res.result;
                let output = res.output;
                let resultArea = case_item.querySelector(".run-test-content-cases-item-right");
                if(resultArea.classList.contains("run-test-content-case-passed")) resultArea.classList.remove("run-test-content-case-passed");
                if(resultArea.classList.contains("run-test-content-case-failed")) resultArea.classList.remove("run-test-content-case-failed");
                if(result=="AC"){
                    resultArea.classList.add("run-test-content-case-passed");
                }else{
                    resultArea.classList.add("run-test-content-case-failed");
                }
                resultArea.querySelector(".run-test-content-cases-item-right-title").innerText = result;
                resultArea.querySelector(".run-test-content-cases-item-right-output-textarea").value = output;
            })
        }
    )
})





// login
const login_float = document.querySelector("#login-float");
const login_float_close = login_float.querySelector("#login-float-content-header-close");
const login_float_username = login_float.querySelector("#login-float-content-username");
const login_float_password = login_float.querySelector("#login-float-content-password");
const login_float_submit = login_float.querySelector("#login-float-content-submit");
const login_float_signup = login_float.querySelector("#login-float-content-noaccount-signup");
// signup
const signup_float = document.querySelector("#signup-float");
const signup_float_close = signup_float.querySelector("#signup-float-content-header-close");
const signup_float_email = signup_float.querySelector("#signup-float-content-email");
const signup_float_username = signup_float.querySelector("#signup-float-content-username");
const signup_float_password = signup_float.querySelector("#signup-float-content-password");
const signup_float_confirm = signup_float.querySelector("#signup-float-content-confirm");
const signup_float_submit = signup_float.querySelector("#signup-float-content-submit");
const signup_float_login = signup_float.querySelector("#signup-float-content-noaccount-login");
// listeners
document.querySelector("#pageheader-nav-right-user-icon").addEventListener("click", function(){
    login_float.classList.add("show");
})

login_float_close.addEventListener("click", function(){
    if(login_float.classList.contains("show")){
        login_float.classList.remove("show");
    }
})
login_float_submit.addEventListener("click", function(){
    let username = login_float_username.value;
    let password = login_float_password.value;
    fetch(
        `/account/login?username=${username}&password=${password}`, {
            method:"GET"
        }
    ).then(res => {
        return res.json()
    }).then(result => {
        console.log(result);
        switch(result["state"]){
            case 1:
                console.log("Login OK");
                all_floats.forEach(float => {
                    if(float.classList.contains("show")){
                        float.classList.remove("show");
                    }
                })
                USER.login = true;
                USER["user_data"] = result["user_data"];
                Load_User_Question_Submissions(USER["user_data"]);
                CurrentsEditorOptions = USER["user_data"]["editor"];
                break;
            default:
                console.log("Invalid E-mail or Username or Password");
                alert("Invalid E-mail or Username or Password");
                break;
        }
    })
})
login_float_signup.addEventListener("click", function(){
    all_floats.forEach(float => {
        if(float.classList.contains("show")){
            float.classList.remove("show");
        }
    })
    signup_float.classList.add("show");
})

signup_float_close.addEventListener("click", function(){
    if(signup_float.classList.contains("show")){
        signup_float.classList.remove("show");
    }
})
signup_float_submit.addEventListener("click", function(){
    let email = signup_float_email.value;
    let username = signup_float_username.value;
    let password = signup_float_password.value;
    let confirm = signup_float_confirm.value;
    if(password == confirm){
        fetch(
            `/account/signup?email=${email}&username=${username}&password=${password}`, {
                method:"GET"
            }
        ).then(res => {
            return res.json()
        }).then(result => {
            console.log(result);
            switch(result["state"]){
                case 1:
                    console.log("Register OK, Auto Login");
                    all_floats.forEach(float => {
                        if(float.classList.contains("show")){
                            float.classList.remove("show");
                        }
                    })
                    USER.login = true;
                    USER["user_data"] = result["user_data"];
                    break;
                case -1:
                    console.log("E-mail already existed");
                    alert("E-mail already existed");
                    break;
                case -2:
                    console.log("Username already existed");
                    alert("Username already existed");
                    break;
            }
        })
    }else{

    }
})
signup_float_login.addEventListener("click", function(){
    all_floats.forEach(float => {
        if(float.classList.contains("show")){
            float.classList.remove("show");
        }
    })
    login_float.classList.add("show");
})