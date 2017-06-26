var chart = document.getElementById("chart");
var num = 0;

function sortItem() {
    if(chart.children != null) {
        var len = chart.children.length;
        for(var i = 0; i < len; i++) {
            for(var j = 0; j <= i; j++) {
                if(chart.children[i].style.height < chart.children[j].style.height) {
                    var temp = chart.children[i].style.height;
                    chart.children[i].style.height = chart.children[j].style.height;
                    chart.children[j].style.height = temp;
                }
            }
        }
    }
}

function rightOutItem() {
    if(chart.children != null) {
        var len = chart.children.length;
        document.adoptNode(chart.children[len-1]);
        num--;
    }
}
 
function leftOutItem() {
    if(chart.children != null) {
        document.adoptNode(chart.children[0]);
        num--;
    }
}

function leftInItem() {
    var height = document.getElementById("input-num").value;
    if(num != null && num.length > 60) {
        alert("Columns' number is over 60, sorry for couldn't add other column.");
        return;        
    }
    if(!isNaN(height) && height >= 10 && height <= 100) {
        var divNode = document.createElement("div");
        divNode.setAttribute("class", "column");
        divNode.style.height = height + "px";
        var firstNode = chart.childNodes[0];
        chart.insertBefore(divNode, firstNode);
        num++;
    }  
}

function rightInItem() {
    var height = document.getElementById("input-num").value;
    if(num != null && num.length > 60) {
        alert("Columns' number is over 60, sorry for couldn't add other column.");
        return;
    }
    if(!isNaN(height) && height >= 10 && height <= 100) {
        var divNode = document.createElement("div");
        divNode.setAttribute("class", "column");
        divNode.style.height = height + "px";
        chart.appendChild(divNode);
        num++;
    }
}

function init() {
    document.getElementById("left-in").onclick = leftInItem;
    document.getElementById("right-in").onclick = rightInItem;
    document.getElementById("left-out").onclick = leftOutItem;
    document.getElementById("right-out").onclick = rightOutItem;
    document.getElementById("sort").onclick = sortItem;
}

init();
