// new post
const content_content_inner_discuss_header_nav_new = content_content_inner_discuss_header_nav.querySelector("#content-content-inner-discuss-header-nav-new");
const newpost_float = document.querySelector("#newpost");
const newpost_float_link = newpost_float.querySelector("#newpost-link");
const newpost_float_title = newpost_float.querySelector("#newpost-title");
const newpost_content_footer_cancel = newpost_float.querySelector("#newpost-content-footer-cancel");
const newpost_content_footer_confirm = newpost_float.querySelector("#newpost-content-footer-confirm");
content_content_inner_discuss_header_nav_new.addEventListener("click", function(){
    if(!USER.login || !USER["user_data"]["problems"][QUESTION.id] || !USER["user_data"]["problems"][QUESTION.id]["passed"]){
        alert("You need to PASS the problem before writing a Solution Report");
        return;
    }
    newpost_float.classList.add("active");
})
newpost_content_footer_cancel.addEventListener("click", function(){
    newpost_float.classList.remove("active");
})
newpost_content_footer_confirm.addEventListener("click", function(){
    let link = newpost_float_link.value;
    let title = newpost_float_title.value;

    if( title=="" ){
        alert("invaild Solution Report title");
        return;
    }else if( link == "" ){
        alert("invaild Google Docs Publish Link");
        return;
    }

    fetch(
        `/discuss/newpost?id=${QUESTION.id}&username=${USER["user_data"]["username"]}&time=${getNow()}&link=${link}&title=${title}`,
        {method:"GET"}
    ).then(res => {
        return res.json();
    }).then(res => {
        console.log(res["output"]);
        if(res["state"]){
            content_content_inner_discuss.makePost(res["output"]);
        }
    })

    newpost_float.classList.remove("active");
})





// editor-reset
const editor_reset_button = document.querySelector("#content-header-nav-right-reset");
const editor_reset_float = document.querySelector("#editor-reset");
const editor_reset_content_footer_cancel = editor_reset_float.querySelector("#editor-reset-content-footer-cancel");
const editor_reset_content_footer_confirm = editor_reset_float.querySelector("#editor-reset-content-footer-confirm");
editor_reset_button.addEventListener("click", function(){
    if(editor_reset_float.classList.contains("active")) return;
    editor_reset_float.classList.add("active");
})
editor_reset_content_footer_cancel.addEventListener("click", function(){
    editor_reset_float.classList.remove("active");
})
editor_reset_content_footer_confirm.addEventListener("click", function(){
    editor_reset_float.classList.remove("active");

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
    if(editor_settings_float.classList.contains("active")) return;
    editor_settings_float.classList.add("active");
    editor_settings_font_select.value = parseInt(CurrentsEditorOptions.font);
    editor_settings_theme_select.value = CurrentsEditorOptions.theme.toLowerCase();
    editor_settings_bind_select.value = CurrentsEditorOptions.bind.toLowerCase();
})

editor_settings_content_footer_cancel.addEventListener("click", function(){
    editor_settings_float.classList.remove("active");
})
editor_settings_content_footer_confirm.addEventListener("click", function(){
    editor_settings_float.classList.remove("active");
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
            return res.json()
        }).then(res => {
            console.log("Update Editor Settings", res["state"] ? "Success" : "Failed");
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
    if(run_test_float.classList.contains("active")) return;
    run_test_float.classList.add("active");
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
    run_test_float.classList.remove("active");
})
run_test_content_footer_confirm.addEventListener("click", function(){
    let problem_id = QUESTION.id;
    let code = `${codeEditor.renderedEditor.getValue().toString()}\n`;
    run_test_content_cases.querySelectorAll(".run-test-content-cases-item").forEach(
        case_item => {
            let inputDefinition = case_item.querySelector(".run-test-content-cases-item-left-var-textarea").value.toString();
            Object.keys(codeEditor.StringReplacement).forEach(key => {
                code = ReplaceAll(code, key, codeEditor.StringReplacement[key]);
                inputDefinition = ReplaceAll(inputDefinition, key, codeEditor.StringReplacement[key]);
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