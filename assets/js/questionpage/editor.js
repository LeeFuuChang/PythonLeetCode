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
        let cur1 = s.indexOf("#", last);
        let cur2 = s.indexOf(";1;", cur1);
        if(cur1<0 || cur2<0 || cur1>=s.length || cur2>=s.length)break;
        s = s.substring(0, cur1) + s.slice(cur2);
        last = cur2;
    }
    return s;
}

const submit_button = document.querySelector("#content-content-editor-footer-nav-right-submit");
submit_button.addEventListener("click", function(){
    if(!USER.login){
        login_float.classList.add("active");
        return
    }
    if(!submit_button.busy){
        submit_button.busy = true;
        submit_button.style.cursor = "not-allowed";
        inner_nav.querySelectorAll(".active").forEach(active => {
            active.classList.remove("active");
        })
        inner_nav.querySelector("#content-header-nav-left-submissions").classList.add("active");
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
        let code = `${codeEditor.renderedEditor.getValue().toString()}\n`;
        let submit_time = getNow();
        Object.keys(codeEditor.StringReplacement).forEach(key => {
            code = code.replaceAll(key, codeEditor.StringReplacement[key]);
        })
        code = codeEditor.removeComment(code);
        fetch(
            `/submit/submit?username=${USER["user_data"]["username"]}&st=${submit_time}&id=${problem_id}&code=`+code,
            {
                method:"GET"
            }
        ).then(res => {
            clearInterval(pending_Interval);
            return res.json()
        }).then(res => {
            USER["user_data"] = res["user_data"];
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
            runtime_data.textContent = `${runtime} ms`;
            memory_data.textContent = `${memory} MB`;
            submit_button.busy = false;
            submit_button.style.cursor = "pointer";

            let ResultReference = {
                "AC":"Accepted", 
                "WA":"Wrong Answer", 
                "TLE":"Time Limit Exceed", 
                "MLE":"Memory Limit Exceed", 
                "RE":"Runtime Error", 
                "CE":"Compile Error"
            }
            let case_result_class = result=="AC" ? "content-content-inner-submissions-recent-case-passed" : "content-content-inner-submissions-recent-case-failed";
            recentSubmissionsTableBody.insertAdjacentHTML(
                "afterbegin",
                `
                <tr class="content-content-inner-submissions-recent-table-tbody-tr">
                    <td class="content-content-inner-submissions-recent-table-tbody-tr-td">
                        1
                    </td>
                    <td class="content-content-inner-submissions-recent-table-tbody-tr-td">
                        ${submit_time}
                    </td>
                    <td class="content-content-inner-submissions-recent-table-tbody-tr-td ${case_result_class}">
                        ${ResultReference[result]}
                    </td>
                    <td class="content-content-inner-submissions-recent-table-tbody-tr-td">
                        ${runtime} ms
                    </td>
                    <td class="content-content-inner-submissions-recent-table-tbody-tr-td">
                        ${memory} MB
                    </td>
                </tr>
                `
            )
            for(let i=0; i<recentSubmissionsTableBody.children.length; i++){
                recentSubmissionsTableBody.children[i].children[0].textContent = i+1;
            }
        })
    }
})