const content_inner_posts_header = content_inner_posts.querySelector("#content-inner-posts-header");
const content_inner_posts_header_nav = content_inner_posts_header.querySelector("#content-inner-posts-header-nav");
const content_inner_posts_container = content_inner_posts.querySelector("#content-inner-posts-container");





const content_inner_posts_header_nav_search = content_inner_posts_header_nav.querySelector("#content-inner-posts-header-nav-search");
content_inner_posts_header_nav_search.addEventListener("input", function(){
    let value = content_inner_posts_header_nav_search.value.toLowerCase();
    let content_inner_posts_posts = content_inner_posts_container.querySelectorAll(".content-inner-posts-container-post");
    content_inner_posts_posts.forEach(post => {
        let problem_id = post.querySelector(".content-inner-posts-container-post-footer-right-id").innerText.toLowerCase();
        let title = post.querySelector(".content-inner-posts-container-post-title").innerText.toLowerCase();
        let combine = problem_id+title;

        if( combine.indexOf(value)>=0 ){
            post.style.display = "flex";
        }else{
            post.style.display = "none";
        };
    });
});
const content_inner_posts_header_nav_filter = content_inner_posts_header_nav.querySelector("#content-inner-posts-header-nav-filter");
content_inner_posts_header_nav_filter.now_sort = null;
const content_inner_posts_header_nav_filter_option_item_function = {
    "sort":{
        "nto":function(){
            let sort = function(a, b){
                let t1_s = a.querySelector(".content-inner-posts-container-post-footer-left-time").textContent;
                let t1_st = t1_s.split(" ");
                let t1_as = t1_st[0].split("/");
                let t1_bs = t1_st[1].split(":");
                let t1 = parseInt(t1_as[0])*12*30*24*60 + parseInt(t1_as[1])*30*24*60 + parseInt(t1_as[2])*24*60 + parseInt(t1_bs[0])*60 + parseInt(t1_bs[1]);
                
                let t2_s = b.querySelector(".content-inner-posts-container-post-footer-left-time").textContent;
                let t2_st = t2_s.split(" ");
                let t2_as = t2_st[0].split("/");
                let t2_bs = t2_st[1].split(":");
                let t2 = parseInt(t2_as[0])*12*30*24*60 + parseInt(t2_as[1])*30*24*60 + parseInt(t2_as[2])*24*60 + parseInt(t2_bs[0])*60 + parseInt(t2_bs[1]);
                
                return t2 - t1;
            };

            let content_inner_posts_posts = content_inner_posts.querySelectorAll(".content-inner-posts-container-post");
            let sorted = [].map.call(content_inner_posts_posts, function(ele){return ele}).sort(sort);

            if(content_inner_posts_header_nav_filter.now_sort == "nto-b>s"){
                sorted = sorted.reverse();
                content_inner_posts_header_nav_filter.now_sort = "nto-s>b";
            }else{
                content_inner_posts_header_nav_filter.now_sort = "nto-b>s";
            };

            for(let i=0; i<sorted.length; i++){
                sorted[i].parentNode.appendChild(sorted[i]);
            };
        },
        "vote":function(){
            let sort = function(a, b){
                let t1 = a.querySelector(".content-inner-posts-container-post-footer-right-likes-text").textContent;
                let t2 = b.querySelector(".content-inner-posts-container-post-footer-right-likes-text").textContent;
                return parseInt(t2)-parseInt(t1);
            };
            let content_inner_posts_posts = content_inner_posts.querySelectorAll(".content-inner-posts-container-post");
            let sorted = [].map.call(content_inner_posts_posts, function(ele){return ele}).sort(sort);

            if(content_inner_posts_header_nav_filter.now_sort == "vote-b>s"){
                sorted = sorted.reverse();
                content_inner_posts_header_nav_filter.now_sort = "vote-s>b";
            }else{
                content_inner_posts_header_nav_filter.now_sort = "vote-b>s";
            };

            for(let i=0; i<sorted.length; i++){
                sorted[i].parentNode.appendChild(sorted[i]);
            };
        },
        "view":function(){
            let sort = function(a, b){
                let t1 = a.querySelector(".content-inner-posts-container-post-footer-right-views-text").textContent;
                let t2 = b.querySelector(".content-inner-posts-container-post-footer-right-views-text").textContent;
                return parseInt(t2)-parseInt(t1);
            };
            let content_inner_posts_posts = content_inner_posts.querySelectorAll(".content-inner-posts-container-post");
            let sorted = [].map.call(content_inner_posts_posts, function(ele){return ele}).sort(sort);

            if(content_inner_posts_header_nav_filter.now_sort == "view-b>s"){
                sorted = sorted.reverse();
                content_inner_posts_header_nav_filter.now_sort = "view-s>b";
            }else{
                content_inner_posts_header_nav_filter.now_sort = "view-b>s";
            };

            for(let i=0; i<sorted.length; i++){
                sorted[i].parentNode.appendChild(sorted[i]);
            };
        }
    }
};
content_inner_posts_header_nav_filter.querySelectorAll(".content-inner-posts-header-nav-filter-item").forEach(filter_item => {
    let options = filter_item.querySelector(".content-inner-posts-header-nav-filter-options");
    options.addEventListener("mouseleave", function(){
        options.classList.remove("active");
    });
    let button = filter_item.querySelector(".content-inner-posts-header-nav-filter-button");
    button.addEventListener("click", function(){
        if(options.classList.contains("active")){
            options.classList.remove("active");
        }else{
            options.classList.add("active");
        };
    });
    let option_items = options.querySelectorAll(".content-inner-posts-header-nav-filter-options-item");
    option_items.forEach(option_item => {
        option_item.addEventListener("click", function(){
            option_items.forEach(item => {
                if(item.classList.contains("active")) item.classList.remove("active");
            });
            option_item.classList.add("active");
            options.classList.remove("active");

            content_inner_posts_header_nav_filter_option_item_function[filter_item.ariaLabel][option_item.ariaLabel]();
        });
    });
});





