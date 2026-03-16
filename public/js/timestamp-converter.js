function timestampToDate(){

let ts=document.getElementById("timestampInput").value.trim();

if(ts===""){
alert("Enter timestamp");
return;
}

let num=Number(ts);

if(ts.length===13){
num=num;
}else if(ts.length===10){
num=num*1000;
}

let date=new Date(num);

document.getElementById("localTime").innerText="Local Time : "+date.toString();
document.getElementById("utcTime").innerText="UTC Time   : "+date.toUTCString();
document.getElementById("isoTime").innerText="ISO Format : "+date.toISOString();

}

function dateToTimestamp(){

let dateInput=document.getElementById("dateInput").value;

if(dateInput===""){
alert("Select date");
return;
}

let ts=Math.floor(new Date(dateInput).getTime()/1000);

document.getElementById("timestampResult").innerText="Unix Timestamp: "+ts;

}

function currentTimestamp(){

let now=Math.floor(Date.now()/1000);

document.getElementById("timestampInput").value=now;

timestampToDate();

}

function copyTimestamp(){

let text=document.getElementById("timestampResult").innerText.replace("Unix Timestamp: ","");

navigator.clipboard.writeText(text);

alert("Timestamp copied");

}