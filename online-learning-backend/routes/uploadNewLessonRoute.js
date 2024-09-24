const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');  // Correct import
const prisma = new PrismaClient();  // Initialize Prisma
const { v4: uuidv4 } = require('uuid');


// Configure storage for uploaded lessons
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../uploadedLessons'));
    },
    filename: (req, file, cb) => {
        // Use UUID for unique file naming to avoid clashes
        const uniqueSuffix = uuidv4();
        cb(null, `${uniqueSuffix}-${Date.now()}${path.extname(file.originalname)}`);
    }
});




  const upload = multer({
    storage: storage,
  });

  // adding multer specific error in middleware!
  router.post('/course/:id/upload-new-lesson',  (req, res, next) => {
    upload.fields([{ name: 'title' }, { name: 'description' }, { name: 'attachments'}, { name: 'attachmentLinks'}, { name: 'video'}, { name: 'videoLink'}])(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            // Multer-specific errors
            return res.status(400).send(`Multer error: ${err.message}`);
        } else if (err) {
            // Unknown errors
            return res.status(500).send(`Server error: ${err.message}`);
        }
        next();
    });
}, async (req, res) => {
    const courseId = req.params.id;
    console.log("Request courseId:", courseId);

    const files = req.files;
    const OtherInfo = req.body;

    //filtering
    if (files.video && files.video.length > 0 && !files.video[0].mimetype.startsWith('video')) {
      return res.status(400).send('Invalid video format.');
  }
  
    if (files.attachments) {
        const invalidAttachments = files.attachments.filter(file => !['application/pdf', 'image/jpeg', 'image/png'].includes(file.mimetype));
        if (invalidAttachments.length > 0) {
          return res.status(400).send('One or more attachments have invalid format. Allowed formats are: PDF, JPEG, and PNG.');
        }
    }

    // if (files.video && OtherInfo.videoLink) {
    //     return res.status(400).send('Provide either a video file or a video link, not both.');
    // }
    // if (files.attachments && OtherInfo.attachmentLinks) {
    //     return res.status(400).send('Provide either attachments or an attachment link, not both.');
    // }
    

    //You may want to ensure that at least one of the required fields is present.
    if (!files || (!files.video && !files.attachments && !files.attachmentLinks && !files.videoLink)) {
        return res.status(400).send('No files or valid fields uploaded.');
    }
    
    // it's better to ensure that both fields are present together.
    if (!OtherInfo.title || !OtherInfo.description) {
        return res.status(400).send('Both title and description must be provided.');
    }
    
    
    let AddedLesson;
    try {
        const videoPath = files.video ? `/uploadedLessons/${files.video[0].filename}` : null;
        const attachmentPaths = files.attachments ? files.attachments.map(file => `/uploadedLessons/${file.filename}`) : null;

      // Debugging::::::::::::::::::::::

      // Check if course exists
      const course = await prisma.course.findUnique({
        where: { id: parseInt(courseId) }
      });
      console.log("single course table: ",course);

      if (!course) {
        console.error('Course not found:', courseId);
        return res.status(404).send('Lesson not found.');
      }

      console.log("Lesson found, updating:", {
        title:OtherInfo.title,
        content:OtherInfo.description,
        attachments:OtherInfo.attachmentLinks,
        videourl:OtherInfo.videoLink,
        videopath: videoPath,
        attachmentpath: attachmentPaths ? attachmentPaths.join(',') : null,

      });

    // Formatting attachmentLinks to be an array of objects
    const formattedAttachmentLink = Array.isArray(OtherInfo.attachmentLinks) 
    ? OtherInfo.attachmentLinks.map(link => ({ url: link })) // Map each link to an object
    : OtherInfo.attachmentLinks 
      ? [{ url: OtherInfo.attachmentLinks }] // Handle single link case
      : []; // Default to an empty array if no links are provided

    // Debugging print statement
    console.log("Formatted Attachment Links:", formattedAttachmentLink);

          //----------------------------------------------------------- upload to db 
          AddedLesson = await prisma.lesson.create({
            data: {
                courseId: Number(courseId),
                title:OtherInfo.title,
                content:OtherInfo.description,
                attachments:formattedAttachmentLink,
                videourl:OtherInfo.videoLink,
                videopath: videoPath,
                attachmentpath: attachmentPaths ? attachmentPaths.join(',') : null,
            }
          });
      
          console.log('Lesson Added successfully:', AddedLesson);
          res.json({ message: 'Lesson  saved to database', AddedLesson });
   } catch (error) {
    console.error('Error saving lesson to database:', error);
    res.status(500).send(`Server error while saving lesson: ${error.message}`);
    }
  })

  module.exports = router;