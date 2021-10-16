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
    async getCss(){
        return [];
    }
    async fetchApi(url, methodType, isDomainUsed, reqObject){
        api.fetchApi(url,methodType, isDomainUsed, reqObject)
    }
}