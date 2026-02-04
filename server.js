const express = require("express");
const multer = require("multer");
const potrace = require("potrace");
const fs = require("fs");
const cors = require("cors");

const app = express();
const upload = multer({ 
  dest: "uploads/",
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});


app.use(cors());

app.post("/convert", upload.single("image"), (req, res) => {
     if (!req.file.mimetype.startsWith("image/")) {
    return res.status(400).send("Only image files allowed");
  }
  if (!req.file.mimetype.startsWith("image/")) {
    fs.unlinkSync(req.file.path);
    return res.status(400).send("Only image files allowed");
  }
  const inputPath = req.file.path;
  const threshold = Number(req.body.threshold || 180);

  potrace.trace(inputPath, {
    threshold,
    turdSize: 5,
    optCurve: true,
    optTolerance: 0.2
  }, function (err, svg) {
    if (err) return res.status(500).send("Error");

    res.setHeader("Content-Type", "image/svg+xml");
    res.send(svg);
    fs.unlinkSync(inputPath);

  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
