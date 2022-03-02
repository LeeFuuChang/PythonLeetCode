const content = document.querySelector("#content");
const content_submissions = content.querySelector("#content-submissions");
const content_submissions_header = content_submissions.querySelector("#content-submissions-header");
const content_submissions_inner = content_submissions.querySelector("#content-submissions-inner");
const content_submissions_footer = content_submissions.querySelector("#content-submissions-footer");





// content header
const default_item_filter_as = {
    "search":1
};
const content_submissions_header_nav_search = content_submissions_header.querySelector("#content-submissions-header-nav-search");
content_submissions_header_nav_search.addEventListener("input", function(){
    let value = content_submissions_header_nav_search.value.toLowerCase();
    let submission_items = content_submissions_inner.querySelectorAll("div.content-submissions-inner-item");
    submission_items.forEach(item => {
        if(!item.filter_as){
            item.filter_as = JSON.parse(JSON.stringify(default_item_filter_as)) //copy
        };

        if( item.ariaLabel.indexOf(value)>=0 ){
            item.filter_as["search"] = 1;
        }else{
            item.filter_as["search"] = 0;
        };

        let now = 1;
        Object.values(item.filter_as).forEach(i => {
            now *= i;
        });
        if(now){
            item.style.display = "flex";
        }else{
            item.style.display = "none";
        };
    });
});





// content inner
const LoadSubmissionList = function(slist){
    let result_ref = {
        "PD":"Pending",
        "AC":"Accepted", 
        "WA":"Wrong Answer", 
        "TLE":"Time Limit Exceed", 
        "MLE":"Memory Limit Exceed", 
        "RE":"Runtime Error", 
        "CE":"Compile Error",
        "SE":"Server Error"
    };
    slist.forEach(s => {
        let problem_id = s["problem_id"];
        let username = s["username"];
        let problem_title = s["problem_title"];
        let time = s["submit_time"];
        let result = s["result"];
        let result_state = "pending";
        switch(result){
            case "PD":
                result = result_ref[result];
                result_state = "pending";
                break;
            case "AC":
                result = result_ref[result];
                result_state = "passed";
                break;
            default:
                result = result_ref[result];
                result_state = "failed";
                break;
        };

        let html = `
        <div class="df aic content-submissions-inner-item" aria-label="${problem_id + username.toLowerCase() + problem_title.toLowerCase()}">
            <div class="df aic content-submissions-inner-item-left">
                <div class="df aic content-submissions-inner-item-left-id">
                    <span class="content-submissions-inner-item-left-id-text">
                        ${problem_id}
                    </span>
                </div>
                <a class="df aic content-submissions-inner-item-left-username" href="/account/profile/${username}">
                    <span class="content-submissions-inner-item-left-username-text">
                        ${username}
                    </span>
                </a>
                <a class="df aic content-submissions-inner-item-left-title" href="/views/problems/${problem_id}">
                    <span class="content-submissions-inner-item-left-title-text">
                        ${problem_title}
                    </span>
                </a>
            </div>
            <div class="df aic content-submissions-inner-item-right">
                <div class="df aic content-submissions-inner-item-right-result">
                    <span class="content-submissions-inner-item-right-result-text ${result_state}">
                        ${result}
                    </span>
                </div>
                <div class="df aic content-submissions-inner-item-right-join">
                    <span class="content-submissions-inner-item-right-join-text">
                        ${time}
                    </span>
                </div>
            </div>
        </div>
        `;

        content_submissions_inner.insertAdjacentHTML("beforeend", html);
    });
};
const ReloadSubmissionList = function(){
    if(submissions_reloading)return;
    submissions_reloading = true;
    content_submissions_footer_more.style.display = "none";
    fetch(
        `/submit/submissions?start=1&end=${submissions_end}`,
        {method:"GET"}
    ).then(res => {
        return res.json();
    }).then(res => {
        content_submissions_inner.innerHTML = `
        <header id="content-submissions-inner-header" class="df aic content-submissions-inner-item">
            <div class="df aic content-submissions-inner-item-left">
                <div id="content-submissions-inner-sort-id" class="df aic content-submissions-inner-item-left-id">
                    <span class="content-submissions-inner-item-left-id-text">
                        ID
                    </span>
                </div>
                <div id="content-submissions-inner-sort-id" class="df aic content-submissions-inner-item-left-username">
                    <span class="content-submissions-inner-item-left-username-text">
                        Username
                    </span>
                </div>
                <div class="df aic content-submissions-inner-item-left-title">
                    <span class="content-submissions-inner-item-left-title-text">
                        Title
                    </span>
                </div>
            </div>
            <div class="df aic content-submissions-inner-item-right">
                <div id="content-submissions-inner-sort-difficulty" class="df aic content-submissions-inner-item-right-result">
                    <span class="content-submissions-inner-item-right-result-text">
                        Result
                    </span>
                </div>
                <div id="content-submissions-inner-sort-join" class="df aic content-submissions-inner-item-right-join">
                    <span class="content-submissions-inner-item-right-join-text">
                        Time
                    </span>
                </div>
            </div>
        </header>
        `;
        LoadSubmissionList(res["submissions"]);
        submissions_more = res["more"];
        if(submissions_more){
            content_submissions_footer_more.style.display = "flex";
        };
        submissions_reloading = false;
    });
};





// content footer 
const content_submissions_footer_more = content_submissions_footer.querySelector("#content-submissions-footer-more");
content_submissions_footer_more.addEventListener("click", function(){
    if(submissions_more){
        content_submissions_footer_more.style.display = "none";
        submissions_start += 50;
        submissions_end += 50;
        fetch(
            `/submit/submissions?start=${submissions_start}&end=${submissions_end}`,
            {method:"GET"}
        ).then(res => {
            return res.json();
        }).then(res => {
            LoadSubmissionList(res["submissions"]);
            submissions_more = res["more"];
            if(submissions_more){
                content_submissions_footer_more.style.display = "flex";
            };
        });
    };
});
