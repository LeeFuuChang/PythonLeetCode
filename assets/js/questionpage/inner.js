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
const content_content_inner_description = document.querySelector("#content-content-inner-description");
const content_content_inner_description_header_nav_like = content_content_inner_description.querySelector("#content-content-inner-description-header-nav-like");
const content_content_inner_description_header_nav_like_text = content_content_inner_description_header_nav_like.querySelector("#content-content-inner-description-header-nav-like-text");
const content_content_inner_description_header_nav_dislike = content_content_inner_description.querySelector("#content-content-inner-description-header-nav-dislike");
const content_content_inner_description_header_nav_dislike_text = content_content_inner_description_header_nav_dislike.querySelector("#content-content-inner-description-header-nav-dislike-text");
const content_content_inner_description_header_nav_favorite = content_content_inner_description.querySelector("#content-content-inner-description-header-nav-favorite");
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
function Load_Question_Description(QUESTION){
    document.querySelector("title").innerText = `${QUESTION.id}. ${QUESTION.name}`;
    content_content_inner_description.querySelector("#content-content-inner-description-header-title-id").textContent = QUESTION.id;
    content_content_inner_description.querySelector("#content-content-inner-description-header-title-name").textContent = QUESTION.name;
    content_content_inner_description.querySelector("#content-content-inner-description-header-nav-difficulty").classList.add(QUESTION.difficulty.toLowerCase());
    content_content_inner_description.querySelector("#content-content-inner-description-header-nav-difficulty").textContent = QUESTION.difficulty;
    content_content_inner_description_header_nav_like_text.innerText = QUESTION.likes.length;
    content_content_inner_description_header_nav_dislike_text.innerText = QUESTION.dislikes.length;
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
    QUESTION.constraints.forEach(constraint => {
        constraints_ul.insertAdjacentHTML(
            "beforeend",
            `
            <li class="content-content-inner-description-content-constraints-list-item">
                ${constraint}
            </li>
            `
        )
    })

    Update_Scroll_hint(inner.querySelector("#content-content-inner-description"));

    if(USER.login){
        if(USER["user_data"]["like_problems"].indexOf(QUESTION.id) >= 0){
            content_content_inner_description_header_nav_like.classList.add("active");
        }else if(USER["user_data"]["dislike_problems"].indexOf(QUESTION.id) >= 0){
            content_content_inner_description_header_nav_dislike.classList.add("active");
        }
        if(USER["user_data"]["favorite_problems"].indexOf(QUESTION.id) >= 0){
            content_content_inner_description_header_nav_favorite.classList.add("active");
        }
    }
}
content_content_inner_description_header_nav_like.addEventListener("click", function(){
    if(!USER.login){
        login_float.classList.add("active");
        return
    }

    let now_like = parseInt(content_content_inner_description_header_nav_like.querySelector("#content-content-inner-description-header-nav-like-text").innerText);
    let now_dislike = parseInt(content_content_inner_description_header_nav_dislike.querySelector("#content-content-inner-description-header-nav-dislike-text").innerText);
    if(content_content_inner_description_header_nav_dislike.classList.contains("active")){
        content_content_inner_description_header_nav_dislike.classList.remove("active");
        content_content_inner_description_header_nav_dislike.querySelector("#content-content-inner-description-header-nav-dislike-text").innerText = now_dislike-1;
    }
    if(!content_content_inner_description_header_nav_like.classList.contains("active")){
        content_content_inner_description_header_nav_like.classList.add("active");
        content_content_inner_description_header_nav_like.querySelector("#content-content-inner-description-header-nav-like-text").innerText = now_like+1;
    }else{
        content_content_inner_description_header_nav_like.classList.remove("active");
        content_content_inner_description_header_nav_like.querySelector("#content-content-inner-description-header-nav-like-text").innerText = now_like-1;
    }

    fetch(
        `/account/update?type=like&username=${USER["user_data"]["username"]}&id=${QUESTION.id}`,
        {
            method:"GET"
        }
    ).then(res => {
        return res.json()
    }).then(res => {
        if(res["state"]){
            USER["user_data"] = res["user_data"];
        }
    })
})
content_content_inner_description_header_nav_dislike.addEventListener("click", function(){
    if(!USER.login){
        login_float.classList.add("active");
        return
    }

    let now_like = parseInt(content_content_inner_description_header_nav_like.querySelector("#content-content-inner-description-header-nav-like-text").innerText);
    let now_dislike = parseInt(content_content_inner_description_header_nav_dislike.querySelector("#content-content-inner-description-header-nav-dislike-text").innerText);
    if(content_content_inner_description_header_nav_like.classList.contains("active")){
        content_content_inner_description_header_nav_like.classList.remove("active");
        content_content_inner_description_header_nav_like.querySelector("#content-content-inner-description-header-nav-like-text").innerText = now_like-1;
    }
    if(!content_content_inner_description_header_nav_dislike.classList.contains("active")){
        content_content_inner_description_header_nav_dislike.classList.add("active");
        content_content_inner_description_header_nav_dislike.querySelector("#content-content-inner-description-header-nav-dislike-text").innerText = now_dislike+1;
    }else{
        content_content_inner_description_header_nav_dislike.classList.remove("active");
        content_content_inner_description_header_nav_dislike.querySelector("#content-content-inner-description-header-nav-dislike-text").innerText = now_dislike-1;
    }

    fetch(
        `/account/update?type=dislike&username=${USER["user_data"]["username"]}&id=${QUESTION.id}`,
        {
            method:"GET"
        }
    ).then(res => {
        return res.json()
    }).then(res => {
        if(res["state"]){
            USER["user_data"] = res["user_data"];
        }
    })
})
content_content_inner_description_header_nav_favorite.addEventListener("click", function(){
    if(!USER.login){
        login_float.classList.add("active");
        return
    }

    if(!content_content_inner_description_header_nav_favorite.classList.contains("active")){
        content_content_inner_description_header_nav_favorite.classList.add("active");
    }else{
        content_content_inner_description_header_nav_favorite.classList.remove("active");
    }

    fetch(
        `/account/update?type=favorite&username=${USER["user_data"]["username"]}&id=${QUESTION.id}`,
        {
            method:"GET"
        }
    ).then(res => {
        return res.json()
    }).then(res => {
        if(res["state"]){
            USER["user_data"] = res["user_data"];
        }
    })
})





