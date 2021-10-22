import ParentView from "../ParentView.js";

export default class extends ParentView {
    constructor(argument) {
        super(argument);
        this.setTitle("Cbt Admin - Add Exam");
    }

    async getHtml() {
        return `
            <div class="addUserDiv col-2">
                <div>
                    <h1 class=""><i class="fa fa-plus-square"></i>&nbsp;ADD EXAM</h1>
                    <div>
                        <span>Exam name<span class="require">*</span></span><br>
                        <input type="text" placeholder="Enter exam name" /><br>
                        <span>Exam Duration(in minutes)<span class="require">*</span></span><br>
                        <input type="email" placeholder="Enter exam duration" /><br>
                        <span>Exam Instructions<span class="require">*</span></span><br>
                        <textarea rows="6" >Enter exam instructions</textarea><br>
                        <button class="formButton" id="btn">Save</button>
                    </div>
                </div>
            </div>
        `;
    }
    async loadHtmlEvent(){
           document.getElementById("btn").addEventListener("click",this.showAlert);

    }
    showAlert(){
        alert("Button click event is working");
    }
    async getCss(){
        return [];
    }
}