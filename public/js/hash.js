function generateHash(){

let text = document.getElementById("inputText").value;

let type = document.getElementById("hashType").value;

let result = "";

if(type === "md5"){
result = CryptoJS.MD5(text);
}

else if(type === "sha1"){
result = CryptoJS.SHA1(text);
}

else if(type === "sha256"){
result = CryptoJS.SHA256(text);
}

else if(type === "sha512"){
result = CryptoJS.SHA512(text);
}

document.getElementById("outputText").value = result;

}