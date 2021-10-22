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
                <h1 class=""><i class="fa fa-users"></i>&nbsp;VIEW USERS</h1>
                <div style="padding:0px">
                    <table id="usersTable">
                        <thead>
                            <tr>
                                <th>User Fullname</th>
                                <th>User Email</th>
                                <th>User Password</th>
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
    }
    loadData(data){
        console.log(data,"datanew")
        let usersTable = document.querySelector("#usersTable tbody");
        data.forEach((value)=>{
            usersTable.innerHTML += `<tr>
                    <td>${value.name}</td>
                    <td>${value.email}</td>
                    <td>${value.password}</td>
                    <td><button onclick="deleteUser(${value._id})">Delete</button></td>
                </tr>
            `
        })
    }
    async viewOnloaded(){
        return await super.fetchApi('/all-users','GET')   
    }
    async getCss(){
        return [];
    }
}