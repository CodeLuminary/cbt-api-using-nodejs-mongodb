import api from './api.js';

export default class {
    static viewArray = []
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
    showModal(body, head=""){
        const modal = document.getElementById("myModal");
        const modalHead = document.querySelector("#myModal .modal-header h3");
        const modalBody = document.querySelector("#myModal .modal-body");

        modalHead.innerHTML = head; modalBody.innerHTML = body;
        modal.style.display = "block";
    }
    static setViewClass(viewClass,pos){
        this.viewArray[pos] = viewClass;
    }
    static updateUI(viewName, viewData){ 
        for(let i =0; i < this.viewArray.length; i++){ 
            if(this.viewArray[i].name===viewName){
                this.viewArray[i].view.viewData = viewData;
                break;
            }
        }
    }
}