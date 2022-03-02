const user_activity_default_rgb = 198;
const user_submissions_a_day_to_be_active = 10;
// content_inner_profile



const content_inner_profile_progress = content_inner_profile.querySelector("#content-inner-profile-progress");
const content_inner_profile_progress_description_data = content_inner_profile_progress.querySelector("#content-inner-profile-progress-description-data");
const content_inner_profile_progress_description_text = content_inner_profile_progress.querySelector("#content-inner-profile-progress-description-text");
const content_inner_profile_progress_bar_easy = content_inner_profile_progress.querySelector("#content-inner-profile-progress-bar-easy");
const content_inner_profile_progress_bar_medium = content_inner_profile_progress.querySelector("#content-inner-profile-progress-bar-medium");
const content_inner_profile_progress_bar_hard = content_inner_profile_progress.querySelector("#content-inner-profile-progress-bar-hard");
const content_inner_profile_progress_bar = [
    content_inner_profile_progress_bar_easy,
    content_inner_profile_progress_bar_medium,
    content_inner_profile_progress_bar_hard
];
const content_inner_profile_progress_legends_easy = content_inner_profile_progress.querySelector("#content-inner-profile-progress-legends-easy");
const content_inner_profile_progress_legends_medium = content_inner_profile_progress.querySelector("#content-inner-profile-progress-legends-medium");
const content_inner_profile_progress_legends_hard = content_inner_profile_progress.querySelector("#content-inner-profile-progress-legends-hard");
const content_inner_profile_progress_legends = [
    content_inner_profile_progress_legends_easy,
    content_inner_profile_progress_legends_medium,
    content_inner_profile_progress_legends_hard
];
function LoadProfileProgress(){
    fetch(
        "/views/problem_list?get=difficulty",
        {method:"GET"}
    ).then(res => {
        return res.json();
    }).then(res => {
        let user_have = [0, 0, 0];
        let problems = res["problem_list"];
        let difficulty_problems = [problems["Easy"].length, problems["Medium"].length, problems["Hard"].length];

        let user_len = 0;
        let problem_len = difficulty_problems.reduce(function(a, b){return a+b}, 0);
        problems["Easy"].concat(problems["Medium"]).concat().forEach(problem => {
            if(!Profile_Owner["user_data"]["problems"][problem["id"]] || !Profile_Owner["user_data"]["problems"][problem["id"]]["passed"])return;
            switch(problem["difficulty"]){
                case "Easy":
                    user_have[0]++;
                    break;
                case "Medium":
                    user_have[1]++;
                    break;
                case "Hard":
                    user_have[2]++;
                    break;
            };
            user_len++;
        });

        for(let i=0; i<3; i++){
            let have = content_inner_profile_progress_legends[i].querySelector(".content-inner-profile-progress-legends-item-bottom-text-have");
            let total = content_inner_profile_progress_legends[i].querySelector(".content-inner-profile-progress-legends-item-bottom-text-total");
            have.innerText = user_have[i];
            total.innerText = difficulty_problems[i];
            content_inner_profile_progress_bar[i].style.setProperty("--percent", `${parseInt(user_have[i] / problem_len * 100)}%`);
        };
        content_inner_profile_progress_description_data.innerText = user_len;
        content_inner_profile_progress_description_text.innerText = problem_len;
    });
};





const content_inner_profile_activity = content_inner_profile.querySelector("#content-inner-profile-activity");
const content_inner_profile_activity_description_data = content_inner_profile_activity.querySelector("#content-inner-profile-activity-description-data");
const content_inner_profile_activity_container_items = content_inner_profile_activity.querySelectorAll(".content-inner-profile-activity-container-item");
function LoadProfileActivity(){
    let today = new Date();
    let looking_dates = [].map.call(
        [...Array(7).keys()],
        function(idx){
            let working = new Date();
            working.setDate(today.getDate() - idx);
            let year = working.getFullYear();
            let month = working.getMonth();
            let date = working.getDate();
            return [`${`${year}`.padStart(4, "0")}/${`${month+1}`.padStart(2, "0")}/${`${date}`.padStart(2, "0")}`, 0];
        }
    );
    fetch(
        `/account/get?get=recentsubmissions&username=${Profile_Owner["user_data"]["username"]}`,
        {method:"GET"}
    ).then(res => {
        return res.json();
    }).then(res => {
        let now = 0;
        res["recentsubmissions"].every(result => {
            if(result["submit_time"].indexOf(looking_dates[now][0]) < 0){
                if(now==6)return false;
                for(let i=now; i<7; i++){
                    if(result["submit_time"].indexOf(looking_dates[now][0]) >= 0)break;
                    now++;
                };
                if(now==7)return false;
            };
            looking_dates[now][1]++;
            return true;
        });
        let not_zero = 7;
        for(let i=0; i<7; i++){
            content_inner_profile_activity_container_items[i].insertAdjacentHTML("beforeend", `
            <div class="content-inner-profile-activity-container-item-description">
                ${looking_dates[i][0]}<br>
                <span class="content-inner-profile-activity-container-item-description-data">${looking_dates[i][1]}</span>
                Submits
            </div>
            `);
            let color_ratio = (looking_dates[i][1]+(user_submissions_a_day_to_be_active/5))/user_submissions_a_day_to_be_active;
            let color_shifts = [(user_activity_default_rgb-64)*color_ratio, (user_activity_default_rgb-128)*color_ratio, (user_activity_default_rgb-64)*color_ratio];
            if(looking_dates[i][1] > 0 && looking_dates[i][1] < user_submissions_a_day_to_be_active-(user_submissions_a_day_to_be_active/5)){
                content_inner_profile_activity_container_items[i].style.background = `rgb(${user_activity_default_rgb-color_shifts[0]}, ${user_activity_default_rgb-color_shifts[1]}, ${user_activity_default_rgb-color_shifts[2]})`;
            }else if(looking_dates[i][1] >= user_submissions_a_day_to_be_active-(user_submissions_a_day_to_be_active/5)){
                content_inner_profile_activity_container_items[i].style.background = `rgb(64, 128, 64)`;
            }else{
                not_zero--;
            };
        };
        content_inner_profile_activity_description_data.innerText = `${parseInt(not_zero / 7 * 100)}`;
    });
};





function LoadProfile(){
    LoadProfileProgress();
    LoadProfileActivity();
}