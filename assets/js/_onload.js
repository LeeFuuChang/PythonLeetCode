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