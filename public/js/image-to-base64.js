let selectedFile=null;

document.getElementById("imageInput").addEventListener("change",function(e){

selectedFile=e.target.files[0];

});


function convertImage(){

if(!selectedFile){

alert("Please select an image");

return;

}

const reader=new FileReader();

reader.onload=function(e){

let base64=e.target.result;

document.getElementById("preview").src=base64;

document.getElementById("base64Output").value=base64;

};

reader.readAsDataURL(selectedFile);

}


function copyBase64(){

let text=document.getElementById("base64Output");

if(!text.value){

alert("Nothing to copy");

return;

}

text.select();

document.execCommand("copy");

alert("Base64 copied to clipboard");

}