function encodeURL(){

let input = document.getElementById("inputText").value;

let encoded = encodeURIComponent(input);

document.getElementById("outputText").value = encoded;

}


function decodeURL(){

let input = document.getElementById("inputText").value;

try{

let decoded = decodeURIComponent(input);

document.getElementById("outputText").value = decoded;

}
catch{

alert("Invalid encoded URL");

}

}