var inputText = document.getElementById("input-text").value;

function query() {
    var queryText = document.getElementById("query-text").value;
    var displayChi = document.getElementById("display").children;
    for(var i = 0; i < displayChi.length; i++) {
        if(displayChi[i].innerText.search(queryText) != -1){
            displayChi[i].setAttribute("class","checked-box");
        }
    }
}

function deleteNode() {
    var targetNode = event.target;
    document.adoptNode(targetNode);
}

function rightOut() {
    var displayChild = document.getElementById("display").children;
    var len = displayChild.length;
    document.adoptNode(displayChild[len-1]);
}

function leftOut() {
    var displayChild = document.getElementById("display").children;
    document.adoptNode(displayChild[0]);
}

function rightIn() {
    var inputText = document.getElementById("input-text").value;
    var splitPattern = /\\n|\\t| | |\\r|,|，|、/g;
    var splitedInput = inputText.split(splitPattern);
    var display = document.getElementById("display");
    var displayHTML = display.children[0];
    for(var i = 0; i < splitedInput.length; i++) {
        if(splitedInput[i] != "") {
            var divNode = document.createElement("div");
            divNode.setAttribute("class","box");
            var textNode = document.createTextNode(splitedInput[i]);
            divNode.appendChild(textNode);
            display.appendChild(divNode);
        }
    }
}

function leftIn() {
    var inputText = document.getElementById("input-text").value;
    var splitPattern = /\\t|\\r|\\n| |,|，|、/g;
    var sepInput = inputText.split(splitPattern);
    var display = document.getElementById("display");
    for(var i = 0; i < sepInput.length; i++) {
        if(sepInput[i] != "") {
            var divNode = document.createElement("div");
            divNode.setAttribute("class","box");
            var textNode = document.createTextNode(sepInput[i]);
            divNode.appendChild(textNode);
            display.appendChild(divNode);
        }
    }
}

function init() {
    document.getElementById("left-in").onclick = leftIn;
    document.getElementById("right-in").onclick = rightIn;
    document.getElementById("left-out").onclick = leftOut;
    document.getElementById("right-out").onclick = rightOut;
    document.getElementById("display").onclick = deleteNode;
    document.getElementById("query").onclick = query;
}

init();
