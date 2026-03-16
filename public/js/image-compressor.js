let selectedFile = null;

/* Show quality slider value */

const qualitySlider = document.getElementById("quality");
const qualityValue = document.getElementById("qualityValue");

if (qualitySlider) {
// qualityValue.innerText = qualitySlider.value;
// to show in percent %
qualityValue.innerText = Math.round(qualitySlider.value * 100) + "%";


qualitySlider.addEventListener("input", () => {
// qualityValue.innerText = qualitySlider.value;
// to show in percent %
qualityValue.innerText = Math.round(qualitySlider.value * 100) + "%";
});
}


/* File input */

const fileInput = document.getElementById("imageInput");

if (fileInput) {
fileInput.addEventListener("change", (e) => {
selectedFile = e.target.files[0];
});
}


/* Drag & Drop */

const dropArea = document.getElementById("dropArea");

if (dropArea) {

dropArea.addEventListener("dragover", (e) => {
e.preventDefault();
dropArea.style.borderColor = "#333";
});

dropArea.addEventListener("dragleave", () => {
dropArea.style.borderColor = "#aaa";
});

dropArea.addEventListener("drop", (e) => {

e.preventDefault();

dropArea.style.borderColor = "#aaa";

const files = e.dataTransfer.files;

if (files.length > 0) {

selectedFile = files[0];

fileInput.files = files;

}

});

}


/* Compress Image */

function compressImage(){

if(!selectedFile){

alert("Please select an image");

return;

}

document.getElementById("originalSize").innerText =
(selectedFile.size / 1024).toFixed(2) + " KB";


const reader = new FileReader();

reader.onload = function(e){

const img = new Image();

img.onload = function(){

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

let resizeWidth = document.getElementById("resizeWidth").value;

let width = img.width;
let height = img.height;

/* Resize if user entered width */

if(resizeWidth && resizeWidth > 0){

width = parseInt(resizeWidth);

height = Math.round((img.height / img.width) * width);

}

canvas.width = width;
canvas.height = height;

ctx.drawImage(img, 0, 0, width, height);

let quality = parseFloat(document.getElementById("quality").value);

canvas.toBlob(function(blob){

if(!blob){
alert("Compression failed");
return;
}

/* Compressed size */

document.getElementById("compressedSize").innerText =
(blob.size / 1024).toFixed(2) + " KB";

/* Compression percentage */

let percent = ((1 - (blob.size / selectedFile.size)) * 100).toFixed(2);

document.getElementById("compressionPercent").innerText =
percent + "%";

/* Preview image */

const url = URL.createObjectURL(blob);

document.getElementById("originalPreview").src = e.target.result;
document.getElementById("compressedPreview").src = url;

/* Download link */

const downloadLink = document.getElementById("downloadLink");

downloadLink.href = url;
downloadLink.style.display = "inline-block";

}, "image/jpeg", quality);

};

img.src = e.target.result;

};

reader.readAsDataURL(selectedFile);

}


/* Reset Tool */

function resetCompressor(){

selectedFile = null;

fileInput.value = "";

document.getElementById("originalPreview").src = "";
document.getElementById("compressedPreview").src = "";

document.getElementById("originalSize").innerText = "";
document.getElementById("compressedSize").innerText = "";
document.getElementById("compressionPercent").innerText = "";

document.getElementById("downloadLink").style.display = "none";

}