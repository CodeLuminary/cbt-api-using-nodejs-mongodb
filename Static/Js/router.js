import Dashboard from "./Views/Dashboard.js";
import AddUser from "./Views/adduser.js";
import ViewUser from "./Views/ViewUser.js";
import AddExam from "./Views/AddExam.js";
import ViewExams from "./Views/ViewExams.js";
import ViewQuestions from "./Views/ViewQuestions.js"

const routes=[
    /* Put your routes here */
    { path: "/", view: Dashboard },
    { path: "/admin/add-user", view: AddUser, name: "AddUser"},
    { path: "/admin/view-user", view: ViewUser, name: "ViewUser" },
    { path: "/admin/add-exam", view: AddExam, name: "AddExam"},
    { path: "/admin/view-exams", view: ViewExams, name: "ViewExams"},
    { path: "/admin/view-exams/:id", view: ViewQuestions, name: "ViewQuestions"}
]

export default routes;