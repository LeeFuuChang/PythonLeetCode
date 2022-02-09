const inner = document.querySelector("#content-content-inner");
const inner_nav = document.querySelector("#content-header-nav-left");





//Update Scroll hint
Update_Scroll_hint = function(type){
    type.style.top = '0px';
    let current = 0;
    let currentH = 0;
    for(let i=0; i<type.children.length; i++){
        currentH += type.children[i].offsetHeight;
    }

    let top = Math.min(Math.max(Math.min(current, 0), window.innerHeight-160-currentH), 0);

    if(top != 0){
        document.documentElement.style.setProperty("--scroll-up-hint-display", "unset");
    }else{
        document.documentElement.style.setProperty("--scroll-up-hint-display", "none");
    }
    if(top != window.innerHeight-160-currentH && window.innerHeight-160-currentH<0){
        document.documentElement.style.setProperty("--scroll-down-hint-display", "unset");
    }else{
        document.documentElement.style.setProperty("--scroll-down-hint-display", "none");
    }
}





// inner Conetent Scroll
const inner_type = inner.querySelectorAll(".content-content-inner-type");
inner_type.forEach(type => {
    type.addEventListener("wheel", function(e){
        let currentTop = type.style.top.substring(0, type.style.top.length-2);
        let current = undefined;
        if(currentTop==""){current=0;}else{current=parseInt(currentTop)}
        current = (e.deltaY*-0.25 + current)
        let currentH = 0;
        for(let i=0; i<type.children.length; i++){
            currentH += type.children[i].offsetHeight;
        }

        let top = Math.min(Math.max(Math.min(current, 0), window.innerHeight-160-currentH), 0);

        if(top != 0){
            document.documentElement.style.setProperty("--scroll-up-hint-display", "unset");
        }else{
            document.documentElement.style.setProperty("--scroll-up-hint-display", "none");
        }
        if(top != window.innerHeight-160-currentH && window.innerHeight-160-currentH<0){
            document.documentElement.style.setProperty("--scroll-down-hint-display", "unset");
        }else{
            document.documentElement.style.setProperty("--scroll-down-hint-display", "none");
        }

        type.style.top = Math.min(Math.max(Math.min(current, 0), window.innerHeight-160-currentH), 0) + "px";
    })
})





// inner Question description
const content_header_nav_left_description = document.querySelector("#content-header-nav-left-description");
content_header_nav_left_description.addEventListener("click", function(){
    inner_nav.querySelectorAll(".active").forEach(active => {
        active.classList.remove("active");
    })
    content_header_nav_left_description.classList.add("active");
    inner.querySelectorAll(".active").forEach(active => {
        active.classList.remove("active");
    })
    inner.querySelector(`#content-content-inner-description`).classList.add("active");
    Update_Scroll_hint(inner.querySelector(`#content-content-inner-description`));
})
const content_content_inner_description = document.querySelector("#content-content-inner-description");
function Load_Question_Description(QUESTION){
    document.querySelector("title").innerText = `${QUESTION.id}. ${QUESTION.name}`;
    content_content_inner_description.querySelector("#content-content-inner-description-header-title-id").textContent = QUESTION.id;
    content_content_inner_description.querySelector("#content-content-inner-description-header-title-name").textContent = QUESTION.name;
    content_content_inner_description.querySelector("#content-content-inner-description-header-nav-difficulty").classList.add(QUESTION.difficulty.toLowerCase());
    content_content_inner_description.querySelector("#content-content-inner-description-header-nav-difficulty").textContent = QUESTION.difficulty;
    content_content_inner_description.querySelector("#content-content-inner-description-header-nav-like").insertAdjacentText("beforeend", QUESTION.likes);
    content_content_inner_description.querySelector("#content-content-inner-description-header-nav-dislike").insertAdjacentText("beforeend", QUESTION.dislikes);
    QUESTION.description.forEach(line => {
        content_content_inner_description.querySelector("#content-content-inner-description-content-question").insertAdjacentHTML(
            "beforeend",
            `
            <p class="df aic content-content-inner-description-content-question-line">
                ${line}
            </p>
            `
        )
    })
    let examples = content_content_inner_description.querySelectorAll(".content-content-inner-description-content-example-frame");
    for(let i=0; i<3; i++){
        let Qexamples = QUESTION.example[`ex${i+1}`];
        if(Qexamples["input"]){
            examples[i].insertAdjacentHTML(
                "beforeend", 
                `
                <p class="df aic content-content-inner-description-content-example-frame-input">
                    Input: <span class="df aic content-content-inner-description-content-example-frame-input-value">
                        ${Qexamples["input"]}
                    </span>
                </p>
                `
            )
        }
        if(Qexamples["output"]){
            examples[i].insertAdjacentHTML(
                "beforeend", 
                `
                <p class="df aic content-content-inner-description-content-example-frame-output">
                    Output: <span class="df aic content-content-inner-description-content-example-frame-output-value">
                        ${Qexamples["output"]}
                    </span>
                </p>
                `
            )
        }
        if(Qexamples["explain"]){
            examples[i].insertAdjacentHTML(
                "beforeend", 
                `
                <p class="df aic content-content-inner-description-content-example-frame-explain">
                    Explain: <span class="df aic content-content-inner-description-content-example-frame-explain-value">
                        ${Qexamples["explain"]}
                    </span>
                </p>
                `
            )
        }
    }
    let constraints_ul = content_content_inner_description.querySelector("#content-content-inner-description-content-constraints-list");
    QUESTION.constraints.forEach(cst => {
        constraints_ul.insertAdjacentHTML(
            "beforeend",
            `
            <li class="content-content-inner-description-content-constraints-list-item">
                ${cst}
            </li>
            `
        )
    })

    Update_Scroll_hint(inner.querySelector("#content-content-inner-description"));
}





