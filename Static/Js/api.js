export default class restApi{
    //Set domain name here
    static domain = "";
    static async fetchApi(url, methodType, isDomainUsed=true, reqObject){
        let mainUrl;
        if(isDomainUsed){
            mainUrl = domain + url;
        }
        else{
            mainUrl = url;
        }
        fetch(mainUrl, {
        method: methodType,
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqObject)
        }).then(response => {
                response.json();       
        }).then(data => {
            alert(data);
            //Get data here
            return data;
        })
        .catch((err)=> err);
    }
}