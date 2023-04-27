import express from 'express';
import multer from 'multer';
import cors from 'cors';
import fs from 'fs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Files from './models/files.js';
import { MongoClient } from 'mongodb';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config();

const userPass = process.env.USER_PASS;
const app = express();
const db = `mongodb+srv://${userPass}@files.z0drtau.mongodb.net/?retryWrites=true&w=majority`;

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => console.log('connected'))
  .catch((err) => console.log(err));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT ?? 3001;

const array_of_allowed_files = ['png', 'jpeg', 'jpg', 'pdf'];

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = __dirname + '\\' + req.query.supplierId;
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, `${uploadPath}`);
  },
  filename: function (req, file, cb) {
    const file_extension = file.originalname.slice(
      ((file.originalname.lastIndexOf('.') - 1) >>> 0) + 2,
    );
    if (!array_of_allowed_files.includes(file_extension)) {
      throw Error('Invalid file');
    }

    cb(null, file.originalname);
  },
});

const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });


app.get('/files', (req, res) => {
  Files.find({})
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    });
});
app.post('/upload', upload.single('file'), (req, res) => {
  const post = new Files({
    supplierName: req.query.supplierId,
    path: __dirname + '\\' + req.query.supplierId,
  });
  post
    .save()
    .then((res) => console.log('post'))
    .catch((err) => console.log(err));
  return res.status(200).send('File uploaded successfully');
});

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}...`);
});
