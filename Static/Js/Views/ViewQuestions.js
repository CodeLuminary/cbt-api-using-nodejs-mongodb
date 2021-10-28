import ParentView from "../ParentView.js";

export default class extends ParentView {
    static shouldLoadData =false;
    static viewData = undefined;

    constructor(argument) {
        super(argument);
        this.questionId = argument.id;
        this.setTitle("Cbt Admin - View Exam Questions");
    }

    async getHtml() {
        return `
        <div class="backDiv"><a href="/admin/view-exams" id="back" data-link>Back</a></div>
        <div class="addUserDiv col-2">
            <div>
                <h1 class=""><i class="fa fa-laptop"></i>&nbsp;VIEW EXAM QUESTIONS</h1>
                <div style="padding:0px">
                    <table id="examsTable2">
                        <thead>
                            <tr>
                                <th>Question</th>
                                <th>Options</th>
                                <th>Answer Id</th>
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
            let examsTable = document.querySelector("#examsTable2 tbody");
            //const data = this.questionId
            const examData = ParentView.getViewData("ViewExams")[this.questionId];
            //const data = examData[this.questionId]
            const data = examData.questions;
            data.forEach((value,key)=>{
                let options = "";
                 value.options.forEach((value,key)=>{
                    options += "(" + (key +1).toString() + ") " + value + "<br>";
                })
                examsTable.innerHTML += `<tr>
                        <td>${value.question}</td>
                        <td>
                            ${options}
                        </td>
                        <td>${value.answerPosition}</td>
                        <td><a class="deleteQuestion" data-id="${key})">Delete</a><br>
                        </td>
                    </tr>
                `;
            });
            let dis = this;
            const delQues = document.querySelectorAll(".deleteQuestion");
            for(let i=0; i < delQues.length; i++){
                delQues[i].onclick=function(){
                    dis.deleteQuestions(delQues[i].getAttribute("data-id"),examData);
                }
            }
            console.log(examData.questions.slice(1,1));
    }
    loadData(data){
        let examsTable = document.querySelector("#examsTable tbody");
        data.forEach((value)=>{
            examsTable.innerHTML += `<tr>
                    <td>${value.question}</td>
                    <td>${value.option}
                    
                    </td>
                    <td>${value.answerPosition}</td>
                    <td><a id="deleteExam" onclick="deleteExam(${value._id})">Delete</a><br>    
                        <a id="addQuestion" data-id="${value._id}">Add question</a><br>
                        <a id="viewQuestion" data-id="${value._id}">View question</a>
                    </td>
                </tr>
            `
        })
    }
    loadDataEvent(){
        //Load event for new data here
        const deleteQuestion = document.getElementById("viewQuestion");
        
        let dis = this;
        
        deleteQuestion.onclick = function(){
            dis.viewQuestions(viewQuestion.getAttribute("data-id"));
        }
    }
    async viewOnloaded(){
        //return await super.fetchApi('/all-exams','GET')   
    }
    deleteQuestions(question,examId){
        const examQuestion = {
            questionPosition: question,
            id: examId._id,
            examId: {questions:examId.questions}
        }
        super.fetchApi('/delete-question','POST',examQuestion)
        .then((data)=>{
            if(data.isSuccessful){
                alert("question deleted successully"); //You can replace this with modal
                ParentView.updateUI('ViewExams',data.data);
                //location.reload()
            }
            else{
                alert("Action failed. Question could not be deleted");
            }
        })
        
    }
    async getCss(){
        return [];
    }
}