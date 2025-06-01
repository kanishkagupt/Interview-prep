const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const Resume = require("../models/Resume");

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Multer setup
const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/upload", upload.single("resume"), async (req, res) => {
  const file = req.file;

  if (!file) return res.status(400).json({ message: "No file uploaded" });

  let extractedText = "";

  try {
    console.log("Uploaded file path:", file.path);
    if (file.mimetype === "application/pdf") {
      const dataBuffer = fs.readFileSync(file.path);
      const data = await pdfParse(dataBuffer);
      extractedText = data.text;
    } else if (
      file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const data = await mammoth.extractRawText({ path: file.path });
      extractedText = data.value;
    } else {
      return res.status(400).json({ message: "Unsupported file format" });
    }

    const newResume = new Resume({
      filename: file.originalname,
      extractedText,
    });

    await newResume.save();
    console.log("Saved resume to DB");

    res.json({ message: "Resume uploaded and processed", text: extractedText });
  } catch (err) {
    console.error("Error processing file:", err);
    res.status(500).json({ message: "Error extracting text" });
  }
});

module.exports = router;


