const express = require('express');
const { Pool } = require('pg');
const router = express.Router();

// Create a new Pool instance with your database configuration
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'LearningDb',
  password: 'postgress',
  port: 5432,
});

router.get("/:id", async(req, res)=>{
    const {id} = req.params;
    const enrollmentQuery = `SELECT * FROM "Enrollment" where "courseId" = $1`
    const enrollmetnResult = await pool.query(enrollmentQuery, [id]);
    console.log(enrollmetnResult);

    if (enrollmetnResult.rows.length > 0) {
        return res.json({ status: 'enrolled', message: 'User is already enrolled' });
      }
});

module.exports = router;