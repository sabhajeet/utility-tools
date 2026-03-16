function reverseText(){

let text = document.getElementById("inputText").value;

let reversed = text.split("").reverse().join("");

document.getElementById("outputText").value = reversed;

}


function reverseWords(){

let text = document.getElementById("inputText").value;

let words = text.split(" ");

let reversed = words.reverse().join(" ");

document.getElementById("outputText").value = reversed;

}


function reverseLines(){

let text = document.getElementById("inputText").value;

let lines = text.split("\n");

let reversed = lines.reverse().join("\n");

document.getElementById("outputText").value = reversed;

}