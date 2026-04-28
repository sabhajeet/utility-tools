// server.js - lightweight public server + protected tools

const express = require("express");
const QRCode = require("qrcode");
const bwipjs = require("bwip-js");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static("public"));

// --------------SILENCE REMOVER----------------------
const multer = require("multer");
const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");

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

// =====================================================
// 🔥 SILENCE REMOVER START
// =====================================================

// create folders if not exist
if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");
if (!fs.existsSync("outputs")) fs.mkdirSync("outputs");

// multer setup
const upload = multer({ dest: "uploads/" });

// serve output files
app.use("/outputs", express.static("outputs"));

// API
app.post("/api/silence-remover/process", upload.single("audio"), (req, res) => {

    const silenceDuration = req.body.duration || 0.6;
    const enhance = req.body.enhance === "true";
    const smartCut = req.body.smartCut === "true";
    const noise = req.body.noise || 20;

    const input = req.file.path;

    const name = path.parse(req.file.originalname).name;
    const ext = path.extname(req.file.originalname);

    const outputFile = `${name}_processed_${Date.now()}${ext}`;
    const outputPath = path.join("outputs", outputFile);

    let filters = [];

    if (smartCut) {
        filters.push(
            `silenceremove=start_periods=1:start_duration=${silenceDuration}:start_threshold=-50dB:stop_periods=-1:stop_duration=${silenceDuration}:stop_threshold=-50dB`
        );
    }

    if (enhance) {
        filters.push(`afftdn=nf=-${noise}`);
        filters.push("highpass=f=80");
        filters.push("dynaudnorm");
    }

    ffmpeg(input)
        .audioFilters(filters)
        .on("end", () => {
            fs.unlinkSync(input);

            res.json({
                success: true,
                file: `/outputs/${outputFile}`
            });
        })
        .on("error", (err) => {
            console.log(err);
            res.json({ success: false });
        })
        .save(outputPath);
});

// =====================================================
// 🔥 SILENCE REMOVER END
// =====================================================



// ---------------- SERVER START ----------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

