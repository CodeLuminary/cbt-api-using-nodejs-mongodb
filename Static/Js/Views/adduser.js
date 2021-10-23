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
                        <input id="name" type="text" placeholder="Enter user full name" /><br>
                        <span>User Email<span class="require">*</span></span><br>
                        <input id="email" type="email" placeholder="Enter user email" /><br>
                        <span>User Password<span class="require">*</span></span><br>
                        <input id="password" type="password" placeholder="Enter user password" /><br>
                        <button class="formButton" id="btn">Save</button>
                    </div>
                </div>
            </div>
        `;
    }
    async loadHtmlEvent(){
            //Add Event listeners here
           document.getElementById("btn").addEventListener("click",this.saveUser);
    }
    saveUser(){
        const user = {
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
            name: document.getElementById("name").value,
        }
        super.fetchApi('/add-user','POST',user)
        .then((data)=>{
            if(data.isSuccessful){
                alert("User added successully"); //You can replace this with modal
                console.log(data.data);
                ParentView.updateUI("ViewUser",data.data);
            }
            else{
                alert("Action failed. User could not be added");
            }
        })
    }
    viewOnloaded(){

    }
    async getCss(){
        return [];
    }
}