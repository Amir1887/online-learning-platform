import React from 'react';  
import { Link, useParams } from 'react-router-dom';  
import { useAssignment } from '../context/AssignmentContext';


function AssignmentToUserSide() {  
  const { courseId, lessonId } = useParams(); 
  const { assignments, isLoading, error } = useAssignment();

  // If loading or error
  if (isLoading) return <p className="text-center text-blue-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
 
 
  
  // const{ lesson,  isLoading, error} = useLesson();
  // console.log("lessonnnn", lesson);
 

  return (  
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">  
   
      <h1 className="text-3xl font-extrabold text-blue-900 mb-6">Assignments for the  Lesson</h1>

      {assignments.length > 0 ? (  
        assignments.map((assignment, index) => (  
          <Link 
            to={`/dashboard/course/${courseId}/lesson/${lessonId}/assignments-to-lesson/${index}`} 
            key={index} 
            className="block mb-4 p-5 border border-gray-300 rounded-lg shadow-sm hover:bg-blue-200 hover:border-blue-600 transition-all duration-200"
          >  
            <h2 className="text-xl font-semibold text-blue-800">Assignment Title: {assignment.title}</h2>  
            <p className="text-gray-600">
              Created At: {new Date(assignment.createdAt).toLocaleDateString()}
            </p>
          </Link>  
        ))  
      ) : (  
        <p className="text-gray-500 text-center">This Lesson Has No Assignments</p>  
      )}  
 

    </div>  
)}

export default AssignmentToUserSide;
