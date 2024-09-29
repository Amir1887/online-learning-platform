import React from 'react';  
import { Link, useParams } from 'react-router-dom';  
import { useAssignment } from '../context/AssignmentContext';

function AssignmentToUserSide() {  
  const { courseId, lessonId } = useParams(); 
  const { assignments, title, createdAt, isLoading, error } = useAssignment();

  // If loading or error
  if (isLoading) return <p className="text-center text-blue-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (  
    <div className="p-6 bg-white shadow-md rounded-lg">  
      {/* Title Section */}
      <h1 className="text-2xl font-bold text-blue-600 mb-4">
        {title ? `Assignments: ${title}` : "No Assignments Available"}
      </h1>

      {/* Created At */}
      <p className="text-sm text-gray-600 mb-4">
        Created At: {createdAt ? new Date(createdAt).toLocaleString() : "No date available"}
      </p>

      {/* Assignments List */}
      {assignments.length > 0 ? (
        <div className="space-y-4">
          {assignments.map((assignment, index) => (
            <Link
              to={`/dashboard/course/${courseId}/lesson/${lessonId}/assignments-to-lesson/${index}`}
              key={index}
              className="block p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              <h2 className="text-lg font-semibold text-gray-800">
                Assignment Title: {assignment.title}
              </h2>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">This Lesson Has No Assignments</p>
      )}
    </div>  
  );  
}

export default AssignmentToUserSide;
