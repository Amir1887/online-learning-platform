// courses.js in backend

const express = require('express');
const { Pool } = require('pg');
const router = express.Router();

// PostgreSQL connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'LearningDb',
  password: 'postgress',
  port: 5432,
});

// GET /course/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // We query the Course and join the Author table to fetch the author's name, image, and total reviews alongside the course data.                                                       
    const result = await pool.query(
      `SELECT c.*, a.name as author_name, a.image as author_image, a."totalReviews"  as author_totalReviews 
       FROM "Course" c 
       JOIN "Author" a ON c."authorId" = a.id 
       WHERE c.id = $1`,
       [id]);
    console.log("query result", result);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
