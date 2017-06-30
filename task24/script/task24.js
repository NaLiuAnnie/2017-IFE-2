/**
 *@file Use JavaScript to reveal scroll.
 *@author liuna(na.luna@gamil.com)
 *
 */

function onScroll() {
    document.getElementsByClassName("l-nav")[0].style.height = window.innerHeight - document.getElementsByClassName("l-nav")[0].getBoundingClientRect().top + "px";
    if(document.getElementsByClassName("r-table")[0].getBoundingClientRect().top < 0) {
        document.getElementById("table-h").style.position = "fixed";
    }else {
        document.getElementById("table-h").style.position = "absolute";
    }
}

function init() {
    document.getElementsByClassName("l-nav")[0].style.height = window.innerHeight - document.getElementsByClassName("l-nav")[0].getBoundingClientRect().top + "px";
    window.onscroll = onScroll;
}

init();
