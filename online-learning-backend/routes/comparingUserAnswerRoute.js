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

router.get('/course/:courseId/lesson/:lessonId/assignment-compare/:assignmentId', async (req, res) => {  
    const { lessonId, assignmentId } = req.params;  

    try {  
        // Fetch the assignment based on assignmentId and lessonId  
        const assignmentResult = await pool.query(  
            `SELECT assignments FROM "Assignment" WHERE id = $1 AND "lessonId" = $2`,  
            [assignmentId, lessonId]  
        );  
        console.log("assignment result", assignmentResult);  

        // Fetch submissions for the given assignmentId  
        const submissionResult = await pool.query(  
            `SELECT content, "assignmentId", "userId", "createdAt" FROM "Submission" WHERE "assignmentId" = $1`,  
            [assignmentId]  
        );  
        console.log("submission result", submissionResult);  

        // Extracting the results  
        const assignment = assignmentResult.rows.length > 0 ? assignmentResult.rows[0] : null;  
        const submissions = submissionResult.rows;  

        // Preparing the response  
        const response = {  
            assignment,  
            submissions  
        };  

        // Sending response back to client  
        res.status(200).json(response);  
    } catch (error) {  
        console.error('Error fetching data:', error);  
        res.status(500).json({ error: 'Internal server error' });  
    }  
});  

module.exports = router;