
import routes from "./router.js";
//import api from "./api.js";

const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

let assignedCssClass = "ind"

const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }));
};

const navigateTo = target => {

    //Add your navigation hightlighter here
    let navLink = document.querySelectorAll(".nav__link");
    for(let i = 0; i < navLink.length; i++){
        navLink[i].classList.remove("highlight");
    }
    if(target.matches("[data-link]")){
        let isEqual = false;
        const navA = document.querySelectorAll('.nav > a');
        navA.forEach(value=>{
            if(value.href === target.href){
                isEqual = true;
            }
        })
        if(isEqual){
            target.classList.add("highlight");
        }
        else{
            /*navA.forEach((value,index)=>{
                if(target.href.search(value.href) != -1 && index != 0){
                    target.classList.add("highlight");
                }
            })*/
            for(let x =1; x < navA.length; x++){
                const n = target.getAttribute("href").search(navA[x].getAttribute("href"));
                
                if(target.getAttribute("href").search(navA[x].getAttribute("href")) != -1){
                    navA[x].classList.add("highlight");
                    break;
                }
            }
        }
        history.pushState(null, null, target.href);
    }
    else{
        target.parentElement.classList.add("highlight");
        history.pushState(null, null, target.parentElement.href);
    }
    router(); //Calling router function
    //End of navigation highlighter
};

const router = async () => {
    
    // Test each route for potential match
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

    if (!match) {
        match = {
            route: routes[0],
            result: [location.pathname]
        };
    }

    const viewMatch = match.route.view;

    const view = new match.route.view(getParams(match));

    document.querySelector("#app").innerHTML = await view.getHtml();
    view.loadHtmlEvent();

    if(viewMatch.shouldLoadData){
        loadUI(view, viewMatch);
    }

    const css = await view.getCss();
    let clss = match.route.path.split('/')[1];
    if(clss.localeCompare('')==0){clss = "ind"}

    let head = document.querySelector("head");

    if(assignedCssClass.localeCompare(clss) != 0){ 
    let previousCss = document.querySelectorAll("head ." + assignedCssClass);
        for(let i = 0; i < previousCss.length; i++){
            previousCss[i].parentElement.removeChild(previousCss[i]);
        }
    }
    assignedCssClass = clss

    if(css.length > 0){
        let relatedCss = document.querySelectorAll("head ." + clss);
        for(let i = 0; i < relatedCss.length; i++){
            relatedCss[i].parentElement.removeChild(relatedCss[i]);
        }
     
        for(let i = 0; i < css.length; i++){
           let link = document.createElement("link");
            link.setAttribute("rel","stylesheet");link.setAttribute("class", clss);link.setAttribute("type","text/css");link.setAttribute("href",css[i]);
            head.appendChild(link)
        }
    }
};

window.addEventListener("popstate", router);

const loadUI = (view, viewMatch) =>{
    try{
        view.loadData(viewMatch.viewData);
        view.loadDataEvent();
    }
    catch(e){}
}

const getContent = async (value,index) =>{
    value.view.setViewClass(value,index);
    if(value.view.shouldLoadData){
        value.view.viewData =  await new value.view().viewOnloaded();
            loadUI(new value.view(), value.view);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    if(localStorage.getItem("token") == null || localStorage.getItem("token")==undefined){
        location.href = "/login"
    }
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]") || e.target.parentElement.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target);
        }
    });

    router();

    //Highlight link when page loads
    let navLink = document.querySelectorAll(".nav__link");
    for(let i = 0; i < navLink.length; i++){
        if(navLink[i].getAttribute("href") === location.pathname){
            navLink[i].classList.add("highlight")
        }
    }

    //Event listener for close & open navigation
    const navLinks = document.querySelectorAll(".nav__link > span:last-child"); //Make sure the query selection follows the structure of your index.html page
    const clos = document.getElementById("clos");
    const opn = document.getElementById("opn");
    const root = document.querySelector(':root');
    document.getElementById("clos").addEventListener("click",()=>{
        for(let k = 0; k < navLinks.length; k++){
            navLinks[k].style.display = "none";
        }
        clos.style.display="none";
        opn.style.display="inline-block";
        root.style.setProperty('--nav-width',"50px")
    })
    document.getElementById("opn").addEventListener("click",()=>{
        for(let k = 0; k < navLinks.length; k++){
            navLinks[k].style.display = "inline";
        }
        clos.style.display="inline-block";
        opn.style.display="none";
        root.style.setProperty('--nav-width',"200px")
    })
    //This is for lazy loading of data from server
    routes.forEach(getContent);

    //Modal event
    const closeModal = document.querySelector("#myModal .close");
    const modal = document.getElementById("myModal");
    closeModal.onclick = () =>{
        modal.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
    }

});