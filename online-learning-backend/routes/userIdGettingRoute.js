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


router.get('/user/find-id-from-db/:userId', async (req, res) => { 
    const { userId } = req.params; 
    const { courseId, lessonId, assignmentId } = req.query; //  extracting them  from query parameters  
   

    try {
      // Fetch the assignment based on assignmentId and lessonId  
        const userIdResult = await pool.query(  
        `SELECT * FROM "User" WHERE "authId" = $1 `, [userId]);  
         console.log("userId result", userIdResult);  
        // Extracting the results  
        const idResult = userIdResult.rows.length > 0 ? userIdResult.rows[0] : null; 
        console.log("id after extraction from object", idResult);
        res.status(200).json(idResult);   
    } catch (error) {
        console.error('Error fetching userId:', error);  
        res.status(500).json({ error: 'Internal server error' });  
    }
 });

 module.exports = router;