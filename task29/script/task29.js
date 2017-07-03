/**
 *@file Use JavaScript to reveal scroll.
 *@author liuna(na.luna@gamil.com)
 *
 */

var lNav = document.getElementsByClassName('l-nav')[0];
var Rtable = document.getElementsByClassName("r-table")[0];
//var tableH = document.getElementById("table-h");
//var tableSubH = tableH.nextElementSibling;

function stopScroll(){
    event.preventDefault();
}

function editTable(){
    document.getElementById('edit-table').style.display = 'flex';
}

function deleteTable(){}

function loadTable() {
    Rtable.innerHTML = '<tr id=\"table-h\"><th>TableHead</th><th>TableHead</th><th>Head</th><th>TableHead</th></tr>'
    var tabLength = tableData.length;
    for(var i = 0; i < tableData.length; i++) {
        var trNode = document.createElement('TR');
        var tdIdNode = document.createElement('TD');
        var idText = document.createTextNode(tableData[i].id);
        tdIdNode.appendChild(idText);
        trNode.appendChild(tdIdNode);
        var tdNameNode = document.createElement('TD');
        var nameText = document.createTextNode(tableData[i].name);
        tdNameNode.appendChild(nameText);
        trNode.appendChild(tdNameNode);
        var tdContentNode = document.createElement('TD');
        var contentText = document.createTextNode(tableData[i].content);
        tdContentNode.appendChild(contentText);
        trNode.appendChild(tdContentNode);
        var tdValNode = document.createElement('TD');
        tdValNode.innerHTML = '<td><button type=\"button\">' + tableData[i].value[0] + '</button><button type=\"button\">' +tableData[i].value[1] + '</button></td>'
        tdValNode.children[0].addEventListener('click', editTable);
        tdValNode.children[1].addEventListener('click', deleteTable);
        trNode.appendChild(tdValNode);
        if(i % 2 == 1) {
            trNode.setAttribute('class', 'dark-r');
        }
        Rtable.appendChild(trNode);
    }
}

function showSubNav(){
    if(event.target.nextElementSibling != null && event.target.nextElementSibling.getAttribute('class') == 'l-l2-nav') {
        if(event.target.nextElementSibling.style.display == 'none') {
            event.target.nextElementSibling.style.display = 'block';   
        }else {
            event.target.nextElementSibling.style.display = 'none';
        }
    }
}

function loadTableNav(){
    var navLength = tableNavData.length;
    lNav.innerHTML = null;
    for(var i = 0; i < navLength-1; i++) {
        if(typeof tableNavData[i] == 'string') {
            var pNode = document.createElement('P');
            var textNode = document.createTextNode(tableNavData[i]);
            pNode.appendChild(textNode);
            pNode.addEventListener('click', showSubNav);
            pNode.setAttribute("class", "l-l1-nav");
            lNav.appendChild(pNode);
        }else if (typeof tableNavData[i] == 'object') {
            var subLength = tableNavData[i].length;
            var divNode = document.createElement('div');
            for(var j = 0; j < subLength; j++) {
                var subpNode = document.createElement('P');
                var subtextNode = document.createTextNode(tableNavData[i][j]);
                subpNode.appendChild(subtextNode);
                divNode.appendChild(subpNode);
            }
            divNode.setAttribute('class', 'l-l2-nav');
            divNode.setAttribute('style', 'display: none');
            lNav.appendChild(divNode);
        }
    }   
}

//When a box's position is changed to fixed, It's width will different from other, set it's width same to others.
//function setWidth() {
//    for(var i = 0; i < tableH.children.length; i++) {
//        tableH.children[i].style.width = window.getComputedStyle(tableSubH.children[i]).width;    
//    }
//}

//function onScroll() {
//    lNav.style.height = window.innerHeight - lNav.getBoundingClientRect().top + "px";
//    if(Rtable.getBoundingClientRect().top < 0) {
//        tableH.style.position = "fixed";
//        setWidth();
//    }else {
//        tableH.style.position = "relative";
//    }
//}

function init() {
//    lNav.style.height = window.innerHeight - lNav.getBoundingClientRect().top + "px";
//    setWidth();
//    window.addEventListener("scroll", onScroll);
//    window.addEventListener("resize", onScroll);
    loadTableNav();
    loadTable();
    document.getElementById('edit-table').addEventListener('scroll', stopScroll);
}

init();
