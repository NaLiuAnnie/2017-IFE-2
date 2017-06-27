function selectCity() {
    document.getElementById("select-city").children[0].innerText = event.target.innerText;
   document.getElementById("city-option").style.visibility = "hidden";
}

function cityVisible() {
   document.getElementById("city-option").style.visibility = "visible";
}

function countryVisible() {
    document.getElementById("country-option").style.visibility = "visible";
}

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

function init(){
    document.getElementById("select-country").children[0].onclick = countryVisible;
    document.getElementById("country-option").onclick = selectCountry;
    document.getElementById("select-city").children[0].onclick = cityVisible;
    document.getElementById("city-option").onclick = selectCity;
}

init();
