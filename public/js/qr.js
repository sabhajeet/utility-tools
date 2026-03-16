function generateQR(){
    let text = document.getElementById("text").value;

    fetch("/api/qr",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({text:text})
    })
    .then(res=>res.json())
    .then(data=>{
        document.getElementById("qr").innerHTML =
        `<img src="${data.qr}">`;
    })
}