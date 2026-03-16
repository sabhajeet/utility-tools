function generateBarcode(){

    let text = document.getElementById("barcodeText").value;

    fetch("/api/barcode",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({text:text})
    })
    .then(res => res.blob())
    .then(data => {

        let url = URL.createObjectURL(data);

        document.getElementById("barcode").innerHTML =
        `<img src="${url}">`;

    });

}