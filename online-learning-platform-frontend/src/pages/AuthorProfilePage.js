import React from 'react';
import { Link } from 'react-router-dom';
import { useCourse } from '../context/MyCourseContext';

function AuthorProfilePage() {
  const { course, coursesBySingleAuthor, isLoading, error } = useCourse(); // Access the context 

  if (isLoading) return <div>Loading course...</div>;
  if (error) return <div>{error}</div>;
  if (!course) return <div>No course data available</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="flex items-center gap-4">
        <img
          src={course.author_image}  
          alt={course.author_name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h1 className="text-3xl font-bold">{course.author_name}</h1>
          <p>Total Reviews: {course.author_totalreviews}</p>
        </div>
      </div>
   
      <div className="mt-8">
        {coursesBySingleAuthor && coursesBySingleAuthor.length > 0 ? (
          <>
            <h2 className="text-2xl font-semibold mb-4">Other available courses by {course.author_name}:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coursesBySingleAuthor.map((singleCourse, index) => (
                <Link to={`/dashboard/course/${singleCourse.course_id}`} key={index} className="block">
                  <div className="border rounded-lg shadow-lg overflow-hidden bg-gray-50 hover:shadow-xl transition-shadow duration-300">
                    <img
                      src={singleCourse.course_image}
                      alt={singleCourse.course_title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-xl font-semibold">{singleCourse.course_title}</h3>
                      <p className="mt-2 text-gray-600">{singleCourse.course_description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <p>No other courses available</p>
        )}
      </div>
    </div>
  );
}

export default AuthorProfilePage;
