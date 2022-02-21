const content_inner_header_nav_profile = document.querySelector("#content-inner-header-nav-profile");
const content_inner_profile = document.querySelector("#content-inner-profile");
const content_inner_header_nav_submissions = document.querySelector("#content-inner-header-nav-submissions");
const content_inner_submissions = document.querySelector("#content-inner-submissions");
const content_inner_header_nav_posts = document.querySelector("#content-inner-header-nav-posts");
const content_inner_posts = document.querySelector("#content-inner-posts");
const content_inner_pairs = [
    [content_inner_header_nav_profile,content_inner_profile],
    [content_inner_header_nav_submissions,content_inner_submissions],
    [content_inner_header_nav_posts,content_inner_posts]
];
content_inner_pairs.forEach(pair => {
    let nav_button = pair[0];
    let content = pair[1];
    nav_button.addEventListener("click", function(){
        content_inner_pairs.forEach(_pair => {
            _pair[0].classList.remove("active");
            _pair[1].classList.remove("active");
        })
        nav_button.classList.add("active");
        content.classList.add("active");
    })
})