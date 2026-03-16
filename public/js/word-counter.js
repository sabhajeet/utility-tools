function countWords(){

let text = document.getElementById("textInput").value;

let words = text.trim().split(/\s+/).filter(word => word.length > 0);

let characters = text.length;

let noSpaces = text.replace(/\s/g,"").length;

let sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);

let paragraphs = text.split(/\n+/).filter(p => p.trim().length > 0);

let lines = text.split("\n").length;

document.getElementById("words").innerText = words.length;

document.getElementById("characters").innerText = characters;

document.getElementById("noSpaces").innerText = noSpaces;

document.getElementById("sentences").innerText = sentences.length;

document.getElementById("paragraphs").innerText = paragraphs.length;

document.getElementById("lines").innerText = lines;

}