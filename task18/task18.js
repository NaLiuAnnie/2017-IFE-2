var queue = document.getElementById("queue");

function deleteNum() {
  document.adoptNode(event.target);
}

function rightOutNum() {
    if(queue.children != null) {
        var len = queue.children.length;
        document.adoptNode(queue.children[len-1]);3
    }
}

function leftOutNum() {
    if(queue.children != null) {
        document.adoptNode(queue.children[0]);
    }
}

function rightInNum() {
    var num = document.getElementById("input-num").value;
    if(!isNaN(num)){
        var divNode = document.createElement("div");
        divNode.setAttribute("class", "box");
        var textNode = document.createTextNode(num);
        divNode.appendChild(textNode);
        queue.appendChild(divNode); 
    }  
}

function leftInNum() {
    var num = document.getElementById("input-num").value;
    if(!isNaN(num)) {
        var divNode = document.createElement("div");
        divNode.setAttribute("class", "box");
        var textNode = document.createTextNode(num);
        divNode.appendChild(textNode);
        var queueFirstNode = document.getElementById("queue").childNodes[0];
        queue.insertBefore(divNode, queueFirstNode);
    }  
}

function init() {
    document.getElementById("left-in").onclick = leftInNum;
    document.getElementById("right-in").onclick = rightInNum;
    document.getElementById("left-out").onclick = leftOutNum;
    document.getElementById("right-out").onclick = rightOutNum;
    document.getElementById("queue").onclick = deleteNum;
}

init();
