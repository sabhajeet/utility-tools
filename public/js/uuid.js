function generateUUID(){

let uuid = crypto.randomUUID();

document.getElementById("uuid").value = uuid;

}

function copyUUID(){

let text = document.getElementById("uuid");

text.select();

navigator.clipboard.writeText(text.value);

alert("UUID copied");

}