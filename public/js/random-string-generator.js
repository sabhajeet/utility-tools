function generateString(){

let length=document.getElementById("length").value;

let upper=document.getElementById("uppercase").checked;
let lower=document.getElementById("lowercase").checked;
let number=document.getElementById("numbers").checked;
let symbol=document.getElementById("symbols").checked;

let chars="";

if(upper) chars+="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
if(lower) chars+="abcdefghijklmnopqrstuvwxyz";
if(number) chars+="0123456789";
if(symbol) chars+="!@#$%^&*()_+";

if(chars===""){
alert("Select at least one option");
return;
}

let result="";

for(let i=0;i<length;i++){
let randomIndex=Math.floor(Math.random()*chars.length);
result+=chars[randomIndex];
}

document.getElementById("result").value=result;

}

function copyResult(){

let text=document.getElementById("result");

text.select();
navigator.clipboard.writeText(text.value);

alert("Copied to clipboard");

}