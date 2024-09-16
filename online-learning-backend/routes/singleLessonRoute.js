
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

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
            
    const LessonQuery = 
   'SELECT * FROM "Lesson" WHERE id = $1';

 const LessonResult = await pool.query(LessonQuery, [id]);

     // 1st check course existence 
     if (LessonResult.rows.length === 0) {
        return res.status(404).json({ error: 'Lesson not found' });
     }

     const LessonData = LessonResult.rows[0];
     res.json(LessonData);

    } catch (error) {
        console.error('Error fetching course:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;