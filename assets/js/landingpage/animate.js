const animated = document.querySelector("#content-header-left-frame-animation");
const monthRef = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
]
const animateText = [
    {"text":"Python", "delay":10, "instant":0}
]

function StartLandingPageEditorAnimation(){
    let Timer = new Date();
    let timeString = `${monthRef[Timer.getMonth()]} ${Timer.getDate()} ${Timer.getFullYear()}, ${Timer.getHours()}:${Timer.getMinutes()}:${Timer.getSeconds()}`;

    let animateText = [
        {"text":"C:\\USERS\\Pythonista> ", "delay":0, "instant":1},
        {"text":"", "delay":1000, "instant":0},
        {"text":"Python", "delay":100, "instant":0},
        {"text":"", "delay":250, "instant":0},
        {"text":`\nPython 3.8.8 (${timeString})`, "delay":0, "instant":1},
        {"text":`\nType "help", "copyright", "credits" or "license" for more information.`, "delay":0, "instant":1},
        {"text":"\n>>> ", "delay":0, "instant":1},
        {"text":"", "delay":500, "instant":0},
        {"text":"\n>>> ", "delay":0, "instant":1},
        {"text":"", "delay":500, "instant":0},
        {"text":"class HelloWorld():", "delay":100, "instant":0},
        {"text":"", "delay":500, "instant":0},
        {"text":"\n... ", "delay":0, "instant":1},
        {"text":"", "delay":250, "instant":0},
        {"text":"    ", "delay":0, "instant":1},
        {"text":"", "delay":250, "instant":0},
        {"text":"def SayHello(self):", "delay":100, "instant":0},
        {"text":"", "delay":500, "instant":0},
        {"text":"\n... ", "delay":0, "instant":1},
        {"text":"", "delay":250, "instant":0},
        {"text":"        ", "delay":0, "instant":1},
        {"text":"", "delay":250, "instant":0},
        {"text":`self.stdout("World!")`, "delay":100, "instant":0},
        {"text":"", "delay":500, "instant":0},
        {"text":"\n... ", "delay":0, "instant":1},
        {"text":"", "delay":250, "instant":0},
        {"text":"    ", "delay":0, "instant":1},
        {"text":"def stdout(self, text):", "delay":100, "instant":0},
        {"text":"", "delay":500, "instant":0},
        {"text":"\n... ", "delay":0, "instant":1},
        {"text":"", "delay":250, "instant":0},
        {"text":"        ", "delay":0, "instant":1},
        {"text":"", "delay":250, "instant":0},
        {"text":`print(f"Hello, {text}")`, "delay":100, "instant":0},
        {"text":"", "delay":500, "instant":0},
        {"text":"\n... ", "delay":0, "instant":1},
        {"text":"", "delay":500, "instant":0},
        {"text":"\n>>> ", "delay":0, "instant":1},
        {"text":"", "delay":750, "instant":0},
        {"text":"\n>>> ", "delay":0, "instant":1},
        {"text":"", "delay":500, "instant":0},
        {"text":"HelloWorld().SayHello()", "delay":100, "instant":0},
        {"text":"", "delay":750, "instant":0},
        {"text":"\nHello, World!", "delay":0, "instant":1},
        {"text":"\n>>> ", "delay":0, "instant":1},
        {"text":"", "delay":750, "instant":0},
        {"text":"\n>>> ", "delay":0, "instant":1},
        {"text":"", "delay":1000, "instant":0},
        {"text":"quit()", "delay":100, "instant":0},
        {"text":"", "delay":1000, "instant":0},
        {"text":"\n\nC:\\USERS\\Pythonista> ", "delay":0, "instant":1},
        {"text":"", "delay":2000, "instant":0},
        {"text":"clear", "delay":100, "instant":0},
        {"text":"", "delay":2000, "instant":0},
    ]
    let work = function(now, idx){
        if(now == 0){
            animated.value = animateText[now]["text"];
            work(now+1, 0);
            return;
        }
        if(now == animateText.length){
            setTimeout(function(){work(0, 0)}, 1000);
            return;
        }

        if(animateText[now]["text"]==""){
            setTimeout(function(){work(now+1, 0)}, animateText[now]["delay"]);
        }else if(animateText[now]["instant"]){
            animated.value += animateText[now]["text"];
            work(now+1, 0);
        }else{
            setTimeout(function(){
                animated.value += animateText[now]["text"][idx];
                if(idx+1 < animateText[now]["text"].length){
                    work(now, idx+1);
                }else{
                    work(now+1, 0);
                }
            }, animateText[now]["delay"])
        }
    }
    work(0, 0);
}
