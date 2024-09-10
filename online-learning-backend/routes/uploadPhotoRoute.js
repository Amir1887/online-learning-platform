// backend/routes/uploadPhotoRoute.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Configure storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../uploads')); // Adjust this to point to the project root
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename file
  }
});

const upload = multer({ storage: storage });

// Route to handle file uploads
router.post('/', upload.single('photo'), (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).send('No file uploaded.');
    }
    res.json({ filePath: `/uploads/${file.filename}` });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).send('Error uploading file.');
  }
});

module.exports = router;
