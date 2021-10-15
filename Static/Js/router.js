import Dashboard from "./Views/Dashboard.js";
import AddUser from "./Views/adduser.js";
import PostView from "./Views/ViewUser.js";

const routes=[
    /* Put your routes here */
    { path: "/", view: Dashboard },
    { path: "/add-user", view: AddUser},
    { path: "/view-user", view: PostView },
]

export default routes;