import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import UploadPhoto from './UploadPhoto';

const CoursePage = () => {
  const { id } = useParams();  // Get course ID from the URL
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch course details by ID
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/course/${id}`);
        setCourse(res.data);
        setLoading(false);
        // console.log("course details",course);
      } catch (err) {
        console.error('Error fetching course:', err);
        setError('Failed to load course details');
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) return <div>Loading course...</div>;
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
      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-4">Lessons</h2>
        <ul className="list-disc pl-6">
          {course.lessons && course.lessons.length > 0 ? (
            course.lessons.map(lesson => (
              <li key={lesson.id} className="mb-2">
                {lesson.title} - {lesson.content}
              </li>
            ))
          ) : (
            <p>No lessons available for this course.</p>
          )}
        </ul>
      </div>
{/* USERS enrolled to this course */}
<div className="my-8">
  {course.enrolledUsers && course.enrolledUsers.length > 0 ? (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
        Enrolled Users for this Course
      </h1>
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
  ) : (
    <p className="text-gray-500">No enrolled users for this course!</p>
  )}
</div>


    
{/* Submissions Section */}
<div className="my-8">
  <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
    Submissions
  </h2>
  {course.submissions && course.submissions.length > 0 ? (
    <div className="space-y-4">
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
    <p className="text-gray-500">No submissions available for this course.</p>
  )}
</div>

    </div>
    </div>
  );
};

export default CoursePage;
