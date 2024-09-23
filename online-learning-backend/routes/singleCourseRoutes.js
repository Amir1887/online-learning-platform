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

// GET /course/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { userId } = req.query; // Expecting the logged-in user ID to be sent in the query params

  try {
    // Query to get the course details along with the author and lessons
    const courseQuery = `
      SELECT c.*,  a.name as author_name, a.image as author_image, a."totalReviews" as author_totalReviews, 
             json_agg(json_build_object('lesson_id', l.id, 'title', l.title, 'content', l.content)) as lessons 
      FROM "Course" c 
      JOIN "Author" a ON c."authorId" = a.id 
      LEFT JOIN "Lesson" l ON l."courseId" = c.id 
      WHERE c.id = $1
      GROUP BY c.id, a.id
    `;

    //query to get all the courses made by single author
  // Replace the singleAuthorCourses query with this:
    const singleAuthorCourses = `
    SELECT c.id as course_id, c.title as course_title, c.description as course_description, c.image as course_image
    FROM "Course" c
    WHERE c."authorId" = (
      SELECT "authorId" FROM "Course" WHERE id = $1
    )
    `;


    // Query to get enrolled users
    const usersQuery = `
      SELECT u.id AS user_id, u.name, u.email 
      FROM "User" u
      JOIN "Enrollment" e ON e."userId" = u.id
      WHERE e."courseId" = $1
    `;

    // Query to get enrollment status for the current user
    const enrollmentQuery = `
    SELECT e.paymentstate, e.paymentmethod 
    FROM "Enrollment" e
    JOIN "User" u ON u.id = e."userId"
    WHERE e."courseId" = $1 AND u."authId" = $2
  `;
  

    // Fetch all data in parallel using Promise.all
    const [courseResult, usersResult, enrollmentResult, singleAuthorResult] = await Promise.all([
      pool.query(courseQuery, [id]),
      pool.query(usersQuery, [id]),
      pool.query(enrollmentQuery, [id, userId]), // Fetch enrollment status for the specific user     
      pool.query(singleAuthorCourses, [id]),    
    ]);

    // Check if course exists
    if (courseResult.rows.length === 0) {
      return res.status(404).json({ error: 'Course not found' });
    }

    const courseData = courseResult.rows[0];

    // Add enrolled users to the courseData
    courseData.enrolledUsers = usersResult.rows;
     // Add singleAuthorResult to the courseData
    courseData.singleAuthorCourses = singleAuthorResult.rows;

    // Add enrollment status for the current user to the courseData
    if (enrollmentResult.rows.length > 0) {
      courseData.enrollmentStatus = enrollmentResult.rows[0];
    } else {
      courseData.enrollmentStatus = null; // User is not enrolled
    }

    res.json(courseData);
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
