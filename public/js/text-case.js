function toUpper(){

let text = document.getElementById("inputText").value;

document.getElementById("outputText").value =
text.toUpperCase();

}

function toLower(){

let text = document.getElementById("inputText").value;

document.getElementById("outputText").value =
text.toLowerCase();

}

function toTitle(){

let text = document.getElementById("inputText").value;

let result = text
.toLowerCase()
.split(" ")
.map(word => word.charAt(0).toUpperCase() + word.slice(1))
.join(" ");

document.getElementById("outputText").value = result;

}

function toSentence(){

let text = document.getElementById("inputText").value.toLowerCase();

let result = text.charAt(0).toUpperCase() + text.slice(1);

document.getElementById("outputText").value = result;

}