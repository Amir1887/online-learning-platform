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


router.post('/course/:courseId/lesson/:lessonId/assignment-submit/:assignmentId', async (req, res) => {
    const { courseId, lessonId, assignmentId } = req.params;
    const { userId, answers } = req.body;

    const userIdFK = await pool.query(
        `SELECT id FROM "User" WHERE "authId" = $1`,[userId]
    );

    try {
        // Store assignment with assignment_data as JSONB
          const result = await pool.query(
          `INSERT INTO "Submission" (content, "assignmentId", "userId") 
           VALUES ($1, $2, $3) RETURNING *`,
         [answers, assignmentId, userIdFK]);
      
         res.status(201).json(result.rows[0]); // Return the newly created assignment
  
      } catch (error) {
          console.error('Error submitting your answer:', error);
          res.status(500).json({ error: 'Error submitting your answer' });
      }
});

module.exports = router;