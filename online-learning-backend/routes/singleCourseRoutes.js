// courses.js in backend

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

  try {
    // Query to get the course, author, and lessons
    const courseQuery = `
      SELECT c.*, a.name as author_name, a.image as author_image, a."totalReviews" as author_totalReviews, 
             json_agg(json_build_object('lesson_id', l.id, 'title', l.title, 'content', l.content)) as lessons 
      FROM "Course" c 
      JOIN "Author" a ON c."authorId" = a.id 
      LEFT JOIN "Lesson" l ON l."courseId" = c.id 
      WHERE c.id = $1
      GROUP BY c.id, a.id
    `;

    
   //json_build_object: This creates a JSON object for each lesson, containing the lesson's id, title, and content.
   //json_agg: This aggregates the Lesson data for each course into a JSON array, making it easier to handle in the frontend.

    // Query to get enrolled users
    const usersQuery = `
      SELECT u.id, u.name, u.email 
      FROM "User" u
      JOIN "Enrollment" e ON e."userId" = u.id
      WHERE e."courseId" = $1
    `;

    // Query to get submissions for the course
    const submissionsQuery = ` 
    SELECT 
      s.content AS submission_content, 
      s.id AS submission_id, 
      u.name AS user_name,
      a.title AS assignment_title,
      a.content AS assignment_content,
      s."assignmentId" AS assignment_id
    FROM "Submission" s
    JOIN "User" u ON s."userId" = u.id
    JOIN "Assignment" a ON s."assignmentId" = a.id
    WHERE a."courseId" = $1
  `;
  
  // Query to get assignments of course
  const assignmentQuery = `
    SELECT a.title, a.content
    FROM "Assignment" as a
    WHERE "courseId" = $1
  `
    
  // Query to get review of course
  const reviewsQuery = `
  SELECT r.content AS review_content, r.rating, u.name AS reviewer_name
  FROM "Review" r
  JOIN "User" u ON r."userId" = u.id
  WHERE r."courseId" = $1
`;
  // we are executing three database queries (courseQuery, usersQuery, and submissionsQuery) concurrently. Instead of running them sequentially (one after the other)
  //The second argument [id] is passed to the query to fill in the placeholder (a WHERE clause that filters the course by its id)
    const [courseResult, usersResult, submissionsResult, assignmentResult, reviewResult] = await Promise.all([
      pool.query(courseQuery, [id]),
      pool.query(usersQuery, [id]),
      pool.query(submissionsQuery, [id]),
      pool.query(assignmentQuery, [id]),
      pool.query(reviewsQuery, [id]),
 
    ]);

    // 1st check course existence 
    if (courseResult.rows.length === 0) {
      return res.status(404).json({ error: 'Course not found' });
    }
    const courseData = courseResult.rows[0];

 

    //This adds the array of users (retrieved by the usersQuery) to the courseData object under the property enrolledUsers.
    courseData.enrolledUsers = usersResult.rows;

    //This adds the array of submissions (retrieved by the submissionsQuery) to the courseData object under the property submissions.
    courseData.submissions = submissionsResult.rows;
    courseData.assignments = assignmentResult.rows;
    courseData.reviews = reviewResult.rows;

    res.json(courseData);
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;


