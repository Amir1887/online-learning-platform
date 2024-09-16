import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import axios from 'axios';
import UploadPhoto from './UploadPhoto';
import useUserRole from '../useUserRole';

const CoursePage = () => {
  const { id } = useParams();  // Get course ID from the URL
  const [course, setCourse] = useState(null);
  const [isloading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const {userType, loading} = useUserRole();
  


  useEffect(() => {
    // Fetch course details by ID
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/course/${id}`);
        setCourse(res.data);
        setIsLoading(false);
        // console.log("course details",course);
      } catch (err) {
        console.error('Error fetching course:', err);
        setError('Failed to load course details');
        setIsLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (isloading) return <div>Loading course...</div>;
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>

    <div className="mt-4 ml-4">
    <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
    <p className="text-gray-700 mb-6">{course.description}</p>
    </div>

    
          {/* Author Information */}
        <div className="flex items-center gap-6 p-4 border rounded-lg shadow-lg">
        <img
          src={course.author_image}  
          alt={course.author_name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h3 className="text-2xl font-semibold">{course.author_name}</h3>
          <p>Total Reviews: {course.author_totalreviews}</p>
        </div>
      </div>


    {/* image of the course will be here  */}
    <div>
      <UploadPhoto/>
    </div>

    <div className="max-w-3xl  p-6">

      {/* Add more details like lessons or assignments */}

{/* Lessons Section */}
<div className="my-8">
  <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
    Lessons
  </h2>
  {course.lessons && course.lessons.length > 0 ? (
    <div className="space-y-4 ml-7">
      {course.lessons.map((lesson, index) => (
        <Link
          to={`/dashboard/course/${course.id}/lesson/${lesson.lesson_id}`}
          key={lesson.lesson_id}
          className="border border-gray-200 shadow-md rounded-lg p-4 transition hover:shadow-lg hover:border-blue-400"
        >
          <h3 className="font-semibold text-xl text-blue-600">
            Lesson {index + 1}: {lesson.title} 
          </h3>
          <p className="text-gray-600 mt-2">{lesson.content}</p>
        </Link>
      ))}
    </div>
  ) : (
    <p className="text-gray-500">No lessons available for this course.</p>
  )}
</div>



{/* USERS enrolled to this course */}
      {/* Conditionally render based on role */}
  {userType === "author" &&(
    <div className="my-8">
    {course.enrolledUsers && course.enrolledUsers.length > 0 ? (
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
          Enrolled Users for this Course
        </h1>
      <div className="space-y-4 ml-7">
    
        {course.enrolledUsers.map((user, index) => (
          <div
            key={index}
            className="border border-gray-200 shadow-md rounded-lg p-4 transition hover:shadow-lg hover:border-blue-400"
          >
            <h2 className="font-semibold text-xl text-blue-600">
              Username: {user.name}
            </h2>
            <p className="text-gray-700">
              <span className="font-medium text-gray-600">Email:</span> {user.email}
            </p>
          </div>
        ))}
      </div>
      </div>
    ) : (
      <p className="text-gray-500">No enrolled users for this course!</p>
    )}
  </div>
  )}

{/* ASSIGNMENT Section */}
<div>
  <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Assignments</h2>
<div className="my-8 ml-7">
  {course.assignments && course.assignments.length > 0 ? (
    <div className="space-y-4">
      {course.assignments.map((assignment, index) => (
        <div key={index} className="border border-gray-200 shadow-md rounded-lg p-4 transition hover:shadow-lg hover:border-blue-400">
          <h3 className="font-semibold text-xl text-blue-600">Assignment: {assignment.title}</h3>
          <p className="text-gray-600 mt-2">{assignment.content}</p>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-gray-500">No assignments for this course yet.</p>
  )}
</div>
</div>


{/* Submissions Section */}
    {/* Conditionally render based on role */}
{userType === "author" && (
  <div className="my-8">
  <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
    Submissions
  </h2>
  {course.submissions && course.submissions.length > 0 ? (
    <div className="space-y-4 ml-7">
      {course.submissions.map((submission, index) => (
        <div
          key={index}
          className="border border-gray-200 shadow-md rounded-lg p-4 transition hover:shadow-lg hover:border-blue-400"
        >
          <h3 className="font-semibold text-xl text-blue-600">
            Assignment: {submission.assignment_title}
          </h3>
          <p className="text-gray-600 mb-2">
            <span className="font-medium text-gray-700">Assignment Content:</span> {submission.assignment_content}
          </p>
          <p className="text-gray-700 mb-1">
            <span className="font-medium text-gray-700">Submitted by:</span> {submission.user_name}
          </p>
          <p className="text-gray-600">
            <span className="font-medium text-gray-700">Submission Content:</span> {submission.submission_content}
          </p>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-gray-500 ml-7">No submissions available for this course.</p>
  )}
</div>
)}



{/* RATINGS Section */}
<div>
  <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Ratings</h2>
<div className="my-8 ml-7">
  {course.reviews && course.reviews.length > 0 ? (
    <div className="space-y-4">
      {course.reviews.map((rating, index) => (
        <div key={index} className="border border-gray-200 shadow-md rounded-lg p-4 transition hover:shadow-lg hover:border-blue-400">
          <h3 className="font-semibold text-xl text-blue-600">Rating: {rating.rating}</h3>
          <p className="text-gray-600 mt-2">Review: {rating.review_content}</p>
          <p className="text-gray-700 mt-1">Submitted by: {rating.reviewer_name}</p>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-gray-500">No ratings available for this course.</p>
  )}
</div>
</div>


  {/* enrollment Section */}
  {userType === "user" && (
      <Link to={`/dashboard/course/${course.id}/enrollment`} className='border border-gray-400  max-w-7xl w-full rounded-xl bg-blue-500 hover:bg-blue-600 hover:text-white cursor-pointer font-bold text-xl text-center p-3'>
      <button>Enroll to this Course</button>
    </Link>
    
  )}
    </div>
    </div>
  );
};

export default CoursePage;
