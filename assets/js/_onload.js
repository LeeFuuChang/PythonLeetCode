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
        `/account/get`,
        {method:"GET"}
    ).then(res => {
        return res.json();
    }).then(res => {
        result = res;
        func(res["user_data"]);
    })
    return result;
}