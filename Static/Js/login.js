function submitForm(){
    const user = {
        query:{email: document.getElementById("email").value,
        password: document.getElementById("password").value}
    }
    fetchApi('/loginuser','POST',user)
    .then(result => result.json())
    .then((data)=>{
        if(data.isSuccessful){
            localStorage.setItem("token", data.token);
            location.href = "/admin";
        }
        else{
            alert("Action failed. User could not be added");
        }
    });
    return false;
} 
let domain = "";
function fetchApi(url, methodType, reqObject, isDomainUsed=true){
    let mainUrl;
    if(isDomainUsed){
        mainUrl = domain + url;
    }
    else{
        mainUrl = url;
    }
    return fetch(mainUrl, {
    method: methodType,
    mode: 'cors',
    cache: 'no-cache',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(reqObject)
    });
} 