function getMyUA(){

let ua=navigator.userAgent;

document.getElementById("uaInput").value=ua;

parseUA();

}

function parseUA(){

let ua=document.getElementById("uaInput").value;

let browser="Unknown";
let version="Unknown";
let os="Unknown";
let device="Desktop";

/* Detect Browser */

if(ua.includes("Chrome") && !ua.includes("Edg")){
browser="Chrome";
version=ua.match(/Chrome\/([0-9\.]+)/)[1];
}
else if(ua.includes("Firefox")){
browser="Firefox";
version=ua.match(/Firefox\/([0-9\.]+)/)[1];
}
else if(ua.includes("Safari") && !ua.includes("Chrome")){
browser="Safari";
version=ua.match(/Version\/([0-9\.]+)/)[1];
}
else if(ua.includes("Edg")){
browser="Edge";
version=ua.match(/Edg\/([0-9\.]+)/)[1];
}

/* Detect OS */

if(ua.includes("Windows")) os="Windows";
else if(ua.includes("Mac")) os="MacOS";
else if(ua.includes("Linux")) os="Linux";
else if(ua.includes("Android")) os="Android";
else if(ua.includes("iPhone")) os="iOS";

/* Detect Device */

if(/Mobi|Android/i.test(ua)) device="Mobile";

/* Show result */

document.getElementById("browser").innerText=browser;
document.getElementById("version").innerText=version;
document.getElementById("os").innerText=os;
document.getElementById("device").innerText=device;

}