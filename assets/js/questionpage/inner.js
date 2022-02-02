const inner = document.querySelector("#content-content-inner");



// Question header nav (Problem description / Problem discuss / Problem submissions)
const inner_nav = document.querySelector("#content-header-nav-left");

inner_nav.querySelectorAll(".content-header-nav-left-item").forEach(nav => {
    nav.onclick = function(){
        inner_nav.querySelectorAll(".active").forEach(active => {
            active.classList.remove("active");
        })
        nav.classList.add("active");
        inner.querySelectorAll(".active").forEach(active => {
            active.classList.remove("active");
        })
        inner.querySelector(`#content-content-inner-${nav.ariaLabel}`).classList.add("active");
    }
})





// Question description
const content_ontent_inner_description = document.querySelector("#content-content-inner-description");
content_ontent_inner_description.querySelector("#content-content-inner-description-header-title-id").textContent = QUESTION.id;
content_ontent_inner_description.querySelector("#content-content-inner-description-header-title-name").textContent = QUESTION.name;
content_ontent_inner_description.querySelector("#content-content-inner-description-header-nav-difficulty").classList.add(QUESTION.difficulty.toLowerCase());
content_ontent_inner_description.querySelector("#content-content-inner-description-header-nav-difficulty").textContent = QUESTION.difficulty;
content_ontent_inner_description.querySelector("#content-content-inner-description-header-nav-like").insertAdjacentText("beforeend", QUESTION.likes);
content_ontent_inner_description.querySelector("#content-content-inner-description-header-nav-dislike").insertAdjacentText("beforeend", QUESTION.dislikes);
QUESTION.description.forEach(line => {
    content_ontent_inner_description.querySelector("#content-content-inner-description-content-question").insertAdjacentHTML(
        "beforeend",
        `
        <p class="df aic content-content-inner-description-content-question-line">
            ${line}
        </p>
        `
    )
})
let examples = content_ontent_inner_description.querySelectorAll(".content-content-inner-description-content-example-frame");
for(let i=0; i<3; i++){
    let Qexamples = QUESTION.example[`ex${i+1}`];
    if(Qexamples["input"]){
        examples[i].insertAdjacentHTML(
            "beforeend", 
            `
            <p class="df aic content-content-inner-description-content-example-frame-input">
                Input: <span class="df aic content-content-inner-description-content-example-frame-input-value">
                    ${Qexamples["input"]}
                </span>
            </p>
            `
        )
    }
    if(Qexamples["output"]){
        examples[i].insertAdjacentHTML(
            "beforeend", 
            `
            <p class="df aic content-content-inner-description-content-example-frame-output">
                Output: <span class="df aic content-content-inner-description-content-example-frame-output-value">
                    ${Qexamples["output"]}
                </span>
            </p>
            `
        )
    }
    if(Qexamples["explain"]){
        examples[i].insertAdjacentHTML(
            "beforeend", 
            `
            <p class="df aic content-content-inner-description-content-example-frame-explain">
                Explain: <span class="df aic content-content-inner-description-content-example-frame-explain-value">
                    ${Qexamples["explain"]}
                </span>
            </p>
            `
        )
    }
}
let constraints_ul = content_ontent_inner_description.querySelector("#content-content-inner-description-content-constraints-list");
QUESTION.constraints.forEach(cst => {
    constraints_ul.insertAdjacentHTML(
        "beforeend",
        `
        <li class="content-content-inner-description-content-constraints-list-item">
            ${cst}
        </li>
        `
    )
})



//Question description scroll
const inner_type = inner.querySelectorAll(".content-content-inner-type");
inner_type.forEach(type => {
    type.addEventListener("wheel", function(e){
        let currentTop = type.style.top.substring(0, type.style.top.length-2);
        let current = undefined;
        if(currentTop==""){current=0;}else{current=parseInt(currentTop)}
        current = (e.deltaY*-0.25 + current)

        let currentH = 0;
        for(let i=0; i<type.children.length; i++){
            currentH += type.children[i].offsetHeight;
        }
        type.style.top = Math.min(Math.max(Math.min(current, 0), window.innerHeight-160-currentH), 0) + "px";
    })
})





// Question footer nav (Go Problems page / Random Problem / Prev Problem / Next Problem)