// inner Question discuss
const content_header_nav_left_discuss = document.querySelector("#content-header-nav-left-discuss");
const content_content_inner_discuss = document.querySelector("#content-content-inner-discuss");
content_content_inner_discuss.makePost = function(post_data){
    content_content_inner_discuss.querySelector("#content-content-inner-discuss-posts").insertAdjacentHTML(
        "afterbegin",
        `
        <div class="df content-content-inner-discuss-post">
            <a class="content-content-inner-discuss-post-title" href="/discuss/visit/${post_data["question"]}">${post_data["title"]}</a>
            <hr class="content-content-inner-discuss-post-hr">
            <div class="df aic content-content-inner-discuss-post-footer">
                <div class="df aic content-content-inner-discuss-post-footer-left">
                    <a class="df aic content-content-inner-discuss-post-footer-left-username">${post_data["author"]}</a>
                    <span class="df aic content-content-inner-discuss-post-footer-left-time">${post_data["time"]}</span>
                </div>
                <div class="df aic content-content-inner-discuss-post-footer-right">
                    <a class="df aic content-content-inner-discuss-post-footer-right-id" href="/views/problems/${post_data["question"]}">
                        ${post_data["question"]}
                    </a>
                    <div class="df aic content-content-inner-discuss-post-footer-right-likes">
                        <img class="content-content-inner-discuss-post-footer-right-likes-icon" src="assets/images/svgs/caret-up-fill.svg" alt="">
                        <span class="content-content-inner-discuss-post-footer-right-likes-text">${post_data["likes"].length}</span>
                    </div>
                    <div class="df aic content-content-inner-discuss-post-footer-right-views">
                        <img class="content-content-inner-discuss-post-footer-right-views-icon" src="assets/images/svgs/eye-fill.svg" alt="">
                        <span class="content-content-inner-discuss-post-footer-right-views-text">${post_data["views"].length}</span>
                    </div>
                </div>
            </div>
        </div>
        `
    )
}
function Load_Question_Discussions(QUESTION){
    Object.keys(QUESTION["discussions"]).forEach(post_id => {
        content_content_inner_discuss.makePost(QUESTION["discussions"][post_id]);
    })
}
const content_content_inner_discuss_header_nav = content_content_inner_discuss.querySelector("#content-content-inner-discuss-header-nav");
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

