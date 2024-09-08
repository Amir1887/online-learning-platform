require('dotenv').config();
const cors = require('cors');
const jwtSecret = process.env.JWT_SECRET;
const clerkApiKey = process.env.VITE_CLERK_PUBLISHABLE_KEY;

const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

// Middleware and other setups
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// Import route handlers
const categoriesRouter = require('./routes/categories');
const coursesRouter = require('./routes/courses');

// Use route handlers
app.use('/categories', categoriesRouter);
app.use('/courses', coursesRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
