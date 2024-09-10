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
    const result = await pool.query(
      `SELECT c.*, a.name as author_name, a.image as author_image, a."totalReviews" as author_totalReviews, 
              json_agg(json_build_object('lesson_id', l.id, 'title', l.title, 'content', l.content)) as lessons 
       FROM "Course" c 
       JOIN "Author" a ON c."authorId" = a.id 
       LEFT JOIN "Lesson" l ON l."courseId" = c.id 
       WHERE c.id = $1
       GROUP BY c.id, a.id`,
       [id]
    );
    //json_build_object: This creates a JSON object for each lesson, containing the lesson's id, title, and content.
    // json_agg: This aggregates the Lesson data for each course into a JSON array, making it easier to handle in the frontend.
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
