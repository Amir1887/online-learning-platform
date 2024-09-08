const express = require('express');
const { Pool } = require('pg');  // Import Pool from pg module
const router = express.Router();


// Create a new Pool instance with your database configuration
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'LearningDb',
    password: 'postgress',
    port: 5432,
  });

// GET /categories
router.get('/', async (req, res) => {
  try {
    // Run a query to fetch all categories from the database
    const { rows: categories } = await pool.query('SELECT * FROM "Category"');
   
    res.json(categories);
  } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({ error: 'Internal Server Error' });
   
  }
});

module.exports = router;
