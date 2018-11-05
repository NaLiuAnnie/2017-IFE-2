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

//Happens when click a city.
function selectCity() {
    document.getElementById("select-city").children[0].innerText = event.target.innerText;
   document.getElementById("city-option").style.visibility = "hidden";
}

//Let city list visible.
function getCityVisible() {
   document.getElementById("city-option").style.visibility = "visible";
}

//Let country list visible.
function getCountryVisible() {
    document.getElementById("country-option").style.visibility = "visible";
}

//Linkage the country select area and city select area.
function selectCountry() {
    var city = [["无"],["北京","上海","广州"],["洛杉矶","纽约","旧金山"],["伦敦","利物浦","曼彻斯特"]];
    var index = event.target.getAttribute("data-index");
    var cityOption = document.getElementById("city-option");
    cityOption.innerHTML = null;
    for(var i = 0; i < city[index].length; i++) {
        var cityDiv = document.createElement("div");
        var cityName = document.createTextNode(city[index][i]);
        cityDiv.appendChild(cityName);
        cityOption.appendChild(cityDiv);
    }
    document.getElementById("country-option").style.visibility = "hidden";
    document.getElementById("select-country").children[0].innerHTML = event.target.innerHTML;
    return;
}
//Binding events
function init(){
    document.getElementById("select-country").children[0].addEventListener("click",getCountryVisible);
    document.getElementById("country-option").addEventListener("click",selectCountry);
    document.getElementById("select-city").children[0].addEventListener("click",getCityVisible);
    document.getElementById("city-option").addEventListener("click",selectCity);
}

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
