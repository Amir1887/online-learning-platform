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




router.get('/course/:courseId/lesson/:lessonId/assignments-to-lesson', async (req, res) => {
    const { courseId, lessonId } = req.params;

    try {
        const assignmentQuery = 
        'SELECT * FROM "Assignment" WHERE "courseId" = $1 AND "lessonId" = $2';
    
        const assignmentResult = await pool.query(assignmentQuery, [courseId, lessonId]);
        console.log("assignmentResult:",assignmentResult);
             // 1st check  existence 
             if (assignmentResult.rows.length === 0) {
                return res.status(404).json({ error: 'No Assignments for this Lesson' });
             }
    
              // Return all assignments  
        res.json(assignmentResult.rows); // Just return rows here  
    } catch (error) {
        console.error('Error fetching course:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

});

module.exports = router;