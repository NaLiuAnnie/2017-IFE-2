/**
 *@file Use JavaScript to reveal scroll.
 *@author liuna(na.luna@gamil.com)
 *
 */

var lNav = document.getElementsByClassName('l-nav')[0];
var Rtable = document.getElementsByClassName("r-table")[0];
var index;

//确定点击的是删除还是编辑按钮
function editRow() {
    if(event.target.innerText == '编辑') {
        editTable();
    }else {
        deleteTable();
    }
}

//取消删除
function cancleDelete() {
    document.getElementById('delete-table').style.display = 'none';
    event.preventDefault();
    document.body.style.overflow = 'scroll';
}

//取消编辑
function cancleModify() {
    document.getElementById('edit-table').style.display = 'none';
    event.preventDefault();
    document.body.style.overflow = 'scroll';
}

//确认删除
function conformDelete() {
    var currentTableData = JSON.parse(sessionStorage.tableData);
    currentTableData.splice(index,1); 
    loadTable(currentTableData); 
    window.sessionStorage.setItem('tableData', JSON.stringify(currentTableData)); 
    document.getElementById('delete-table').style.display = 'none';
    event.preventDefault();
    document.body.style.overflow = 'scroll';
}

//确认修改
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

//点击编辑按钮触发此事件
function editTable(){
    var parent = event.target.parentNode.parentNode;
    index = parent.getAttribute('data-index');
    document.getElementById('edit-table').style.display = 'flex';
    document.body.style.overflow = 'hidden';
    document.getElementById('newName').value = parent.children[0].innerText;
    document.getElementById('newContent').value = parent.children[1].innerText;
    document.getElementById('newValue').value = parent.children[2].innerText;
}

//点击删除按钮触发此事件
function deleteTable(){
    var parent = event.target.parentNode.parentNode;
    index = parent.getAttribute('data-index');
    document.getElementById('delete-table').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

//加载右侧表格
function loadTable(data) {
    Rtable.innerHTML = ''
                     + '<tr id=\"table-h\">'
                     +     '<th>TableHead</th>'
                     +     '<th>TableHead</th>'
                     +     '<th>Head</th>'
                     +     '<th>TableHead</th>'
                     + '</tr>'
    var tabLength = data.length;
    for(var i = 0; i < tabLength; i++) {
        var trNode = document.createElement('TR');
        trNode.innerHTML += ''
                         +  '<td>' +  data[i].id + '</td>'
                         +  '<td>' +  data[i].name + '</td>'
                         +  '<td>' +  data[i].content + '</td>' 
                         +  '<td>'
                         +    '<button type=\"button\">'
                         +    data[i].value[0]
                         +    '</button>'
                         +    '<button type=\"button\">'
                         +    data[i].value[1]
                         +    '</button>'
                         +  '</td>'
        trNode.addEventListener('click', editRow, false);
        if(i % 2 == 1) {
            trNode.className = 'dark-r';
        }
        trNode.setAttribute('data-index', i);
        Rtable.appendChild(trNode);
    }
}

//点击左侧一级导航时展开二级导航
function showSubNav(){
    if(event.target.nextElementSibling != null && event.target.nextElementSibling.tagName == 'DIV') {
        if(event.target.nextElementSibling.style.display == 'none') {
            event.target.nextElementSibling.style.display = 'block';   
        }else {
            event.target.nextElementSibling.style.display = 'none';
        }
    }
}

//加载左侧导航栏
function loadTableNav(){
    var navLength = tableNavData.length;
    lNav.innerHTML = null;
    for(var i = 0; i < navLength-1; i++) {
        if(typeof tableNavData[i] == 'string') {
            var pNode = document.createElement('P');
            var textNode = document.createTextNode(tableNavData[i]);
            pNode.appendChild(textNode);
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
    lNav.addEventListener('click', showSubNav);
    }   
}

//设置表头的宽度与内容表格各单元宽度一致
function setWidth() {
    if(document.getElementById("table-h")){
        for(var i = 0; i < document.getElementById("table-h").children.length; i++) {
            document.getElementById("table-h").children[i].style.width = window.getComputedStyle(document.getElementById("table-h").parentNode.nextElementSibling.children[i]).width;    
        }
    }
}

//当表格表头的Top超出浏览器时，出现固定在浏览器窗口顶部的表头
function onScroll() {
    lNav.style.height = window.innerHeight - lNav.getBoundingClientRect().top + "px";
    if(Rtable.getBoundingClientRect().top < 0 && document.getElementById("table-h")) {
        document.getElementById("table-h").style.position = "fixed";
        setWidth();
    }else if(Rtable.getBoundingClientRect().top > 0 && document.getElementById("table-h")) {
        document.getElementById("table-h").style.position = "relative";
    }
}

//为元素添加事件监听，调用加载表格和侧边栏函数
window.onload = function() {
    lNav.style.height = window.innerHeight - lNav.getBoundingClientRect().top + "px";
    setWidth();
    loadTableNav();
    loadTable(tableData);
    window.sessionStorage.setItem('tableData', JSON.stringify(tableData));
    document.body.addEventListener("scroll", onScroll, false);
    window.addEventListener("resize", onScroll, false);
    document.getElementById('conform-modify').addEventListener('click', conformModify, false);
    document.getElementById('conform-delete').addEventListener('click', conformDelete, false);
    document.getElementById('cancle-modify').addEventListener('click', cancleModify, false);
    document.getElementById('cancle-delete').addEventListener('click', cancleDelete, false);
};
