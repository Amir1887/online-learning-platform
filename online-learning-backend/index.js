const express = require('express');
const cors = require('cors');
require('dotenv').config();

const categoriesRouter = require('./routes/categories');
const coursesRouter = require('./routes/courses');
const courseRouter = require('./routes/singleCourseRoutes');
const uploadPhotoRouter = require('./routes/uploadPhotoRoute'); 
const uploadFileRouter = require('./routes/uploadFilesRoute'); 
const uploadNewLessonRoute = require('./routes/uploadNewLessonRoute'); 
const checkUserTypeRouter = require('./routes/authRoutes'); 
const lessonRouter = require('./routes/singleLessonRoute'); 
const assignmentRouter = require('./routes/assignmentRoute'); 
const assignmentGettingRouter = require('./routes/assignmentsGettingRoute'); 
const assignmentSubmitRouter = require('./routes/assignmentSubmitRoute'); 
const comparingUserAnswerRouter = require('./routes/comparingUserAnswerRoute'); 
const userIdGettingRouter = require('./routes/userIdGettingRoute'); 
const ratingSubmittingRouter = require('./routes/ratingSubmittingRoute'); 
const path = require('path');




const app = express();
const port = process.env.PORT || 4000;

// Middleware and other setups
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true,
}));
// app.use(express.static('uploads')); 
app.use(express.static(path.join(__dirname, '../uploads'))); // Serve static files (uploaded images)
// app.use(express.static('uploadedFiles')); 
app.use('/uploadedFiles', express.static(path.join(__dirname, '../uploadedFiles')));// Serve static files (uploaded files)
app.use('/uploadedLessons', express.static(path.join(__dirname, '../uploadedLessons')));


// Use route handlers
app.use('/dashboard/categories', categoriesRouter);
app.use('/dashboard/courses', coursesRouter);
app.use('/course', courseRouter);
app.use('/', uploadPhotoRouter); 
app.use('/', uploadFileRouter); 
app.use('/', uploadNewLessonRoute); 
app.use('/check-user-type', checkUserTypeRouter); 
app.use('/lesson', lessonRouter); 
app.use('/', assignmentRouter); 
app.use('/', assignmentGettingRouter); 
app.use('/', assignmentSubmitRouter); 
app.use('/', comparingUserAnswerRouter); 
app.use('/', userIdGettingRouter); 
app.use('/', ratingSubmittingRouter); 


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
