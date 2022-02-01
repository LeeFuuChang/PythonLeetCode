// Question header nav (Problem description / Problem discuss / Problem submissions)
const inner_nav = document.querySelector("#content-header-nav-left");
const inner = document.querySelector("#content-content-inner");

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




// Question footer nav (Go Problems page / Random Problem / Prev Problem / Next Problem)
