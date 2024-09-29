import React from 'react'
import { useCourse } from '../context/MyCourseContext';
import { Link } from 'react-router-dom';

function AllLessonsPage() {
   const { course,  isLoading,  error} = useCourse();
  
if (isLoading) return <div>Loading course...</div>;
if (error) return <div>{error}</div>;
if (!course) return <div>No course data available</div>;
  return (
<div className="my-8">
  <div className='flex justify-between items-center border-b pb-4 mb-4'>
    <h2 className="text-2xl font-bold text-gray-800">
      To which Lesson Assignment will be added ?
    </h2>
  </div>

  {course.lessons && course.lessons.length > 0 ? (
    <div className="space-y-4 ml-7">
      {course.lessons.map((lesson, index) => (
        <Link
          to={`/dashboard/course/${course.id}/lesson/${lesson.lesson_id}/new-assingment`}
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
    </div>
  ) : (
    <p className="text-gray-500">No lessons available for this course.</p>
  )}
</div>
  )
}

export default AllLessonsPage
