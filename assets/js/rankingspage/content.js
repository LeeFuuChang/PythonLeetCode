const content = document.querySelector("#content");
const content_rankings = content.querySelector("#content-rankings");
const content_rankings_header = content_rankings.querySelector("#content-rankings-header");
const content_rankings_inner = content_rankings.querySelector("#content-rankings-inner");
const content_rankings_footer = content_rankings.querySelector("#content-rankings-footer");





// content header
const default_item_filter_as = {
    "search":1,
    "acceptance":1
}
const content_rankings_header_nav_search = content_rankings_header.querySelector("#content-rankings-header-nav-search");
content_rankings_header_nav_search.addEventListener("input", function(){
    let value = content_rankings_header_nav_search.value.toLowerCase();
    let ranking_items = content_rankings_inner.querySelectorAll("div.content-rankings-inner-item");
    ranking_items.forEach(item => {
        let username = item.querySelector(".content-rankings-inner-item-left-username-text").innerText.toLowerCase();

        if(!item.filter_as){
            item.filter_as = JSON.parse(JSON.stringify(default_item_filter_as)) //copy
        }

        if( username.indexOf(value)>=0 ){
            item.filter_as["search"] = 1;
        }else{
            item.filter_as["search"] = 0;
        }

        let now = 1;
        Object.values(item.filter_as).forEach(i => {
            now *= i;
        })
        if(now){
            item.style.display = "flex";
        }else{
            item.style.display = "none";
        }
    })
})
content_rankings_header_nav_search.addEventListener("keydown", function(e){
    if(e.key == "Enter"){
        location.href = `/account/profile/${content_rankings_header_nav_search.value.toLowerCase()}`;
    }
})
const filter_ref = {
    "acceptance":{
        "90-100":function(problem_list){
            problem_list.forEach(item => {
                if(!item.filter_as){
                    item.filter_as = JSON.parse(JSON.stringify(default_item_filter_as)); //copy
                }

                let min = 90;
                let max = 100;

                let item_acceptance = item.querySelector(".content-rankings-inner-item-right-acceptance-text");
                item_acceptance = parseInt(item_acceptance.ariaLabel);

                if(min <= item_acceptance && item_acceptance <= max){
                    item.filter_as["acceptance"] = 1;
                }else{
                    item.filter_as["acceptance"] = 0;
                }
                
                let now = 1;
                Object.values(item.filter_as).forEach(i => {
                    now *= i;
                })
                if(now){
                    item.style.display = "flex";
                }else{
                    item.style.display = "none";
                }
            })
        },
        "80-90":function(problem_list){
            problem_list.forEach(item => {
                if(!item.filter_as){
                    item.filter_as = JSON.parse(JSON.stringify(default_item_filter_as)); //copy
                }

                let min = 80;
                let max = 90;

                let item_acceptance = item.querySelector(".content-rankings-inner-item-right-acceptance-text");
                item_acceptance = parseInt(item_acceptance.ariaLabel);

                if(min <= item_acceptance && item_acceptance <= max){
                    item.filter_as["acceptance"] = 1;
                }else{
                    item.filter_as["acceptance"] = 0;
                }
                
                let now = 1;
                Object.values(item.filter_as).forEach(i => {
                    now *= i;
                })
                if(now){
                    item.style.display = "flex";
                }else{
                    item.style.display = "none";
                }
            })
        },
        "70-80":function(problem_list){
            problem_list.forEach(item => {
                if(!item.filter_as){
                    item.filter_as = JSON.parse(JSON.stringify(default_item_filter_as)); //copy
                }

                let min = 70;
                let max = 80;

                let item_acceptance = item.querySelector(".content-rankings-inner-item-right-acceptance-text");
                item_acceptance = parseInt(item_acceptance.ariaLabel);

                if(min <= item_acceptance && item_acceptance <= max){
                    item.filter_as["acceptance"] = 1;
                }else{
                    item.filter_as["acceptance"] = 0;
                }
                
                let now = 1;
                Object.values(item.filter_as).forEach(i => {
                    now *= i;
                })
                if(now){
                    item.style.display = "flex";
                }else{
                    item.style.display = "none";
                }
            })
        },
        "60-70":function(problem_list){
            problem_list.forEach(item => {
                if(!item.filter_as){
                    item.filter_as = JSON.parse(JSON.stringify(default_item_filter_as)); //copy
                }

                let min = 60;
                let max = 70;

                let item_acceptance = item.querySelector(".content-rankings-inner-item-right-acceptance-text");
                item_acceptance = parseInt(item_acceptance.ariaLabel);

                if(min <= item_acceptance && item_acceptance <= max){
                    item.filter_as["acceptance"] = 1;
                }else{
                    item.filter_as["acceptance"] = 0;
                }
                
                let now = 1;
                Object.values(item.filter_as).forEach(i => {
                    now *= i;
                })
                if(now){
                    item.style.display = "flex";
                }else{
                    item.style.display = "none";
                }
            })
        },
        "50-60":function(problem_list){
            problem_list.forEach(item => {
                if(!item.filter_as){
                    item.filter_as = JSON.parse(JSON.stringify(default_item_filter_as)); //copy
                }

                let min = 50;
                let max = 60;

                let item_acceptance = item.querySelector(".content-rankings-inner-item-right-acceptance-text");
                item_acceptance = parseInt(item_acceptance.ariaLabel);

                if(min <= item_acceptance && item_acceptance <= max){
                    item.filter_as["acceptance"] = 1;
                }else{
                    item.filter_as["acceptance"] = 0;
                }
                
                let now = 1;
                Object.values(item.filter_as).forEach(i => {
                    now *= i;
                })
                if(now){
                    item.style.display = "flex";
                }else{
                    item.style.display = "none";
                }
            })
        },
        "40-50":function(problem_list){
            problem_list.forEach(item => {
                if(!item.filter_as){
                    item.filter_as = JSON.parse(JSON.stringify(default_item_filter_as)); //copy
                }

                let min = 40;
                let max = 50;

                let item_acceptance = item.querySelector(".content-rankings-inner-item-right-acceptance-text");
                item_acceptance = parseInt(item_acceptance.ariaLabel);

                if(min <= item_acceptance && item_acceptance <= max){
                    item.filter_as["acceptance"] = 1;
                }else{
                    item.filter_as["acceptance"] = 0;
                }
                
                let now = 1;
                Object.values(item.filter_as).forEach(i => {
                    now *= i;
                })
                if(now){
                    item.style.display = "flex";
                }else{
                    item.style.display = "none";
                }
            })
        },
        "30-40":function(problem_list){
            problem_list.forEach(item => {
                if(!item.filter_as){
                    item.filter_as = JSON.parse(JSON.stringify(default_item_filter_as)); //copy
                }

                let min = 30;
                let max = 40;

                let item_acceptance = item.querySelector(".content-rankings-inner-item-right-acceptance-text");
                item_acceptance = parseInt(item_acceptance.ariaLabel);

                if(min <= item_acceptance && item_acceptance <= max){
                    item.filter_as["acceptance"] = 1;
                }else{
                    item.filter_as["acceptance"] = 0;
                }
                
                let now = 1;
                Object.values(item.filter_as).forEach(i => {
                    now *= i;
                })
                if(now){
                    item.style.display = "flex";
                }else{
                    item.style.display = "none";
                }
            })
        },
        "20-30":function(problem_list){
            problem_list.forEach(item => {
                if(!item.filter_as){
                    item.filter_as = JSON.parse(JSON.stringify(default_item_filter_as)); //copy
                }

                let min = 20;
                let max = 30;

                let item_acceptance = item.querySelector(".content-rankings-inner-item-right-acceptance-text");
                item_acceptance = parseInt(item_acceptance.ariaLabel);

                if(min <= item_acceptance && item_acceptance <= max){
                    item.filter_as["acceptance"] = 1;
                }else{
                    item.filter_as["acceptance"] = 0;
                }
                
                let now = 1;
                Object.values(item.filter_as).forEach(i => {
                    now *= i;
                })
                if(now){
                    item.style.display = "flex";
                }else{
                    item.style.display = "none";
                }
            })
        },
        "10-20":function(problem_list){
            problem_list.forEach(item => {
                if(!item.filter_as){
                    item.filter_as = JSON.parse(JSON.stringify(default_item_filter_as)); //copy
                }

                let min = 10;
                let max = 20;

                let item_acceptance = item.querySelector(".content-rankings-inner-item-right-acceptance-text");
                item_acceptance = parseInt(item_acceptance.ariaLabel);

                if(min <= item_acceptance && item_acceptance <= max){
                    item.filter_as["acceptance"] = 1;
                }else{
                    item.filter_as["acceptance"] = 0;
                }
                
                let now = 1;
                Object.values(item.filter_as).forEach(i => {
                    now *= i;
                })
                if(now){
                    item.style.display = "flex";
                }else{
                    item.style.display = "none";
                }
            })
        },
        "0-10":function(problem_list){
            problem_list.forEach(item => {
                if(!item.filter_as){
                    item.filter_as = JSON.parse(JSON.stringify(default_item_filter_as)); //copy
                }

                let min = 0;
                let max = 10;

                let item_acceptance = item.querySelector(".content-rankings-inner-item-right-acceptance-text");
                item_acceptance = parseInt(item_acceptance.ariaLabel);

                if(min <= item_acceptance && item_acceptance <= max){
                    item.filter_as["acceptance"] = 1;
                }else{
                    item.filter_as["acceptance"] = 0;
                }
                
                let now = 1;
                Object.values(item.filter_as).forEach(i => {
                    now *= i;
                })
                if(now){
                    item.style.display = "flex";
                }else{
                    item.style.display = "none";
                }
            })
        },
        "default":function(problem_list){
            problem_list.forEach(item => {
                if(!item.filter_as){
                    item.filter_as = JSON.parse(JSON.stringify(default_item_filter_as)) //copy
                }

                item.filter_as["acceptance"] = 1;

                let now = 1;
                Object.values(item.filter_as).forEach(i => {
                    now *= i;
                })
                if(now){
                    item.style.display = "flex";
                }else{
                    item.style.display = "none";
                }
            })
        }
    }
}
const filters = content_rankings_header.querySelectorAll(".content-rankings-header-nav-filter-item");
filters.forEach(filter => {
    let button = filter.querySelector(".content-rankings-header-nav-filter-button");
    let option_ui = filter.querySelector(".content-rankings-header-nav-filter-options");
    let options = option_ui.querySelectorAll(".content-rankings-header-nav-filter-options-item");
    button.addEventListener("click", ()=>{
        if(option_ui.classList.contains("active")){
            option_ui.classList.remove("active");
        }else{
            option_ui.classList.add("active");
        }
    })
    option_ui.addEventListener("mouseleave", ()=>{
        option_ui.classList.remove("active");
    })
    options.forEach(opt => {
        opt.addEventListener("click", ()=>{
            options.forEach(o => {
                o.classList.remove("active");
            })
            opt.classList.add("active");
            filter_ref[filter.ariaLabel][opt.ariaLabel](
                content_rankings_inner.querySelectorAll("div.content-rankings-inner-item")
            )
        })
    })
})





