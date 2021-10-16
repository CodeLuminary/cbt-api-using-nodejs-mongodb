import ParentView from "../ParentView.js";

export default class extends ParentView {
    constructor(argument) {
        super(argument);
        this.setTitle("Cbt Admin - Add user");
    }

    async getHtml() {
        return `
            <div class="addUserDiv col-2">
                <div>
                    <h1 class=""><i class="fa fa-user"></i>&nbsp;ADD USER</h1>
                    <div>
                        <span>User Fullname<span class="require">*</span></span><br>
                        <input type="text" placeholder="Enter user full name" /><br>
                        <span>User Email<span class="require">*</span></span><br>
                        <input type="email" placeholder="Enter user email" /><br>
                        <span>User Password<span class="require">*</span></span><br>
                        <input type="password" placeholder="Enter user password" /><br>
                        <button>Save</button>
                    </div>
                </div>
            </div>
        `;
    }
    async loadHtmlEvent(){
            //Add Event listeners here
           document.getElementById("btn").addEventListener("click",this.showAlert);
           //or you can use arrow function like this
           /*
             document.getElementById("btn").addEventListener("click", () =>{
                alert("Button click event is working");
             });
            */

    }
    showAlert(){
        alert("Button click event is working");
    }
    async getCss(){
        return [`/Static/Css/app.css`];
    }
}