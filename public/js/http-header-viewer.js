function loadHeaders(){

fetch("/api/headers")
.then(res => res.json())
.then(data => {

let output = JSON.stringify(data, null, 2);

document.getElementById("headersBox").textContent = output;

});

}