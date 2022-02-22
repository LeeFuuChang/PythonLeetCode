content_inner_posts_header = content_inner_posts.querySelector("#content-inner-posts-header");




content_inner_posts_container = content_inner_posts.querySelector("#content-inner-posts-container");
function LoadPostsPost(){
    content_inner_posts_container.innerHTML = "";
    fetch(
        `/account/get?get=posts&username=${Profile_Owner["user_data"]["username"]}`,
        {method:"GET"}
    ).then(res => {
        return res.json();
    }).then(res => {
        res["user_posts"].forEach(post => {
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
        })
    })
}





function LoadPosts(){
    LoadPostsPost();
}