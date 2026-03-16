// server.js - lightweight public server + protected tools

const express = require("express");
const QRCode = require("qrcode");
const bwipjs = require("bwip-js");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static("public"));

// ---------------------- QR API ----------------------
app.post("/api/qr", async (req, res) => {
    const { text } = req.body;
    const qr = await QRCode.toDataURL(text);
    res.json({ qr });
});

// ---------------------- BARCODE API ----------------------
app.post("/api/barcode", (req, res) => {
    const { text } = req.body;

    bwipjs.toBuffer({
        bcid: "code128",
        text: text,
        scale: 3,
        height: 10,
        includetext: true
    }, (err, png) => {
        if (err) return res.status(500).send(err);
        res.set("Content-Type", "image/png");
        res.send(png);
    });
});

// ---------------- HTTP HEADER VIEWER -----------------
app.get("/api/headers", (req, res) => {
    res.json(req.headers);
});

// ---------------- AUTH & SECURE-NOTES ----------------
// Mount only for tools that need authentication
// app.use("/api/auth", require(path.join(__dirname, "auth/routes/auth")));
// app.use("/api/secure-notes", require(path.join(__dirname, "auth/routes/secure-notes")));

// ---------------- SERVER START ----------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));















// // # main lightweight server for public tools

// const express = require("express");
// const QRCode = require("qrcode");
// const bwipjs = require("bwip-js");

// const app = express();

// app.use(express.json());
// app.use(express.static("public"));

// /* QR API */

// app.post("/api/qr", async (req,res)=>{
//     const {text} = req.body;
//     const qr = await QRCode.toDataURL(text);
//     res.json({qr});
// });


// /* BARCODE API */

// app.post("/api/barcode", (req,res)=>{

//     const {text} = req.body;

//     bwipjs.toBuffer({
//         bcid: 'code128',
//         text: text,
//         scale: 3,
//         height: 10,
//         includetext: true
//     }, function (err, png) {

//         if (err) {
//             res.status(500).send(err);
//         } else {
//             res.set('Content-Type', 'image/png');
//             res.send(png);
//         }

//     });

// });

// /* HTTP-HEADER-VIEWER */

// app.get("/api/headers",(req,res)=>{

// res.json(req.headers);

// });


// // Mount auth only for tools that need it
// app.use("/auth", require("./auth/routes/auth"));
// app.use("/secure-notes", require("./auth/routes/secure-notes"));


// app.listen(3000, ()=>{
//     console.log("Server running on port 3000");
// });