const content_content_inner_discuss_header_nav_search = content_content_inner_discuss_header_nav.querySelector("#content-content-inner-discuss-header-nav-search");
content_content_inner_discuss_header_nav_search.addEventListener("input", function(){
    let value = content_content_inner_discuss_header_nav_search.value.toLowerCase();
    let content_content_inner_discuss_posts = content_content_inner_discuss.querySelectorAll(".content-content-inner-discuss-post");
    content_content_inner_discuss_posts.forEach(post => {
        let title = post.querySelector(".content-content-inner-discuss-post-title").innerText.toLowerCase();
        let username = post.querySelector(".content-content-inner-discuss-post-footer-left-username").innerText.toLowerCase();
        let combine = title + username;

        if( combine.indexOf(value)>=0 ){
            post.style.display = "flex";
        }else{
            post.style.display = "none";
        }
    })
})

const content_content_inner_discuss_header_nav_filter = content_content_inner_discuss_header_nav.querySelector("#content-content-inner-discuss-header-nav-filter");
content_content_inner_discuss_header_nav_filter.now_sort = null;
const content_content_inner_discuss_header_nav_filter_option_item_function = {
    "sort":{
        "nto":function(){
            let sort = function(a, b){
                let t1_s = a.querySelector(".content-content-inner-discuss-post-footer-left-time").textContent;
                let t1_st = t1_s.split(" ");
                let t1_as = t1_st[0].split("/");
                let t1_bs = t1_st[1].split(":");
                let t1 = t1_as[0]*12*30*24*60 + t1_as[1]*30*24*60 + t1_as[2]*24*60 + t1_bs[0]*60 + t1_bs[1];
                
                let t2_s = b.querySelector(".content-content-inner-discuss-post-footer-left-time").textContent;
                let t2_st = t2_s.split(" ");
                let t2_as = t2_st[0].split("/");
                let t2_bs = t2_st[1].split(":");
                let t2 = t2_as[0]*12*30*24*60 + t2_as[1]*30*24*60 + t2_as[2]*24*60 + t2_bs[0]*60 + t2_bs[1];
                
                return t2 - t1;
            }

            let content_content_inner_discuss_posts = content_content_inner_discuss.querySelectorAll(".content-content-inner-discuss-post");
            let sorted = [].map.call(content_content_inner_discuss_posts, function(ele){return ele}).sort(sort);

            if(content_content_inner_discuss_header_nav_filter.now_sort == "nto-b>s"){
                sorted = sorted.reverse();
                content_content_inner_discuss_header_nav_filter.now_sort = "nto-s>b";
            }else{
                content_content_inner_discuss_header_nav_filter.now_sort = "nto-b>s";
            }

            for(let i=0; i<sorted.length; i++){
                sorted[i].parentNode.appendChild(sorted[i]);
            }
        },
        "vote":function(){
            let sort = function(a, b){
                let t1 = a.querySelector(".content-content-inner-discuss-post-footer-right-likes-text").textContent;
                let t2 = b.querySelector(".content-content-inner-discuss-post-footer-right-likes-text").textContent;
                return `${t2}`.localeCompare(`${t1}`);
            }
            let content_content_inner_discuss_posts = content_content_inner_discuss.querySelectorAll(".content-content-inner-discuss-post");
            let sorted = [].map.call(content_content_inner_discuss_posts, function(ele){return ele}).sort(sort);

            if(content_content_inner_discuss_header_nav_filter.now_sort == "vote-b>s"){
                sorted = sorted.reverse();
                content_content_inner_discuss_header_nav_filter.now_sort = "vote-s>b";
            }else{
                content_content_inner_discuss_header_nav_filter.now_sort = "vote-b>s";
            }

            for(let i=0; i<sorted.length; i++){
                sorted[i].parentNode.appendChild(sorted[i]);
            }
        },
        "view":function(){
            let sort = function(a, b){
                let t1 = a.querySelector(".content-content-inner-discuss-post-footer-right-views-text").textContent;
                let t2 = b.querySelector(".content-content-inner-discuss-post-footer-right-views-text").textContent;
                return `${t2}`.localeCompare(`${t1}`);
            }
            let content_content_inner_discuss_posts = content_content_inner_discuss.querySelectorAll(".content-content-inner-discuss-post");
            let sorted = [].map.call(content_content_inner_discuss_posts, function(ele){return ele}).sort(sort);

            if(content_content_inner_discuss_header_nav_filter.now_sort == "view-b>s"){
                sorted = sorted.reverse();
                content_content_inner_discuss_header_nav_filter.now_sort = "view-s>b";
            }else{
                content_content_inner_discuss_header_nav_filter.now_sort = "view-b>s";
            }

            for(let i=0; i<sorted.length; i++){
                sorted[i].parentNode.appendChild(sorted[i]);
            }
        }
    }
}
content_content_inner_discuss_header_nav_filter.querySelectorAll(".content-content-inner-discuss-header-nav-filter-item").forEach(filter_item => {
    let options = filter_item.querySelector(".content-content-inner-discuss-header-nav-filter-options");
    options.addEventListener("mouseleave", function(){
        options.classList.remove("active");
    })
    let button = filter_item.querySelector(".content-content-inner-discuss-header-nav-filter-button");
    button.addEventListener("click", function(){
        if(options.classList.contains("active")){
            options.classList.remove("active");
        }else{
            options.classList.add("active");
        }
    })
    let option_items = options.querySelectorAll(".content-content-inner-discuss-header-nav-filter-options-item");
    option_items.forEach(option_item => {
        option_item.addEventListener("click", function(){
            option_items.forEach(item => {
                if(item.classList.contains("active")) item.classList.remove("active");
            })
            option_item.classList.add("active");
            options.classList.remove("active");

            content_content_inner_discuss_header_nav_filter_option_item_function[filter_item.ariaLabel][option_item.ariaLabel]();
        })
    })
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
const inner_footer_nav = inner.querySelector("#content-content-inner-footer-nav");
const inner_footer_nav_random = inner_footer_nav.querySelector("#content-content-inner-footer-nav-right-random");
inner_footer_nav_random.addEventListener("click", function(){
    fetch(
        "/views/problem_list?get=all",
        {method:"GET"}
    ).then(res => {
        return res.json();
    }).then(res => {
        let problems = res["all"];
        let randed = parseInt(Math.random() * problems.length-1);
        location.href = `/views/problems/${problems[randed]["id"]}`;
    })
})
const inner_footer_nav_prev = inner_footer_nav.querySelector("#content-content-inner-footer-nav-right-prev");
inner_footer_nav_prev.addEventListener("click", function(){
    if(!QUESTION["prev"])return;
    location.href = `/views/problems/${QUESTION["prev"]}`;
})
const inner_footer_nav_next = inner_footer_nav.querySelector("#content-content-inner-footer-nav-right-next");
inner_footer_nav_next.addEventListener("click", function(){
    if(!QUESTION["next"])return;
    location.href = `/views/problems/${QUESTION["next"]}`;
})
