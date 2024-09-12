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

router.post("/", async (req, res) => {
    const { email } = req.body;
  
    try {
      // Check if the email exists in the User table
      const userResult = await pool.query('SELECT * FROM "User" WHERE email = $1', [email]);
  
      if (userResult.rows.length > 0) {
        return res.json({ type: "user", data: userResult.rows[0] });
      }
  
      // Check if the email exists in the Author table
      const authorResult = await pool.query('SELECT * FROM "Author" WHERE email = $1', [email]);
  
      if (authorResult.rows.length > 0) {
        return res.json({ type: "author", data: authorResult.rows[0] });
      }
  
      res.status(404).json({ error: "User not found" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
