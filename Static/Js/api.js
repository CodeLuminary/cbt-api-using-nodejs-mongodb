export default class restApi{
    //Set domain name here
    static domain = "";
    static fetchApi(url, methodType, reqObject, isDomainUsed=true){
        let mainUrl;
        if(isDomainUsed){
            mainUrl = this.domain + url;
        }
        else{
            mainUrl = url;
        }
        return fetch(mainUrl, {
        method: methodType,
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Authorization': "Bearer " + localStorage.getItem("token"),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqObject)
        });
    }
}