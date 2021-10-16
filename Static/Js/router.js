import Dashboard from "./Views/Dashboard.js";
import AddUser from "./Views/adduser.js";
import PostView from "./Views/ViewUser.js";
import AddExam from "./Views/AddExam.js";
import ViewExams from "./Views/ViewExams.js";

const routes=[
    /* Put your routes here */
    { path: "/", view: Dashboard },
    { path: "/admin/add-user", view: AddUser},
    { path: "/admin/view-user", view: PostView },
    { path: "/admin/add-exam", view: AddExam},
    { path: "/admin/view-exams", view: ViewExams}
]

export default routes;