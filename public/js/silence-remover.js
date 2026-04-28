const express = require("express");
const multer = require("multer");
const ffmpeg = require("fluent-ffmpeg");
const path = require("path");
const fs = require("fs");

const router = express.Router();

// ensure folders exist
if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");
if (!fs.existsSync("outputs")) fs.mkdirSync("outputs");

const upload = multer({ dest: "uploads/" });

router.post("/api/silence-remover/process", upload.single("audio"), (req, res) => {

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
        console.log("FFmpeg Error:", err);
        res.status(500).json({ success: false, error: err.message });
        })
        // .on("error", (err) => {
        //     console.log(err);
        //     res.json({ success: false });
        // })
        .save(outputPath);
});

module.exports = router;