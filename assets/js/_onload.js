var USER = {
    "login":false,
    "user_data":undefined
}

function getNow(){
    let TIMER = new Date();
    let Year = TIMER.getFullYear().toString().padStart(4, "0");
    let Month = (TIMER.getMonth()+1).toString().padStart(2, "0");
    let Dat = TIMER.getDate().toString().padStart(2, "0");
    let Hour = TIMER.getHours().toString().padStart(2, "0");
    let Min = TIMER.getMinutes().toString().padStart(2, "0");
    return `${Year}/${Month}/${Dat} ${Hour}:${Min}`;
}

function ReplaceAll(_string, replacing, replacement){
    let idx = 0;
    let string = _string;
    do{
        idx = string.indexOf(replacing);
        if(idx<0 || idx>=string.length)break;
        string = string.replace(replacing, replacement);
    }while(idx >= 0 || idx < string.length);
    return string;
}

async function GetIPLoginAccount(func){
    let result;
    await fetch(
        `/account/get?get=iplogin`,
        {method:"GET"}
    ).then(res => {
        return res.json();
    }).then(res => {
        result = res;
        func(res["user_data"]);
    })
    return result;
}