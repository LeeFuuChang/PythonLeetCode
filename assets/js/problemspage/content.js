const content = document.querySelector("#content");
const content_questions = document.querySelector("#content-questions");





const content_questions_inner = document.querySelector("#content-questions-inner");
const LoadProblemList = function(plist){
    state_ref = [
        `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg content-questions-inner-item-left-state-icon passed" viewBox="0 0 16 16">
            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
        </svg>
        `,
        `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-activity content-questions-inner-item-left-state-icon failed" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M6 2a.5.5 0 0 1 .47.33L10 12.036l1.53-4.208A.5.5 0 0 1 12 7.5h3.5a.5.5 0 0 1 0 1h-3.15l-1.88 5.17a.5.5 0 0 1-.94 0L6 3.964 4.47 8.171A.5.5 0 0 1 4 8.5H.5a.5.5 0 0 1 0-1h3.15l1.88-5.17A.5.5 0 0 1 6 2Z"/>
        </svg>
        `,
        `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-lg content-questions-inner-item-left-state-icon" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z"/>
        </svg>
        `
    ]
    plist.forEach(p => {
        if(!USER.login || !USER["user_data"]["problems"][p["id"]]){
            state = state_ref[2];
        }else if(!USER["user_data"]["problems"][p["id"]]["passed"]){
            state = state_ref[1];
        }else{
            state = state_ref[0];
        }

        let html = `
        <div class="df aic content-questions-inner-item">
            <div class="df aic content-questions-inner-item-left">
                <div class="df aic jcc content-questions-inner-item-left-state">
                    ${state}
                </div>
                <div class="df aic content-questions-inner-item-left-id">
                    <span class="content-questions-inner-item-left-id-text">
                        ${p["id"]}
                    </span>
                </div>
                <a class="df aic content-questions-inner-item-left-title" href="/views/problems/${p["id"]}">
                    <span class="content-questions-inner-item-left-title-text">
                        ${p["name"]}
                    </span>
                </a>
            </div>
            <div class="df aic content-questions-inner-item-right">
                <div class="df aic content-questions-inner-item-right-acceptance">
                    <span class="content-questions-inner-item-right-acceptance-text">
                        ${ parseInt(p["passed_participants"] / p["participants"] * 100) }%
                    </span>
                </div>
                <div class="df aic content-questions-inner-item-right-difficulty">
                    <span class="content-questions-inner-item-right-difficulty-text ${p["difficulty"].toLowerCase()}">
                        ${p["difficulty"]}
                    </span>
                </div>
                <div class="df aic content-questions-inner-item-right-join">
                    <span class="content-questions-inner-item-right-join-text">
                        ${p["time"]}
                    </span>
                </div>
            </div>
        </div>
        `

        content_questions_inner.insertAdjacentHTML("beforeend", html);
    })
}