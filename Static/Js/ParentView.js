import api from './api.js';

export default class {
    constructor(argument) {
        this.argument = argument;
    }

    setTitle(title) {
        document.title = title;
    }

    async getHtml() {
        return "";
    }
    async loadHtmlEvent(){
        
    }
    viewOnloaded(){
        
    }
    async getCss(){
        return [];
    }
    async fetchApi(url, methodType,reqObject, isDomainUsed){
        return api.fetchApi(url,methodType, reqObject, isDomainUsed).then((response) => {return response.json();});   
    }
}