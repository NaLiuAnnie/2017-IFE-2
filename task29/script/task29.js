/**
 *@file Use JavaScript to reveal scroll.
 *@author liuna(na.luna@gamil.com)
 *
 */

var lNav = document.getElementsByClassName('l-nav')[0];
var Rtable = document.getElementsByClassName("r-table")[0];
var index;

function cancleDelete() {
    document.getElementById('delete-table').style.display = 'none';
    event.preventDefault();
    document.body.style.overflow = 'scroll';
}

function cancleModify() {
    document.getElementById('edit-table').style.display = 'none';
    event.preventDefault();
    document.body.style.overflow = 'scroll';
}

function conformDelete() {
    var currentTableData = JSON.parse(sessionStorage.tableData);
    currentTableData.splice(index,1); 
    loadTable(currentTableData); 
    window.sessionStorage.setItem('tableData', JSON.stringify(currentTableData)); 
    document.getElementById('delete-table').style.display = 'none';
    event.preventDefault();
    document.body.style.overflow = 'scroll';
}

function conformModify() {
    var currentTableData = JSON.parse(sessionStorage.tableData);
    var dataId = document.getElementById('newName').value;
    var dataName = document.getElementById('newContent').value;
    var dataContent = document.getElementById('newValue').value;
    currentTableData[index].id = dataId;
    currentTableData[index].name = dataName;
    currentTableData[index].content = dataContent;
    loadTable(currentTableData);
    sessionStorage.clear();
    window.sessionStorage.setItem('tableData', JSON.stringify(currentTableData));
    document.getElementById('edit-table').style.display = 'none'; 
    event.preventDefault();
    document.body.style.overflow = 'scroll';
}

function editTable(){
    var parent = event.target.parentNode.parentNode;
    index = parent.getAttribute('data-index');
    document.getElementById('edit-table').style.display = 'flex';
    document.body.style.overflow = 'hidden';
    document.getElementById('newName').value = parent.children[0].innerText;
    document.getElementById('newContent').value = parent.children[1].innerText;
    document.getElementById('newValue').value = parent.children[2].innerText;
}

function deleteTable(){
    var parent = event.target.parentNode.parentNode;
    index = parent.getAttribute('data-index');
    document.getElementById('delete-table').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function loadTable(data) {
    Rtable.innerHTML = '<tr id=\"table-h\"><th>TableHead</th><th>TableHead</th><th>Head</th><th>TableHead</th></tr>'
    var tabLength = data.length;
    for(var i = 0; i < tabLength; i++) {
        var trNode = document.createElement('TR');
        var tdIdNode = document.createElement('TD');
        var idText = document.createTextNode(data[i].id);
        tdIdNode.appendChild(idText);
        trNode.appendChild(tdIdNode);
        var tdNameNode = document.createElement('TD');
        var nameText = document.createTextNode(data[i].name);
        tdNameNode.appendChild(nameText);
        trNode.appendChild(tdNameNode);
        var tdContentNode = document.createElement('TD');
        var contentText = document.createTextNode(data[i].content);
        tdContentNode.appendChild(contentText);
        trNode.appendChild(tdContentNode);
        var tdValNode = document.createElement('TD');
        tdValNode.innerHTML = '<td><button type=\"button\">' + data[i].value[0] + '</button><button type=\"button\">' +data[i].value[1] + '</button></td>'
        tdValNode.children[0].addEventListener('click', editTable);
        tdValNode.children[1].addEventListener('click', deleteTable);
        trNode.appendChild(tdValNode);
        if(i % 2 == 1) {
            trNode.setAttribute('class', 'dark-r');
        }
        trNode.setAttribute('data-index', i);
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
function setWidth() {
    if(document.getElementById("table-h")){
        for(var i = 0; i < document.getElementById("table-h").children.length; i++) {
            document.getElementById("table-h").children[i].style.width = window.getComputedStyle(document.getElementById("table-h").parentNode.nextElementSibling.children[i]).width;    
        }
    }
}

function onScroll() {
    lNav.style.height = window.innerHeight - lNav.getBoundingClientRect().top + "px";
    if(Rtable.getBoundingClientRect().top < 0 && document.getElementById("table-h")) {
        document.getElementById("table-h").style.position = "fixed";
        setWidth();
    }else if(Rtable.getBoundingClientRect().top > 0 && document.getElementById("table-h")) {
        document.getElementById("table-h").style.position = "relative";
    }
}

window.onload = function() {
    lNav.style.height = window.innerHeight - lNav.getBoundingClientRect().top + "px";
    setWidth();
    document.body.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onScroll);
    window.sessionStorage.setItem('tableData', JSON.stringify(tableData));
    loadTableNav();
    loadTable(tableData);
    document.getElementById('conform-modify').addEventListener('click', conformModify);
    document.getElementById('conform-delete').addEventListener('click', conformDelete);
    document.getElementById('cancle-modify').addEventListener('click', cancleModify);
    document.getElementById('cancle-delete').addEventListener('click', cancleDelete);
};
