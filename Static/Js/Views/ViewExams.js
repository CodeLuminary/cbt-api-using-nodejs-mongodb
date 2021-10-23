import ParentView from "../ParentView.js";

export default class extends ParentView {
    static shouldLoadData = true;
    static viewData = undefined;

    constructor(argument) {
        super(argument);
        this.setTitle("Cbt Admin - Add Exam");
    }

    async getHtml() {
        return `
        <div class="addUserDiv col-2">
            <div>
                <h1 class=""><i class="fa fa-laptop"></i>&nbsp;VIEW EXAMS</h1>
                <div style="padding:0px">
                    <table id="examsTable">
                        <thead>
                            <tr>
                                <th>Exam Name</th>
                                <th>Exam Duration</th>
                                <th>Exam Instruction</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        `;
    }
    async loadHtmlEvent(){
            //Add Event listeners here
           document.getElementById("btn").addEventListener("click",this.showAlert);
    }
    showAlert(){
        alert("Button click event is working");
    }
    async loadHtmlEvent(){
    }
    loadData(data){
        let examsTable = document.querySelector("#examsTable tbody");
        data.forEach((value)=>{
            examsTable.innerHTML += `<tr>
                    <td>${value.name}</td>
                    <td>${value.duration}</td>
                    <td>${value.instruction}</td>
                    <td><a onclick="deleteUser(${value._id})">Delete</a><br>
                        <a onclick="addQuestion(${value._id})>Add question<a><br>
                    </td>
                </tr>
            `
        })
    }
    async viewOnloaded(){
        return await super.fetchApi('/all-exams','GET')   
    }
    async getCss(){
        return [];
    }
}