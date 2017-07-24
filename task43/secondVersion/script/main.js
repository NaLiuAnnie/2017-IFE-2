/**
 *@file to do list main javascript.
 *@author liuna(na.luna@gamil.com)
 *
 */

var selectedPri = 1;
var selectedSta = 2;
var currentTaskItem = '';
var startX = 0;
var itemIndex = 4;
var editContent = '';
var editPri = 0;
var editStatus = 2;
var editIndex = 0;
var currentIndex = null;

//浏览器加载完毕，将taskData数据存入localStorage，隐藏头部左侧按钮。
//显示all页面内容，添加事件监听。
window.onload = function init() {
    window.localStorage.setItem('taskItem', JSON.stringify(taskData));
    currentTaskItem = JSON.parse(localStorage.taskItem);
    var firstBtn = document.getElementById('header').children[0];
    if(firstBtn.innerText == 'Add') {
        firstBtn.style.visibility = 'hidden';
    }

    document.getElementById('onething-declare').style.display = 'none';
    document.getElementById('priority').style.display = 'flex';
    document.getElementById('status').style.display = 'flex';
    document.getElementById('one-thing').style.fontWeight = 'normal';
    document.getElementById('all').style.fontWeight = 'bolder';
    loadAllItem();

    document.getElementById('one-thing').addEventListener('click', changePage,false);
    document.getElementById('all').addEventListener('click', changePage,false);
    document.getElementById('btn2').addEventListener('click', btn2Event,false);
    document.getElementById('btn1').addEventListener('click', btn1Event,false);
    document.getElementById('priority').addEventListener('click', selPriority,false);
    document.getElementById('status').addEventListener('click', selStatus,false);
    document.getElementById('tasklist').addEventListener('touchstart',touchstartEvent);
    document.getElementById('tasklist').addEventListener('touchmove',touchmoveEvent);
}


//当用户点击OneThing或All时改变页面内容
function changePage() {
    if(event.target.innerText == 'OneThing') {
        document.getElementById('onething-declare').style.display = 'block';
        document.getElementById('priority').style.display = 'none';
        document.getElementById('status').style.display = 'none';
        document.getElementById('one-thing').style.fontWeight = 'bolder';
        document.getElementById('all').style.fontWeight = 'normal';
        document.getElementById('btn1').style.visibility = 'hidden';
        document.getElementById('btn2').innerText = 'Add';
        loadOnething();
    }else {
        document.getElementById('onething-declare').style.display = 'none';
        document.getElementById('priority').style.display = 'flex';
        document.getElementById('status').style.display = 'flex';
        document.getElementById('one-thing').style.fontWeight = 'normal';
        document.getElementById('all').style.fontWeight = 'bolder';
        loadAllItem();
    }    
}


//生成一个任务项
function createItem(index, status, content, priority){
    var item = document.createElement('li');
    item.className = 'task-item';
    item.setAttribute('data-priority', priority);
    item.setAttribute('data-itemindex',index);
    item.innerHTML = '' +
                     '<div class="statusPanel"><p>已完成</p><p>待办</p><p>进行中</p></div>' +
                     '<div class="editPanel"><p>编辑</p><p>删除</p></div>'
    var icon = document.createElement('i');
    icon.innerHTML = '<i></i><i></i>';
    if(status == '1') {
        icon.className = 'col-doing-icon';
    }else if(status == '2') {
        icon.className = 'col-upcoming-icon';        
    }else {
        icon.className = 'col-finish-icon';         
    }
    item.appendChild(icon);
    var newcontent = document.createElement('p');
    newcontent.className = 'task-content';
    newcontent.innerHTML = content.toString();
    item.appendChild(newcontent);
    return item;
}


//在页面当中显示所以任务
function loadAllItem() {
    var taskList = document.getElementById('tasklist');
    taskList.innerHTML = '';
    for(var i = 0; i < currentTaskItem.length; i++) {
        var index = currentTaskItem[i].index;
        var status = currentTaskItem[i].status;
        var content = currentTaskItem[i].content;
        var priority = currentTaskItem[i].priority;
        var newItem = createItem(index, status, content, priority);
        taskList.insertBefore(newItem, taskList.children[0]);
    }
}

