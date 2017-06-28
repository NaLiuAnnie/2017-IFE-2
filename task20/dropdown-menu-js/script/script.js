/**
 *@file Use JavaScript to reveal the drop down list in navigation.
 *@author liuna(na.luna@gamil.com)
 *
 */

//Reveal the list when mouse over the element.
function revealList() {
    if(event.target.children.length != 0) {
        event.target.children[1].style.visibility = "visible";
    }
}

//Hide the list when mouse out the element.
function hiddenList() {
    if(event.target.children.length != 0) {
        event.target.children[1].style.visibility = "hidden";
    }
}

//Binding events
function init(){
    document.getElementById("nav").addEventListener("click",revealList);
    var navChi = document.getElementById("nav").children;
    for(var i = 0; i < navChi.length; i++) {
         navChi[i].addEventListener("mouseout", hiddenList);
    }
}

init();
