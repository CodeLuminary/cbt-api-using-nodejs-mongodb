import ParentView from "../ParentView.js";

export default class extends ParentView {
    constructor(argument) {
        super(argument);
        this.setTitle("User Dashboard");
    }

    async getHtml() {
        return `
            <h1>Welcome developer</h1>
            <p>
                This is a single page application by Ijoni Victor
            </p>
            <p>
                <a href="/admin/add-user/2" data-link>View recent posts</a>.
            </p>
        `;
    }
    async getCss(){
        return [];
    }
}