//在页面中显示一个任务
function loadOnething() {
    var taskList = document.getElementById('tasklist');
    taskList.innerHTML = '';
    var onethingContent = '';
    var onetingTime = '';
    var index = 0;
    for(var i = 0; i < currentTaskItem.length; i++) {
        var status = currentTaskItem[i].status;
        var priority = currentTaskItem[i].priority;
        if (status == '1' && priority == '1') {
            if(!onethingContent) {
                onethingContent = currentTaskItem[i].content;
                onethingTime = currentTaskItem[i].time;
                index = currentTaskItem[i].index;
            }else {
                if(onethingTime > currentTaskItem[i].time) {
                    onethingContent = currentTaskItem[i].content;
                    onethingTime = currentTaskItem[i].time; 
                    index = currentTaskItem[i].index;                   
                }
            }
        }
    }
    if(onethingContent) {
       var onethingItem = createItem(index, 1, onethingContent, priority);
       taskList.appendChild(onethingItem);
    }
}


//为头部第二个按钮添加时间
function btn2Event() {
    if(document.getElementById('btn2').innerText == 'Add') {
        addItem();
    }else if(document.getElementById('btn2').innerText == 'DONE') {
        addTask();
    }
}

//当用户点击添加按钮时，进入添加编写任务界面
function addItem() {
    document.getElementById('btn1').innerText = 'Cancel';
    document.getElementById('btn1').style.visibility = 'visible';
    document.getElementById('btn2').innerText = 'DONE';
    document.getElementById('priority').children[0].children[0].style.border = '1px solid #979797';
    document.getElementById('priority').children[1].children[0].style.border = '1px solid #979797';
    document.getElementById('priority').children[2].children[0].style.border = '1px solid #979797';
    document.getElementById('status').children[0].children[0].style.border = '1px solid #979797';
    document.getElementById('status').children[1].children[0].style.border = '1px solid #979797';
    document.getElementById('status').children[2].children[0].style.border = '1px solid #979797';
    document.getElementById('tasklist').innerHTML = '';
    var inputTable = document.createElement('input');
    inputTable.type = 'text';
    inputTable.className = 'task-item';
    document.getElementById('tasklist').appendChild(inputTable);
    document.getElementById('tasklist').children[0].focus();
}

//为左侧按钮添加事件
function btn1Event() {
    if(document.getElementById('btn1').innerText == 'Cancel') {
        document.getElementById('btn1').style.visibility = 'hidden';
        document.getElementById('btn2').innerText = 'Add';
        loadAllItem();
    }    
}

function selPriority(){
    var priorityItem = document.getElementById('priority').children;
    for(var i = 0; i < 3; i++) {
        priorityItem[i].children[0].style.border = '1px solid #979797';
    }
    event.target.style.borderColor = 'red';
    selectedPri = event.target.getAttribute('data-index');
}

function selStatus() {
    var priorityItem = document.getElementById('status').children;
    for(var i = 0; i < 3; i++) {
        priorityItem[i].children[0].style.border = '1px solid #979797';
    }
    event.target.style.borderColor = 'red';
    selectedSta = event.target.getAttribute('data-index');    
}

//在添加任务界面用户点击done后，将任务添加并显示all页面。
function addTask() {
    var task = new Object();
    task.index = itemIndex;
    itemIndex = itemIndex + 1;
    task.content = document.getElementById('tasklist').children[0].value.toString();
    if(task.content == '') {
        return;
    }
    task.priority = selectedPri.toString();
    task.status = selectedSta.toString();
    task.time = Date.now().toString();
    var len = currentTaskItem.length;
    currentTaskItem[len] = task;
    window.localStorage.setItem('taskItem', currentTaskItem);
    document.getElementById('onething-declare').style.display = 'none';
    document.getElementById('priority').style.display = 'flex';
    document.getElementById('status').style.display = 'flex';
    document.getElementById('one-thing').style.fontWeight = 'normal';
    document.getElementById('all').style.fontWeight = 'bolder';

    document.getElementById('priority').children[0].children[0].style.border = 'none';
    document.getElementById('priority').children[1].children[0].style.border = 'none';
    document.getElementById('priority').children[2].children[0].style.border = 'none';
    document.getElementById('status').children[0].children[0].style.border = 'none';
    document.getElementById('status').children[1].children[0].style.border = 'none';
    document.getElementById('status').children[2].children[0].style.border = 'none';
    loadAllItem();

    document.getElementById('btn1').innerText = 'Cancel';
    document.getElementById('btn1').style.visibility = 'hidden';
    document.getElementById('btn2').innerText = 'Add';
}

