function parseURL(){

let input = document.getElementById("urlInput").value;

try{

let url = new URL(input);

let output =
"Protocol : " + url.protocol + "\n" +
"Host     : " + url.hostname + "\n" +
"Port     : " + (url.port || "default") + "\n" +
"Path     : " + url.pathname + "\n" +
"Query    : " + url.search + "\n" +
"Hash     : " + url.hash;

document.getElementById("result").value = output;

}
catch{

document.getElementById("result").value = "Invalid URL";

}

}