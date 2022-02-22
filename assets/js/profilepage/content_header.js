const content_header = document.querySelector("#content-header");





const content_header_info_username = document.querySelector("#content-header-info-username");
const content_header_info_email = document.querySelector("#content-header-info-email");
const content_header_frame_img = document.querySelector("#content-header-frame-img");
const content_header_frame_input = document.querySelector("#content-header-frame-input");
if(USER["login"] && Profile_Owner["username"] == USER["user_data"]["username"]){
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
}else{
    content_header_frame_img.style.cursor = "unset";
}

