function encodeBase64(){

let input = document.getElementById("inputText").value;

let encoded = btoa(input);

document.getElementById("outputText").value = encoded;

}


function decodeBase64(){

let input = document.getElementById("inputText").value;

try{

let decoded = atob(input);

document.getElementById("outputText").value = decoded;

}
catch{

alert("Invalid Base64 string");

}

}