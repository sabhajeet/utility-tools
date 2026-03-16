function generateLorem(){

let count = document.getElementById("count").value;

const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
nisi ut aliquip ex ea commodo consequat.`

let result = "";

for(let i=0; i<count; i++){
result += lorem + "\n\n";
}

document.getElementById("output").value = result;

}