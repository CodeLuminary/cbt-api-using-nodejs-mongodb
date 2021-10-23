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
                        <input id="name" type="text" placeholder="Enter exam name" /><br>
                        <span>Exam Duration(in minutes)<span class="require">*</span></span><br>
                        <input id="duration" type="number" placeholder="Enter exam duration" /><br>
                        <span>Exam Instructions<span class="require">*</span></span><br>
                        <textarea id="instruction" rows="6" >Enter exam instructions</textarea><br>
                        <button class="formButton" id="btn">Save</button>
                    </div>
                </div>
            </div>
        `;
    }
    async loadHtmlEvent(){
           document.getElementById("btn").addEventListener("click",this.addExam);
    }
    addExam(){
        const exam = {
            name: document.getElementById("name").value,
            duration: Number(document.getElementById("duration").value),
            instruction: document.getElementById("instruction").value.replaceAll('\n','<br>')
        }

        super.fetchApi('/add-exam','POST',exam)
        .then((data)=>{
            if(data.isSuccessful){
                alert("Exam added successully"); //You can replace this with modal
                console.log(data.data)
            }
            else{
                alert("Action failed. Exam could not be added");
            }
        })
    }
    async getCss(){
        return [];
    }
}