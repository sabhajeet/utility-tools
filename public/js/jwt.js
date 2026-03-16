function decodeJWT(){

let token = document.getElementById("jwtInput").value;

try{

let parts = token.split(".");

if(parts.length !== 3){
alert("Invalid JWT token");
return;
}

let header = JSON.parse(atob(parts[0]));
let payload = JSON.parse(atob(parts[1]));

document.getElementById("headerOutput").value =
JSON.stringify(header, null, 4);

document.getElementById("payloadOutput").value =
JSON.stringify(payload, null, 4);

}
catch{

alert("Invalid JWT format");

}

}