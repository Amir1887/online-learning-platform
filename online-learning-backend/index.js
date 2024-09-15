const express = require('express');
const cors = require('cors');
require('dotenv').config();

const categoriesRouter = require('./routes/categories');
const coursesRouter = require('./routes/courses');
const courseRouter = require('./routes/singleCourseRoutes');
const uploadPhotoRouter = require('./routes/uploadPhotoRoute'); 
const checkUserTypeRouter = require('./routes/authRoutes'); 



const app = express();
const port = process.env.PORT || 4000;

// Middleware and other setups
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true,
}));
app.use(express.static('uploads')); // Serve static files (uploaded images)

// Use route handlers
app.use('/dashboard/categories', categoriesRouter);
app.use('/dashboard/courses', coursesRouter);
app.use('/course', courseRouter);
app.use('/upload-photo', uploadPhotoRouter); 
app.use('/check-user-type', checkUserTypeRouter); 

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
