function subnav() {
    if(event.target.children.length != 0) {
        event.target.children[1].style.visibility = "visible";
    }
}

function hidsubnav() {
    if(event.target.children.length != 0) {
        event.target.children[1].style.visibility = "hidden";
    }
}

function init(){
    document.getElementById("nav").onmouseover = subnav;
    var navChi = document.getElementById("nav").children;
    for(var i = 0; i < navChi.length; i++) {
         navChi[i].onmouseout = hidsubnav;
    }
}

init();
