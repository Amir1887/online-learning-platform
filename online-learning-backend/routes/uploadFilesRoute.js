const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');  // Correct import
const prisma = new PrismaClient();  // Initialize Prisma

// Configure storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../uploadedFiles')); // Folder to save files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename file with timestamp
  }
});

// File filtering for video and PDF uploads
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'video/mp4' || file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only MP4 videos and PDFs are allowed.'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

// http://localhost:4000/lesson/upload-file/1
// Handle video and file upload by the author
router.post('/lesson/upload-file/:id', upload.fields([{ name: 'video' }, { name: 'attachments' }]), async (req, res) => {
    const lessonId = req.params.id;
    console.log("Request lessonId:", lessonId);
    const files = req.files;
  
    if (!files || (!files.video && !files.attachments)) {
      return res.status(400).send('No files uploaded.');
    }
  

    let updatedLesson;
    try {
      const videoPath = files.video ? `/uploadedFiles/${files.video[0].filename}` : null;
      const attachmentPaths = files.attachments ? files.attachments.map(file => `/uploadedFiles/${file.filename}`) : null;
  
      // Debugging: >>>>>>>>>>>>>>

      // Check if lesson exists
      const lesson = await prisma.lesson.findUnique({
        where: { id: parseInt(lessonId) }
      });
      
      console.log("single lesson table: ",lesson);
      // const lesson = await prisma.lesson.findMany();
      // const lesson = await prisma.$queryRaw`SELECT * FROM "Lesson"`;



      
      if (!lesson) {
        console.error('Lesson not found:', lessonId);
        return res.status(404).send('Lesson not found.');
      }
      
      console.log("Lesson found, updating:", {
        videopath: videoPath,
        attachmentpath: attachmentPaths ? attachmentPaths.join(',') : null
      });
  
      
    //----------------------------------------------------------- upload to db 
      updatedLesson = await prisma.lesson.update({
        where: { id: Number(lessonId) },
        data: {
          videopath: videoPath,
          attachmentpath: attachmentPaths ? attachmentPaths.join(',') : null
        }
      });
  
      console.log('Lesson updated successfully:', updatedLesson);
      res.json({ message: 'Files uploaded and paths saved to database', updatedLesson });
    } catch (error) {
      console.error('Error saving file paths to database:', error);
      res.status(500).send('Server error while saving files.');
    }
  });
  
  

module.exports = router;
