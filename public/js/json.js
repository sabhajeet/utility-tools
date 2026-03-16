function formatJSON(){

let input = document.getElementById("jsonInput").value;

try{

let obj = JSON.parse(input);

let formatted = JSON.stringify(obj, null, 4);

document.getElementById("jsonOutput").value = formatted;

}
catch{

alert("Invalid JSON");

}

}



function minifyJSON(){

let input = document.getElementById("jsonInput").value;

try{

let obj = JSON.parse(input);

let minified = JSON.stringify(obj);

document.getElementById("jsonOutput").value = minified;

}
catch{

alert("Invalid JSON");

}

}