//当点击任务列表时，获取touch start的坐标
function touchstartEvent() {
    event.preventDefault();
    changeStatus();
    editTaskItem();
    startX = event.changedTouches[0].pageX;
    var len1 = document.getElementsByClassName('editPanel').length;
    for(let i = 0; i < len1; i++) {
        document.getElementsByClassName('editPanel')[i].style.display = 'none';       
    }
    var len2 = document.getElementsByClassName('statusPanel').length;
    for(let j = 0; j < len2; j++) {
        document.getElementsByClassName('statusPanel')[j].style.display = 'none';        
    }
}

//当手指在任务列表滑动时，出现statusPanel或editPanel，并绑定事件
function touchmoveEvent() {
    event.preventDefault();
    var moveEndX = event.changedTouches[0].pageX;
    var x = moveEndX - startX;
    currentIndex = event.target.parentNode.getAttribute('data-itemindex');
    if(!currentIndex) {
        currentIndex = event.target.getAttribute('data-itemindex');
    }
    if(x > 0) {
        if(event.target.parentNode.tagName == 'I') {
            event.target.parentNode.parentNode.getElementsByClassName('statusPanel')[0].style.display = 'flex';        
        }else {
            event.target.parentNode.getElementsByClassName('statusPanel')[0].style.display = 'flex';   
        }
    }else if(x <= 0){
        if(event.target.parentNode.tagName == 'I') {
            event.target.parentNode.parentNode.getElementsByClassName('editPanel')[0].style.display = 'flex';       
        }else {
            event.target.parentNode.getElementsByClassName('editPanel')[0].style.display = 'flex';   
        }
        if(event.target.tagName == 'P') {
            editContent = event.target.innerText; 
            var statusName = event.target.parentNode.children[2].className;
            editIndex = event.target.parentNode.getAttribute('data-itemIndex');
            editPri = event.target.getAttribute('data-priority');            
        }else {
            editContent = event.target.children[3].innerText; 
            var stautsName = event.target.children[2].className;
            editIndex = event.target.getAttribute('data-itemIndex'); 
            editPri = event.target.getAttribute('data-priority');         
        }
        if(statusName == 'col-finish-icon') {
            editStatus = 3;
        }else if(statusName == 'col-upcoming-icon') {
            editStatus = 2;
        }else if(statusName == 'col-doing-icon') {
            editStauts = 1;
        }
    }
}

//当用户点击任务列表的statusPanel面板时，改变该任务的状态
function changeStatus() {
    if(event.target.parentNode.className == 'statusPanel') {
        var statusText = event.target.innerText;
        var newStatus = 0;
        if(statusText == '已完成') {
            newStatus = 3;
        }else if(statusText == '待办') {
            newStatus = 2;
        }else if(statusText == '进行中') {
            newStatus = 1;
        }
        currentTaskItem[currentIndex - 1] .status = newStatus;
        window.localStorage.setItem('taskItem', currentTaskItem);
        loadAllItem();  
        event.target.parentNode.style.display = 'none';
    } 
}

//当用户点击每个任务列表中的编辑时，进入编辑页面
function editTaskItem() {
    if(event.target.parentNode.className == 'editPanel' && event.target.innerText == '编辑') {
        addItem();
        document.getElementsByClassName('task-item')[0].value = editContent;
        document.getElementById('priority').children[editPri - 1].children[0].style.border = '1px solid red';
        document.getElementById('status').children[editStatus - 1].children[0].style.border = '1px solid red';
    }else if(event.target.parentNode.className == 'editPanel' && event.target.innerText == '删除') {
        var delIndex = event.target.parentNode.parentNode.getAttribute('data-itemindex');
        currentTaskItem.splice(delIndex - 1, 1);
        window.localStorage.setItem('taskItem', JSON.stringify(currentTaskItem));
        event.target.parentNode.style.display = 'none';
        loadAllItem();
    }       
}
