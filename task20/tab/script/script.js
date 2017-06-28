/**
 *@file Make tab clickable.
 *@author liuna(na.luna@gamil.com)
 *
 */

//Change tab title and tab content when click a tab.
function tabClick() {
    var tabTitle = document.getElementById("tab-title").children;
    var index = event.target.getAttribute("data-index");
    var tabChi = document.getElementById("tab-content").children;
    for(var i = 0; i < tabChi.length; i++) {
       if(i != index) {
           tabChi[i].style.visibility = "hidden";
           tabTitle[i].setAttribute("class", "unchecked-tab");
       }else {
           tabChi[i].style.visibility = "visible";
           tabTitle[i].setAttribute("class", "checked-tab");
       }
    }
}

//Binding events
function init(){
    document.getElementById("tab-title").addEventListener("click",tabClick);
}

init();
