const code = document.querySelector("#content-content-editor-inner-code");
const codeEditor = document.querySelector("#content-content-editor-inner-code-input");
codeEditor.default = "";
codeEditor.renderedEditor = undefined;
codeEditor.render = function(_font, _theme, _bind, _text){
    code.querySelectorAll(".CodeMirror").forEach(cm => {
        code.removeChild(cm);
    })
    codeEditor.renderedEditor = CodeMirror.fromTextArea(codeEditor, {
        mode: "python",
        theme: _theme,
        keyMap: _bind,
        lineNumbers: true,
        smartIndent: true,
        indentUnit: 4,
        lineWrapping: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter", "CodeMirror-lint-markers"],
        foldGutter: true,
        autofocus: true,
        matchBrackets: true,
        autoCloseBrackets: true,
        styleActiveLine: true,
    })
    codeEditor.renderedEditor.setOption("value", _text);
    document.querySelectorAll(".CodeMirror").forEach(ele => {
        ele.style.fontSize = _font + "px";
    })
}
codeEditor.render(14, "eclipse", "sublime", codeEditor.default);

codeEditor.StringReplacement = {
    "\n":";1;",
    "+":";2;"
}

codeEditor.removeComment = function(s){
    let last = 0;
    while(true){
        let cur1 = s.indexOf("#");
        let cur2 = s.indexOf(";1;", last);
        if(cur1<0)break;
        s = s.substring(0, cur1) + s.slice(cur2);
        last = cur2;
    }
    return s;
}

const submit_button = document.querySelector("#content-content-editor-footer-nav-right-submit");
submit_button.addEventListener("click", function(){
    inner_nav.querySelectorAll(".active").forEach(active => {
        active.classList.remove("active");
    })
    inner_nav.querySelector("#content-header-nav-left-submissions");
    inner.querySelectorAll(".active").forEach(active => {
        active.classList.remove("active");
    })
    inner.querySelector("#content-content-inner-submissions").classList.add("active");
    Update_Scroll_hint(inner.querySelector("#content-content-inner-submissions"));

    let lastest_submission_info = document.querySelector("#content-content-inner-submissions-lastest-info");
    let result_data = lastest_submission_info.querySelector("#content-content-inner-submissions-lastest-info-result-data");
    let runtime_data = lastest_submission_info.querySelector("#content-content-inner-submissions-lastest-info-runtime-data");
    let memory_data = lastest_submission_info.querySelector("#content-content-inner-submissions-lastest-info-memory-data");
    result_data.textContent = "Pending";
    result_data.style.color = "var(--case-waiting-black)";
    runtime_data.textContent = "";
    memory_data.textContent = "";
    let pending_Interval = setInterval(function(){
        if(result_data.textContent.length >= 13){
            result_data.textContent = "Pending";
        }else{
            result_data.textContent += " .";
        }
    }, 250)

    let problem_id = QUESTION.id;
    let code = codeEditor.renderedEditor.getValue().toString();
    Object.keys(codeEditor.StringReplacement).forEach(key => {
        code = code.replaceAll(key, codeEditor.StringReplacement[key]);
    })
    code = codeEditor.removeComment(code);
    fetch(
        `/submit/submit?id=${problem_id}&code=`+code,
        {
            method:"GET"
        }
    ).then(res => {
        clearInterval(pending_Interval);
        return res.json()
    }).then(res => {
        let result = res.result;
        let output = res.output;
        let runtime = res.time;
        let memory = res.memory;
        console.log(res.result, res.output, res.time, res.memory);

        result_data.textContent = `${output}`;
        if(result=="AC"){
            result_data.style.color = "var(--case-passed-green)";
        }else{
            result_data.style.color = "var(--case-failed-red)";
        }
        runtime_data.textContent = `${parseInt(runtime*1000)}ms`;
        memory_data.textContent = `${memory}MB`;
    })
})