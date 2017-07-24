//编辑页面没有状态和优先级显示

var selOnething = false;
var selectedPri = '';
var selectedSta = '';
var currentTaskItem = '';
var startX = 0;
var itemIndex = 4;
var editContent = '';
var editPri = 0;
var editStatus = 1;
var editIndex = 0;
window.onload = function init() {
    window.localStorage.setItem('taskItem', JSON.stringify(taskData));
    currentTaskItem = JSON.parse(localStorage.taskItem);
    var firstBtn = document.getElementById('header').children[0];
    if(firstBtn.innerText == 'Add') {
        firstBtn.style.visibility = 'hidden';
    }
    if(selOnething) {
        document.getElementById('onething-declare').style.display = 'block';
        document.getElementById('priority').style.display = 'none';
        document.getElementById('status').style.display = 'none';
        document.getElementById('one-thing').style.fontWeight = 'bolder';
        document.getElementById('all').style.fontWeight = 'normal';
        loadOnething();
    }else {
        document.getElementById('onething-declare').style.display = 'none';
        document.getElementById('priority').style.display = 'flex';
        document.getElementById('status').style.display = 'flex';
        document.getElementById('one-thing').style.fontWeight = 'normal';
        document.getElementById('all').style.fontWeight = 'bolder';
        loadAllItem();
    }
    document.getElementById('one-thing').addEventListener('click', changePage,false);
    document.getElementById('all').addEventListener('click', changePage,false);
    document.getElementById('btn2').addEventListener('click', btn2Event,false);
    document.getElementById('btn1').addEventListener('click', btn1Event,false);
    document.getElementById('priority').addEventListener('click', selPriority,false);
    document.getElementById('status').addEventListener('click', selStatus,false);
    document.getElementById('tasklist').addEventListener('touchstart',touchstartEvent);
    document.getElementById('tasklist').addEventListener('touchmove',touchmoveEvent);
}


//when people click onthing or all change the page
function changePage() {
    selOnething = !selOnething;
    if(selOnething) {
        document.getElementById('onething-declare').style.display = 'block';
        document.getElementById('priority').style.display = 'none';
        document.getElementById('status').style.display = 'none';
        document.getElementById('one-thing').style.fontWeight = 'bolder';
        document.getElementById('all').style.fontWeight = 'normal';
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

function createItem(index, status, content){
    var item = document.createElement('li');
    item.className = 'task-item';
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

function loadAllItem() {
    var taskList = document.getElementById('tasklist');
    taskList.innerHTML = '';
    for(var i = 0; i < currentTaskItem.length; i++) {
        var index = currentTaskItem[i].index;
        var status = currentTaskItem[i].status;
        var content = currentTaskItem[i].content;
        var newItem = createItem(index, status, content);
        taskList.insertBefore(newItem, taskList.children[0]);
    }
}

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
       var onethingItem = createItem(index, 1, onethingContent);
       taskList.appendChild(onethingItem);
    }
}

function btn2Event() {
    if(document.getElementById('btn2').innerText == 'Add') {
        addItem();
    }else if(document.getElementById('btn2').innerText == 'DONE') {
        addTask();
    }
}

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
}

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

function addTask() {
    var task = new Object();
    task.index = itemIndex;
    itemIndex = itemIndex + 1;
    task.content = document.getElementById('tasklist').children[0].value.toString();
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
    loadAllItem();
    document.getElementById('priority').children[0].children[0].style.border = 'none';
    document.getElementById('priority').children[1].children[0].style.border = 'none';
    document.getElementById('priority').children[2].children[0].style.border = 'none';
    document.getElementById('status').children[0].children[0].style.border = 'none';
    document.getElementById('status').children[1].children[0].style.border = 'none';
    document.getElementById('status').children[2].children[0].style.border = 'none';
    document.getElementById('btn1').style.visibility = 'hidden';
    document.getElementById('btn2').innerText = 'Add'
}

function touchstartEvent() {
    event.preventDefault();
    startX = event.originalEvent.changedTouches[0].pageX;
}

function touchmoveEvent() {
    event.preventDefault();
    var moveEndX = event.originalEvent.changedTouches[0].pageX;
    var x = moveEndX - startX;

    if(x > 0) {
        event.target.getElementsByClassName('statusPanel')[0].style.display = 'block';
        event.target.getElementsByClassName('statusPanel')[0].addEventListener('click', changeStatus);
    }else if(x < 0){
        event.target.getElementsByClassName('editPanel')[0].style.display = 'block';
        event.target.getElementsByClassName('editPanel')[0].addEventListener('click', editTaskItem);
        editContent = event.target.children[3].innerText;
//        editPri = 
        var stautsName = event.target.children[2].className;
        if(statusName == 'col-finish-icon') {
            editStatus = 3;
        }else if(statusName == 'col-upcoming-icon') {
            editStatus = 2;
        }else if(statusName == 'col-doing-icon') {
            editStauts = 1;
        }
        editIndex = event.target.getAttribute('data-itemIndex');
    }
}

function changeStatus() {
    var statusText = event.target.innerText;
    var currentIndex = event.target.getAttribute('data-itemindex');
    var newStatus = 0;
    if(statusText == '已完成') {
        newStatus = 3;
    }else if(statusText == '待办') {
        newStatus = 2;
    }else if(statusText == '进行中') {
        newStatus = 1;
    }
    for(var i = 0; i < itemIndex - 1; i++) {
        if(currentTaskItem[i].index == currentIndex) {
            currentTaskItem[i].status = newStatus;
        }
    }
    window.localStorage.setItem('taskItem', currentTaskItem);
    loadAllItem();   
}

function editTaskItem() {
    if(event.target.innerText == '编辑') {
        var taskList = document.getElementById('tasklist');
        taskList.innerHTML = '';
        var onethingContent = editContent;
       var onethingItem = createItem(editInde, editStatus, onethingContent);
       taskList.appendChild(onethingItem);
    }        
}
