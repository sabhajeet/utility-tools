function sortAZ(){

let text = document.getElementById("inputText").value;

let lines = text.split("\n");

lines.sort();

document.getElementById("outputText").value = lines.join("\n");

}


function sortZA(){

let text = document.getElementById("inputText").value;

let lines = text.split("\n");

lines.sort().reverse();

document.getElementById("outputText").value = lines.join("\n");

}