function getLines(){
return document.getElementById("inputText").value.split("\n");
}

function showOutput(lines){
document.getElementById("outputText").value = lines.join("\n");
}

function sortAZ(){

let lines = getLines();

lines.sort((a,b)=>a.localeCompare(b));

showOutput(lines);

}

function sortZA(){

let lines = getLines();

lines.sort((a,b)=>b.localeCompare(a));

showOutput(lines);

}

function sortLength(){

let lines = getLines();

lines.sort((a,b)=>a.length - b.length);

showOutput(lines);

}

function removeEmpty(){

let lines = getLines().filter(line => line.trim() !== "");

showOutput(lines);

}