function LoadPostsPost(){
    content_inner_posts_container.innerHTML = "";
    fetch(
        `/account/get?get=posts&username=${Profile_Owner["user_data"]["username"]}`,
        {method:"GET"}
    ).then(res => {
        return res.json();
    }).then(res => {
        user_posts = [].map.call(res["user_posts"], post=>{return post}).sort(function(a, b){
            let t1_st = a["time"].split(" ");
            let t1_as = t1_st[0].split("/");
            let t1_bs = t1_st[1].split(":");
            let t1 = parseInt(t1_as[0])*12*30*24*60 + parseInt(t1_as[1])*30*24*60 + parseInt(t1_as[2])*24*60 + parseInt(t1_bs[0])*60 + parseInt(t1_bs[1]);
            let t2_st = b["time"].split(" ");
            let t2_as = t2_st[0].split("/");
            let t2_bs = t2_st[1].split(":");
            let t2 = parseInt(t2_as[0])*12*30*24*60 + parseInt(t2_as[1])*30*24*60 + parseInt(t2_as[2])*24*60 + parseInt(t2_bs[0])*60 + parseInt(t2_bs[1]);
            return t2 - t1;
        });
        user_posts.forEach(post => {
            let post_id = post["id"];
            let posttitle = post["title"];
            let author = post["author"];
            let posttime = post["time"];
            let problem_id = post["question"];
            let likes = post["likes"].length;
            let views = post["views"].length;
            content_inner_posts_container.insertAdjacentHTML("beforeend", `
            <div class="df content-inner-posts-container-post">
                <a class="content-inner-posts-container-post-title" href="/discuss/visit?id=${post_id}">${posttitle}</a>
                <hr class="content-inner-posts-container-post-hr">
                <div class="df aic content-inner-posts-container-post-footer">
                    <div class="df aic content-inner-posts-container-post-footer-left">
                        <a class="df aic content-inner-posts-container-post-footer-left-username" href="/account/profile/${author}">${author}</a>
                        <span class="df aic content-inner-posts-container-post-footer-left-time">${posttime}</span>
                    </div>
                    <div class="df aic content-inner-posts-container-post-footer-right">
                        <a class="df aic content-inner-posts-container-post-footer-right-id" href="/views/problems/${problem_id}">
                            problem_${problem_id}
                        </a>
                        <div class="df aic content-inner-posts-container-post-footer-right-likes">
                            <svg class="content-inner-posts-container-post-footer-right-likes-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-up-fill" viewBox="0 0 16 16">
                                <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                            </svg>
                            <span class="content-inner-posts-container-post-footer-right-likes-text">${likes}</span>
                        </div>
                        <div class="df aic content-inner-posts-container-post-footer-right-views">
                            <svg class="content-inner-posts-container-post-footer-right-views-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                            </svg>
                            <span class="content-inner-posts-container-post-footer-right-views-text">${views}</span>
                        </div>
                    </div>
                </div>
            </div>
            `);
        });
    });
};





function LoadPosts(){
    LoadPostsPost();
};
