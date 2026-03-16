// function removeDuplicates(){

// let text = document.getElementById("inputText").value;

// let lines = text.split("\n");

// let unique = [...new Set(lines)];

// document.getElementById("outputText").value = unique.join("\n");

// }

function removeDuplicates(){

let text = document.getElementById("inputText").value;

let lines = text.split("\n")
.map(line => line.trim())
.filter(line => line !== "");

let unique = [...new Set(lines)];

document.getElementById("outputText").value = unique.join("\n");

}