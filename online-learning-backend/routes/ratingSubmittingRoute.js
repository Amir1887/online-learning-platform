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

router.post('/course/:id/reviews', async(req, res) => {
    const {review_content, rating_count,  userIdFromDb } = req.body;
    const courseId = req.params.id;
    console.log("user iD ", rating_count);
  
    try {
        const submissionQuery = `
        INSERT INTO "Review" (content, rating, "userId", "courseId")
        VALUES ($1, $2, $3, $4)
      `;
      
    const submissionResult = await pool.query(submissionQuery, [review_content, rating_count, userIdFromDb, courseId]);


 if (submissionResult.rows.length === 0) {
    return res.status(404).json({ error: 'Error submitting review' });
 }

 const submissionData = submissionResult.rows[0];
      res.status(200).json({ message: 'Review submitted successfully', submissionData});
    } catch (error) {
        console.error('Error submitting review:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

  });
  

module.exports = router;

