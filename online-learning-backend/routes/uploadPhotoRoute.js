// backend/routes/uploadPhotoRoute.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const { PrismaClient } = require('@prisma/client');  // Correct import
const prisma = new PrismaClient();  // Initialize Prisma

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

//http://localhost:4000/upload-photo/${id}
// Route to handle file uploads
router.post('/upload-photo/:id', upload.single('photo'), async(req, res) => {
  const {id} = req.params; 
  // console.log("id of the course :", id);

  let updatedCourse;
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).send('No file uploaded.');
    }
  
 
    const newPhoto = file ? `/uploads/${file.filename}` : null;
    
    // Check if course exists by diff ways for debugging :
    // const course = await prisma.course.findUnique({
    //   where: { id: parseInt(id) }
    // });
    // const course = await prisma.course.findMany();
    // console.log(" course table: ",course);
    const course = await prisma.$queryRaw`SELECT * FROM "Course"`;
 

    if (!course) {
      console.error('course not found:', id);
      return res.status(404).send('course not found.');
    }

    // logging updates before sending it to db:
    console.log("course found, updating:", {
      image: newPhoto
    });

    //----------------------------------------------------------- upload to db 
    updatedCourse = await prisma.course.update({
      where: { id: Number(id) },
      data: {
        image: newPhoto,
      }
    });

    console.log('Course updated successfully:', updatedCourse);
    res.json({ message: 'Image uploaded and  saved to database', updatedCourse });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).send('Error uploading file.');
  }
});


   

module.exports = router;
