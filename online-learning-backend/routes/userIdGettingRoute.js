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
    // Extract query parameters
    const { courseId, lessonId, assignmentId } = req.query; 

    try {
        // Fetch the user based on authId
        const result = await pool.query(`SELECT id, email, name, createdAt, updatedAt FROM "User" WHERE "authId" = $1`, [userId]);  
        
        // Check if user exists and extract data safely
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const userData = result.rows[0];

        // Create response object directly
        const responseData = {
            LoggedInUserId: userData.id,
            LoggedInUserEmail: userData.email,
            LoggedInUserName: userData.name,
            LoggedInUserCreatedAt: userData.createdAt,
            LoggedInUserUpdatedAt: userData.updatedAt,
        };

        return res.status(200).json(responseData);   
    } catch (error) {
        console.error('Error fetching userId:', error);  
        return res.status(500).json({ error: 'Internal server error' });  
    }
});

module.exports = router;
