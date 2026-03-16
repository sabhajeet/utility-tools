function testRegex(){

let pattern = document.getElementById("regexPattern").value;
let flags = document.getElementById("regexFlags").value;
let text = document.getElementById("testString").value;

try{

let regex = new RegExp(pattern, flags);

let matches = text.match(regex);

if(matches){
document.getElementById("result").value =
JSON.stringify(matches, null, 4);
}
else{
document.getElementById("result").value = "No matches found";
}

}
catch(error){

document.getElementById("result").value = "Invalid Regex Pattern";

}

}