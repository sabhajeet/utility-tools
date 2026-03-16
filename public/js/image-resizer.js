let selectedFile = null;
let originalWidth = 0;
let originalHeight = 0;

const fileInput = document.getElementById("imageInput");

fileInput.addEventListener("change", function(e){

selectedFile = e.target.files[0];

if(!selectedFile) return;

document.getElementById("originalSize").innerText =
(selectedFile.size/1024).toFixed(2) + " KB";

const reader = new FileReader();

reader.onload = function(ev){

const img = new Image();

img.onload = function(){

originalWidth = img.width;
originalHeight = img.height;

document.getElementById("width").value = originalWidth;
document.getElementById("height").value = originalHeight;

};

img.src = ev.target.result;

};

reader.readAsDataURL(selectedFile);

});


/* Maintain aspect ratio */

document.getElementById("width").addEventListener("input",function(){

if(!document.getElementById("lockRatio").checked) return;

let w=this.value;

if(w && originalWidth){

let h=Math.round((originalHeight/originalWidth)*w);

document.getElementById("height").value=h;

}

});


function resizeImage(){

if(!selectedFile){

alert("Please select an image");

return;

}

let width=parseInt(document.getElementById("width").value);
let height=parseInt(document.getElementById("height").value);

const reader=new FileReader();

reader.onload=function(e){

const img=new Image();

img.onload=function(){

const canvas=document.createElement("canvas");
const ctx=canvas.getContext("2d");

canvas.width=width;
canvas.height=height;

ctx.drawImage(img,0,0,width,height);

canvas.toBlob(function(blob){

let url=URL.createObjectURL(blob);

document.getElementById("preview").src=url;

document.getElementById("newSize").innerText=
(blob.size/1024).toFixed(2)+" KB";

let link=document.getElementById("downloadLink");

link.href=url;
link.style.display="inline";

},"image/jpeg",0.9);

};

img.src=e.target.result;

};

reader.readAsDataURL(selectedFile);

}


function resetResizer(){

selectedFile=null;

fileInput.value="";

document.getElementById("width").value="";
document.getElementById("height").value="";

document.getElementById("preview").src="";

document.getElementById("originalSize").innerText="";
document.getElementById("newSize").innerText="";

document.getElementById("downloadLink").style.display="none";

}