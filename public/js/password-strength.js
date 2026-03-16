function checkStrength(){

let password = document.getElementById("password").value;
let score = 0;

score += updateRule(password.length >= 8,"length","At least 8 characters");
score += updateRule(/[A-Z]/.test(password),"upper","Uppercase letter");
score += updateRule(/[a-z]/.test(password),"lower","Lowercase letter");
score += updateRule(/[0-9]/.test(password),"number","Number");
score += updateRule(/[^A-Za-z0-9]/.test(password),"special","Special character");

updateStrength(score);

}

function updateRule(condition,id,text){

let el = document.getElementById(id);

if(condition){
el.innerHTML="✔ "+text;
el.style.color="green";
return 1;
}else{
el.innerHTML="❌ "+text;
el.style.color="red";
return 0;
}

}

function updateStrength(score){

let bar=document.getElementById("strengthFill");
let text=document.getElementById("strengthText");

let percent=(score/5)*100;
bar.style.width=percent+"%";

if(score<=2){
bar.style.background="red";
text.innerText="Strength: Weak";
text.style.color="red";
}
else if(score<=4){
bar.style.background="orange";
text.innerText="Strength: Medium";
text.style.color="orange";
}
else{
bar.style.background="green";
text.innerText="Strength: Strong";
text.style.color="green";
}

}