// inner Question discuss
const content_header_nav_left_discuss = document.querySelector("#content-header-nav-left-discuss");
content_header_nav_left_discuss.addEventListener("click", function(){
    if(!USER.login){
        login_float.classList.add("active");
        return
    }
    inner_nav.querySelectorAll(".active").forEach(active => {
        active.classList.remove("active");
    })
    content_header_nav_left_discuss.classList.add("active");
    inner.querySelectorAll(".active").forEach(active => {
        active.classList.remove("active");
    })
    inner.querySelector(`#content-content-inner-discuss`).classList.add("active");
    Update_Scroll_hint(inner.querySelector(`#content-content-inner-discuss`));
})





// inner Question submissions
const content_header_nav_left_submissions = document.querySelector("#content-header-nav-left-submissions");
content_header_nav_left_submissions.addEventListener("click", function(){
    if(!USER.login){
        login_float.classList.add("active");
        return
    }
    inner_nav.querySelectorAll(".active").forEach(active => {
        active.classList.remove("active");
    })
    content_header_nav_left_submissions.classList.add("active");
    inner.querySelectorAll(".active").forEach(active => {
        active.classList.remove("active");
    })
    inner.querySelector(`#content-content-inner-submissions`).classList.add("active");
    Update_Scroll_hint(inner.querySelector(`#content-content-inner-submissions`));
})
const content_content_inner_submissions = document.querySelector("#content-content-inner-submissions");
const recentSubmissionsTableBody = content_content_inner_submissions.querySelector("#content-content-inner-submissions-recent-table-tbody");
function Load_User_Question_Submissions(user_data){
    let ResultReference = {
        "AC":"Accepted", 
        "WA":"Wrong Answer", 
        "TLE":"Time Limit Exceed", 
        "MLE":"Memory Limit Exceed", 
        "RE":"Runtime Error", 
        "CE":"Compile Error",
        "SE":"Server Error"
    }

    if(!user_data["problems"][QUESTION.id]) return;
    let i = 0
    user_data["problems"][QUESTION.id]["recentSubmissions"].forEach(submission => {
        let case_result_class = submission.result=="AC" ? "content-content-inner-submissions-recent-case-passed" : "content-content-inner-submissions-recent-case-failed";
        recentSubmissionsTableBody.insertAdjacentHTML(
            "beforeend",
            `
            <tr class="content-content-inner-submissions-recent-table-tbody-tr">
                <td class="content-content-inner-submissions-recent-table-tbody-tr-td">
                    ${i+1}
                </td>
                <td class="content-content-inner-submissions-recent-table-tbody-tr-td">
                    ${submission.submit_time}
                </td>
                <td class="content-content-inner-submissions-recent-table-tbody-tr-td ${case_result_class}">
                    ${ResultReference[submission.result]}
                </td>
                <td class="content-content-inner-submissions-recent-table-tbody-tr-td">
                    ${submission.time} ms
                </td>
                <td class="content-content-inner-submissions-recent-table-tbody-tr-td">
                    ${submission.memory} MB
                </td>
            </tr>
            `
        )
        i++;
    })

    if(i==0) return;
    let lastest_submission_data = user_data["problems"][QUESTION.id]["lastSubmission"];
    let lastest_submission_info_result = content_content_inner_submissions.querySelector("#content-content-inner-submissions-lastest-info-result-data");
    let lastest_submission_info_runtime = content_content_inner_submissions.querySelector("#content-content-inner-submissions-lastest-info-runtime-data");
    let lastest_submission_info_memory = content_content_inner_submissions.querySelector("#content-content-inner-submissions-lastest-info-memory-data");
    if(user_data["problems"][QUESTION.id]["lastSubmission"]["result"]["result"] == "AC"){
        lastest_submission_info_result.style.color = "var(--case-passed-green)";
    }else{
        lastest_submission_info_result.style.color = "var(--case-failed-red)";
    }
    lastest_submission_info_result.innerText = ResultReference[lastest_submission_data["result"]["result"]];
    lastest_submission_info_runtime.innerHTML = `${lastest_submission_data["result"]["time"]} ms`;
    lastest_submission_info_memory.innerHTML = `${lastest_submission_data["result"]["memory"]} MB`;
    codeEditor.render(
        CurrentsEditorOptions.font,
        CurrentsEditorOptions.theme.toLowerCase(), 
        CurrentsEditorOptions.bind.toLowerCase(),
        user_data["problems"][QUESTION.id]["lastSubmission"]["code"]
    );
    
}







// inner footer nav (Go Problems page / Random Problem / Prev Problem / Next Problem)
