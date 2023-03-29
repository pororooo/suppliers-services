const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT ?? 3000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = req.query.supplierId;
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, `${uploadPath}`);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

app.get("/upload", (req, res) => {
  res.sendStatus(200);
});

app.post("/upload", upload.single("file"), (req, res) => {
  return res.status(200).send("File uploaded successfully");
});

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}...`);
});