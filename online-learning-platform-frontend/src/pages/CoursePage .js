import React, { useEffect, useState } from 'react';
import { useCourse } from '../context/MyCourseContext'; // Import the custom hook 
import { Link, useParams } from 'react-router-dom';


import UploadPhoto from './UploadPhoto';
import useUserRole from '../useUserRole';
import axios from 'axios';
import { useUser } from '../context/UserContext';


const CoursePage = () => {
  const { course,  isLoading,  error} = useCourse(); // Access the context 
  const {userIdFromDb} = useUser();
  console.log("course from single course page", course);
  const { id } = useParams();  // Get course ID from the URL
  const {userType, loading} = useUserRole();

    // State to track whether all lessons are shown
    const [showAllLessons, setShowAllLessons] = useState(false);
    // Determine whether to show all lessons or just the first 3  
  const lessonsToShow = course && course.lessons ? (showAllLessons ? course.lessons : course.lessons.slice(0, 3)) : [];
 
  //to conditionally render asignment
  const [showAllAssignments, setShowAllAssignments] =useState(false);
  const assignmentsToShow = course && course.assignmetData ? (showAllAssignments ? course.assignmetData: course.assignmetData.slice(0,3)) :[];
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0); // To store the star rating
  const [hover, setHover] = useState(0); // To highlight stars on hover
  function handleReviews(e){
    setReview(e.target.value);
  }
  function handleStarClick(ratingValue) {
    setRating(ratingValue); // Capture the selected star rating
  }
 async function SubmitReviews(e){
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:4000/course/${id}/reviews`, {
        review_content: review,
        rating_count: rating, // Send the rating
        userIdFromDb,
      });
      console.log(res);
    } catch (error) {
      console.error("Error submitting review", error);
    }
    
  }

if (isLoading) return <div>Loading course...</div>;
if (error) return <div>{error}</div>;
if (!course) return <div>No course data available</div>;
if (loading) return <div>Loading...</div>;


  return (
    <div>

    <div className="mt-4 ml-4">
    <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
    <p className="text-gray-700 mb-6">{course.description}</p>
    </div>

     
          {/* Author Information */}
        <Link to={`/dashboard/course/${id}/author-profile`}>
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
      </Link>


    {/* image of the course will be here  */}
    <div>
      <UploadPhoto id={id} course_image={course.image}/>
    </div>

    <div className="max-w-3xl  p-6">

      {/* Add more details like lessons or assignments */}

{/* Lessons Section */}
<div className="my-8">
  <div className='flex justify-between items-center border-b pb-4 mb-4'>
    <h2 className="text-2xl font-bold text-gray-800">
      Lessons
    </h2>


    {userType === "author" && (
         <Link to={`/dashboard/course/${id}/add-lesson`} className="text-blue-600 hover:underline">
         Add New Lesson
       </Link>
    )}
  </div>

  {course.lessons && course.lessons.length > 0 ? (
    <div className="space-y-4 ml-7">
       {lessonsToShow.map((lesson, index) => (
        <Link
          to={`/dashboard/course/${course.id}/lesson/${lesson.lesson_id}`}
          key={lesson.lesson_id}
          className="block border border-gray-200 shadow-md rounded-lg p-4 transition hover:shadow-lg hover:border-blue-400"
        >
          <div>
            <h3 className="font-semibold text-xl text-blue-600">
              Lesson {index + 1}: {lesson.title}
            </h3>
            <p className="text-gray-600 mt-2">{lesson.content}</p>
          </div>
        </Link>
      ))}
          {/* Show More/Show Less Button */}
           {course.lessons.length > 3 && (
            <button
              onClick={() => setShowAllLessons(!showAllLessons)}
              className="text-blue-600 hover:underline mt-4 block"
            >
              {showAllLessons ? 'Show Less' : 'Show More'}
            </button>
          )}
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
  <div className='flex justify-between items-center border-b pb-4 mb-4'>
    <h2 className="text-2xl font-bold text-gray-800">
    Assignments
    </h2>
    {userType === "author" && (
          <Link to={`/dashboard/course/${course.id}/all-lessons`} className="text-blue-600 hover:underline">
          Add New Assignment
        </Link>
    )}
  </div>
<div className="my-8 ml-7">
  {course.assignmetData && course.assignmetData.length > 0 ? (
    <div className="space-y-4">
      {assignmentsToShow.map((assignment, index) => (
        <Link to={`/dashboard/course/${assignment.course_id}/lesson/${assignment.lesson_id}/assignments-to-lesson/${assignment.assignment_id}`} key={index}  className="block border border-gray-200 shadow-md rounded-lg p-4 transition hover:shadow-lg hover:border-blue-400">
          <h3 className="font-semibold text-xl text-blue-600">Assignment: {assignment.assignment_title}</h3>
          <p className="text-gray-600 mt-2">created At: {new Date(assignment.createdAt).toLocaleDateString()}</p>
          <p className="text-gray-600 mt-2">On lesson: {assignment.lesson_title}</p>
        </Link>
      ))}

        {/* Show More/Show Less Button */}
      {course.assignmetData.length > 3 && (
        <button
            onClick={() => setShowAllAssignments(!showAllAssignments)}
            className="text-blue-600 hover:underline mt-4 block"
            >
            {showAllLessons ? 'Show Less' : 'Show More'}
       </button>
      )}
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
<div className="max-w-4xl mx-auto my-12">
  <h2 className="text-3xl font-bold text-gray-800 mb-8 border-b-2 pb-4">Ratings</h2>
  <div className="my-8 ml-7">
    {course.totalReviews && course.totalReviews.length > 0 ? (
      <div className="space-y-6">
        {course.totalReviews.map((rating, index) => (
          <div
            key={index}
            className="border border-gray-300 shadow-lg rounded-lg p-6 transition hover:shadow-xl hover:border-blue-500 bg-white"
          >
            <h3 className="font-semibold text-xl text-blue-500">
              Rating:
            </h3>

            {/* Display star icons based on the rating_count */}
            <div className="flex items-center mb-3">
              {/* making 5 copyies of svg */}
              {[...Array(5)].map((star, starIndex) => (
                <svg
                  key={starIndex}
                  className={`w-6 h-6 ${
                    starIndex < rating.rating_count ? "text-yellow-400" : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.684 5.192h5.462c.969 0 1.371 1.24.588 1.81l-4.415 3.206 1.684 5.192c.3.921-.755 1.688-1.54 1.106l-4.415-3.206-4.415 3.206c-.784.582-1.838-.185-1.54-1.106l1.684-5.192-4.415-3.206c-.784-.57-.38-1.81.588-1.81h5.462l1.684-5.192z" />
                </svg>
              ))}
            </div>

            <p className="text-gray-700 mt-3 text-lg">
              Review: {rating.review_content}
            </p>
            <p className="text-gray-600 mt-1">
              <span className="font-medium">Submitted by:</span> {rating.user_name}
            </p>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-gray-500 text-lg">No ratings available for this course.</p>
    )}

    {/* Submitting a review */}
    <div className="mt-12">
      <h3 className="text-xl font-semibold text-gray-700 mb-2">Submit Your Review:</h3>
      
      <form onSubmit={SubmitReviews}>
        {/* Star Rating */}
        <div className="flex items-center mb-5 space-x-2">
          {/* creates an array with 5 elements */}
          {[...Array(5)].map((star, index) => {
            // ratingValue represents the star rating that will be captured when the user clicks on a star.
            const ratingValue = index + 1;
            return (
              // For each star, return a label element.
              <label key={index} className="cursor-pointer">
                <input
                  type="radio"
                  name="rating"
                  className="hidden"
                  value={ratingValue}
                  onClick={() => handleStarClick(ratingValue)}
                />
                {/* If ratingValue is less than or equal to the selected rating (rating) or hovered value (hover), the star turns yellow */}
                <svg
                  className={`w-10 h-10 transition ${
                    ratingValue <= (hover || rating) ? "text-yellow-400" : "text-gray-300"
                  }`}
                  // highlights the star when the user hovers over it
                  onMouseEnter={() => setHover(ratingValue)}
                  // removes the highlight when the user moves the mouse away
                  onMouseLeave={() => setHover(0)}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.684 5.192h5.462c.969 0 1.371 1.24.588 1.81l-4.415 3.206 1.684 5.192c.3.921-.755 1.688-1.54 1.106l-4.415-3.206-4.415 3.206c-.784.582-1.838-.185-1.54-1.106l1.684-5.192-4.415-3.206c-.784-.57-.38-1.81.588-1.81h5.462l1.684-5.192z" />
                </svg>
              </label>
            );
          })}
        </div>

        {/* Review Text Area */}
        <textarea
          className="border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 p-3 w-full mb-6 h-32 resize-none"
          onChange={handleReviews}
          value={review}
          placeholder="Write your review here..."
        />

        {/* Submit Button */}
        <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition">
          Submit Review
        </button>
      </form>
    </div>
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
