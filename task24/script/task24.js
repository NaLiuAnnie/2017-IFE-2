/**
 *@file Use JavaScript to reveal scroll.
 *@author liuna(na.luna@gamil.com)
 *
 */

var lNav = document.getElementsByClassName("l-nav")[0];
var Rtable = document.getElementsByClassName("r-table")[0];
var tableH = document.getElementById("table-h");
var tableSubH = tableH.nextElementSibling;

//When a box's position is changed to fixed, It's width will different from other, set it's width same to others.
function setWidth() {
    for(var i = 0; i < tableH.children.length; i++) {
        tableH.children[i].style.width = window.getComputedStyle(tableSubH.children[i]).width;    
    }
}

function onScroll() {
    lNav.style.height = window.innerHeight - lNav.getBoundingClientRect().top + "px";
    if(Rtable.getBoundingClientRect().top < 0) {
        tableH.style.position = "fixed";
        setWidth();
    }else {
        tableH.style.position = "relative";
    }
}

function init() {
    lNav.style.height = window.innerHeight - lNav.getBoundingClientRect().top + "px";
    setWidth();
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onScroll);
}

init();
