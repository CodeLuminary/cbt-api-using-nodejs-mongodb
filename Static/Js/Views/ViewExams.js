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
                    <td><a id="deleteExam" onclick="deleteExam(${value._id})">Delete</a><br>    
                        <a id="addQuestion" data-id="${value._id}">Add question</a><br>
                        <a href="/admin/view-exams/${value._id}" data-link>View question</a>
                    </td>
                </tr>
            `
        })
    }
    loadDataEvent(){
        //Load event for new data here
        const tag = document.getElementById("addQuestion"); 
        const viewQuestion = document.getElementById("viewQuestion");
        let dis = this;
        tag.onclick=function(){
            dis.addQuestion(tag.getAttribute("data-id"))
        }
        viewQuestion.onclick = function(){
            dis.viewQuestions(viewQuestion.getAttribute("data-id"));
        }
    }
    async viewOnloaded(){
        return await super.fetchApi('/all-exams','GET')   
    }
    addQuestion(id){
        const questionBody = `
            <div class="addUser">
                <span>Question<span class="require">*</span></span><br>
                <textarea id="question" rows="6" >Enter question</textarea><br>
                <button class="btn" id="addOption">Add Option</button>&nbsp;
                <div class="optionDiv">
                    <div class="mOptionDiv">
                        <span>1</span>
                        <input type="text"/>
                        <span>-</span>
                    </div>
                </div><br>
                <span>Answer Position<span class="require">*</span></span><br>
                <input class="myinp" id="answerPosition" type="number" placeholder="Enter answer position e.g 1 if option1 is correct" /><br>
                <button class="formButton" id="saveQuestion">Save Question</button>
            </div>
        `
        super.showModal(questionBody,"Add Question");
        document.getElementById("addOption").addEventListener('click',()=>{
            document.querySelector(".optionDiv").innerHTML += `
                <div class="mOptionDiv">
                    <span>1</span>
                    <input type="text"/>
                    <span>-</span>
                </div>
            `;

            const rewriteFirstSpan = () =>{
                const firstSpan = document.querySelectorAll(".mOptionDiv > span:first-child");
                for(let sp = 0; sp < firstSpan.length; sp++){
                    firstSpan[sp].innerHTML = (sp + 1).toString();
                }
            }

            rewriteFirstSpan();
            
            const lastSpan = document.querySelectorAll(".mOptionDiv > span:last-child");
            for(let sp = 0; sp < lastSpan.length; sp++){
                lastSpan[sp].addEventListener('click',()=>{
                    lastSpan[sp].parentElement.parentElement.removeChild(lastSpan[sp].parentElement);
                    rewriteFirstSpan();
                })
            }
        });

        document.getElementById("saveQuestion").onclick = ()=>{
            const question = {
                question: document.getElementById("question").value.replaceAll('\n','<br>'),
                answerPosition: Number(document.getElementById('answerPosition').value),
                options:[]
            }
            const options = document.querySelectorAll(".mOptionDiv input");
            for(let inp = 0; inp < options.length; inp++){
                question.options[inp] = options[inp].value;
            }

            const fullQuestion = {
                query: {
                    _id: id
                },
                data:{
                    questions: question
                }
            }

            super.fetchApi('/add-question','POST',fullQuestion)
            .then((data)=>{
                if(data.isSuccessful){
                    alert("Question added successully"); //You can replace this with modal
                }
                else{
                    alert("Action failed. Question could not be added");
                }
            })
        }
        
    }
    addOption(){alert("Great")
        
    }
    async getCss(){
        return [];
    }
}