const content_header = document.querySelector("#content-header");





const content_header_frame_img = document.querySelector("#content-header-frame-img");
const content_header_frame_input = document.querySelector("#content-header-frame-input");
content_header_frame_img.addEventListener("click", function(){
    content_header_frame_input.click();
})
content_header_frame_input.addEventListener("change", function(value){
    let file = value.target.files[0];
    let fdta = new FormData();
    content_header_frame_img.src = URL.createObjectURL(file);
    console.log(URL.createObjectURL(file));
    fdta.append("profile_img", file);
    fetch(
        `/account/update?type=profile_img&username=${USER["user_data"]["username"]}`,{
        method:"POST",
        body:fdta
    }).then(res => {
        return res.json();
    }).then(res => {
        if(res["state"]){
            USER["user_data"] = res["user_data"];
        }
    })
})


const content_header_info_username = document.querySelector("#content-header-info-username");
const content_header_info_email = document.querySelector("#content-header-info-email");



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