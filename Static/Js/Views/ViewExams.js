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
                <h1 class=""><i class="fa fa-laptop"></i>&nbsp;VIEW EXAMS</h1>
                <div style="padding:0px">
                    <table>
                        <tr>
                            <th>Exam Name</th>
                            <th>Exam Duration</th>
                            <th>Exam Instruction</th>
                            <th>Action</th>
                        </tr>
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
    async getCss(){
        return [];
    }
}