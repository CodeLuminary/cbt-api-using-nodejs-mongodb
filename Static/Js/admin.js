
import routes from "./router.js"

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
        target.classList.add("highlight");
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

    const view = new match.route.view(getParams(match));

    document.querySelector("#app").innerHTML = await view.getHtml();
    await view.loadHtmlEvent();

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

document.addEventListener("DOMContentLoaded", () => {
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
});