// problem lists
const LoadRankings = function(rlist){
    let now_len = content_rankings_inner.querySelectorAll("div.content-rankings-inner-item").length;
    for(let i=0; i<rlist.length; i++){
        let r = rlist[i];

        let username = r["username"];
        let passed_count = r["passed_problems"].length;
        let tried_count = Object.values(r["tried_problems"]).length;
        let join_time = r["join"];

        let html = `
        <div class="df aic content-rankings-inner-item">
            <div class="df aic content-rankings-inner-item-left">
                <div class="df aic content-rankings-inner-item-left-rank">
                    <span class="content-rankings-inner-item-left-rank-text">
                        ${now_len+i+1}
                    </span>
                </div>
                <a class="df aic content-rankings-inner-item-left-username" href="/views/problems/">
                    <span class="content-rankings-inner-item-left-username-text">
                        ${username}
                    </span>
                </a>
            </div>
            <div class="df aic content-rankings-inner-item-right">
                <div class="df aic content-rankings-inner-item-right-accept">
                    <span class="content-rankings-inner-item-right-accept-text">
                        ${passed_count}
                    </span>
                </div>
                <div class="df aic content-rankings-inner-item-right-acceptance">
                    <span class="content-rankings-inner-item-right-acceptance-text" aria-label="97">
                        ${tried_count ? parseInt(passed_count / tried_count * 100) : 0}%
                    </span>
                </div>
                <div class="df aic content-rankings-inner-item-right-join">
                    <span class="content-rankings-inner-item-right-join-text">
                        ${join_time}
                    </span>
                </div>
            </div>
        </div>
        `

        content_rankings_inner.insertAdjacentHTML("beforeend", html);
    }
}





// content footer 
const content_rankings_footer_more = content_rankings_footer.querySelector("#content-rankings-footer-more");
content_rankings_footer_more.addEventListener("click", function(){
    if(user_list_more){
        content_rankings_footer_more.style.display = "none";
        user_list_start += 50;
        user_list_end += 50;
        fetch(
            `/account/user_list?start=${user_list_start}&end=${user_list_end}`,
            {method:"GET"}
        ).then(res => {
            return res.json();
        }).then(res => {
            LoadProblemList(res["user_list"]);
            user_list_more = res["more"];
            if(user_list_more){
                content_rankings_footer_more.style.display = "flex";
            }
        })
    }
})