
const content_inner_pairs = [
    [content_inner_header_nav_profile,content_inner_profile, LoadProfile],
    [content_inner_header_nav_submissions,content_inner_submissions, LoadSubmissions],
    [content_inner_header_nav_posts,content_inner_posts, LoadPosts]
];
content_inner_pairs.forEach(pair => {
    let nav_button = pair[0];
    let content = pair[1];
    let onload_func = pair[2];
    nav_button.addEventListener("click", function(){
        content_inner_pairs.forEach(_pair => {
            _pair[0].classList.remove("active");
            _pair[1].classList.remove("active");
        })
        nav_button.classList.add("active");
        if(Profile_Owner["user_data"])onload_func();
        content.classList.add("active");
    })
})