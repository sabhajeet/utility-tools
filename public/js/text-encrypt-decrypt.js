function encryptText(){

let text=document.getElementById("inputText").value;
let key=document.getElementById("secretKey").value;

if(text=="" || key==""){
alert("Enter text and secret key");
return;
}

let encrypted=CryptoJS.AES.encrypt(text,key).toString();

document.getElementById("outputText").value=encrypted;

}

function decryptText(){

let text=document.getElementById("inputText").value;
let key=document.getElementById("secretKey").value;

if(text=="" || key==""){
alert("Enter encrypted text and key");
return;
}

try{

let decrypted=CryptoJS.AES.decrypt(text,key);
let output=decrypted.toString(CryptoJS.enc.Utf8);

if(output==""){
alert("Invalid key or text");
return;
}

document.getElementById("outputText").value=output;

}
catch(e){
alert("Decryption failed");
}

}