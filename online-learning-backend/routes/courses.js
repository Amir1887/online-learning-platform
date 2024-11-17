const express = require('express');
const { Pool } = require('pg');
const router = express.Router();

// Create a new Pool instance with your database configuration
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'LearningDb',
  password: 'postgress',
  port: 5432,
});

// GET /courses
router.get('/', async (req, res) => {
  const categoryId = parseInt(req.query.category, 10);
  // if (isNaN(categoryId)) {
  //   return res.status(400).json({ error: 'Invalid category ID' }); // Checking for valid category ID
  // }
  try {
    let query = `SELECT c.*, a.name AS author_name, a.image AS author_image 
    FROM "Course" c 
    JOIN "Author" a ON c."authorId" = a.id`;

    const params = [];

    if (categoryId) {
      query += ' WHERE "categoryId" = $1'; // filtering 
      params.push(categoryId);
    }

    const { rows: courses } = await pool.query(query, params);
    res.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ error: 'Internal Server Error' });
    return; // Prevents further execution
  }
});

module.exports = router;
