/**
 *@file Customize selection list and make different countries reveal different citys.
 *@author liuna(na.luna@gamil.com)
 *
 */

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

init();
