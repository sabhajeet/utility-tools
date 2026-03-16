function compareText(){

let textA = document.getElementById("textA").value.split("\n");
let textB = document.getElementById("textB").value.split("\n");

let maxLines = Math.max(textA.length, textB.length);

let result = "";

for(let i=0;i<maxLines;i++){

let lineA = textA[i] || "";
let lineB = textB[i] || "";

if(lineA === lineB){

result += "Line " + (i+1) + ": SAME\n";

}else{

result += "Line " + (i+1) + ":\n";
result += "A: " + lineA + "\n";
result += "B: " + lineB + "\n\n";

}

}

document.getElementById("result").value = result;

}