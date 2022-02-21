// content_inner_profile




const content_inner_profile_progress_description_data = content_inner_profile.querySelector("#content-inner-profile-progress-description-data");
const content_inner_profile_progress_description_text = content_inner_profile.querySelector("#content-inner-profile-progress-description-text");
const content_inner_profile_progress_bar_easy = content_inner_profile.querySelector("#content-inner-profile-progress-bar-easy");
const content_inner_profile_progress_bar_medium = content_inner_profile.querySelector("#content-inner-profile-progress-bar-medium");
const content_inner_profile_progress_bar_hard = content_inner_profile.querySelector("#content-inner-profile-progress-bar-hard");
const content_inner_profile_progress_bar = [
    content_inner_profile_progress_bar_easy,
    content_inner_profile_progress_bar_medium,
    content_inner_profile_progress_bar_hard
]
const content_inner_profile_progress_legends_easy = content_inner_profile.querySelector("#content-inner-profile-progress-legends-easy");
const content_inner_profile_progress_legends_medium = content_inner_profile.querySelector("#content-inner-profile-progress-legends-medium");
const content_inner_profile_progress_legends_hard = content_inner_profile.querySelector("#content-inner-profile-progress-legends-hard");
const content_inner_profile_progress_legends = [
    content_inner_profile_progress_legends_easy,
    content_inner_profile_progress_legends_medium,
    content_inner_profile_progress_legends_hard
]
function LoadProfileProgress(){
    let user_have = [0, 0, 0];
    Object.keys(USER["user_data"]["problems"]).forEach(id => {
        if(!USER["user_data"]["problems"][id]["passed"])return;
        switch(USER["user_data"]["problems"][id]["difficulty"]){
            case "Easy":
                user_have[0]++;
                break;
            case "Medium":
                user_have[1]++;
                break;
            case "Hard":
                user_have[2]++;
                break;
        }
    })
    content_inner_profile_progress_description_data.innerText = user_have.reduce(function(a, b){return a+b}, 0);
    fetch(
        "/views/problem_list?get=difficulty",
        {method:"GET"}
    ).then(res => {
        return res.json();
    }).then(res => {
        let problems = res["problem_list"];
        let difficulty_problems = [problems["Easy"].length, problems["Medium"].length, problems["Hard"].length];

        for(let i=0; i<3; i++){
            let have = content_inner_profile_progress_legends[i].querySelector(".content-inner-profile-progress-legends-item-bottom-text-have");
            let total = content_inner_profile_progress_legends[i].querySelector(".content-inner-profile-progress-legends-item-bottom-text-total");
            have.innerText = user_have[i];
            total.innerText = difficulty_problems[i];
            content_inner_profile_progress_bar[i].style.setProperty("--percent", `${parseInt(user_have[i] / difficulty_problems[i] * 100)}%`)
        }
        content_inner_profile_progress_description_text.innerText = difficulty_problems.reduce(function(a, b){return a+b}, 0);
    })
}
