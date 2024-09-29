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

router.post('/course/:courseId/lesson/:lessonId/create-assignment', async (req, res) => {
    const { courseId, lessonId } = req.params;
    const { title,questions } = req.body;
  
    try {
      // Store assignment with assignment_data as JSONB
        const result = await pool.query(
        `INSERT INTO "Assignment" (title, "courseId", "lessonId", assignments) 
         VALUES ($1, $2, $3, $4) RETURNING *`,
       [title, courseId, lessonId, { questions }] );
    
       res.status(201).json(result.rows[0]); // Return the newly created assignment

    } catch (error) {
        console.error('Error creating assignment:', error);
        res.status(500).json({ error: 'Error creating assignment' });
    }
});

module.exports = router;