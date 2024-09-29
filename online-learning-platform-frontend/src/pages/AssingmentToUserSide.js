import React from 'react';  
import { Link, useParams } from 'react-router-dom';  
import { useAssignment } from '../context/AssignmentContext';

function AssignmentToUserSide() {  
  const { courseId, lessonId } = useParams(); 
  const {assignments, title, createdAt, isLoading, error} = useAssignment();

    // If loading or error
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
  return (  
    <div>  
      <h1>Assignments: {title || "No Assignments Available"}</h1>  
      <p>Created At: {createdAt ? new Date(createdAt).toString() : "No date available"}</p>  

      {assignments.length > 0 ? (  
        assignments.map((assignment, index) => (  
          <Link to={`/dashboard/course/${courseId}/lesson/${lessonId}/assignments-to-lesson/${index}`} key={index} className="mb-4 p-4 border border-gray-300 rounded-lg">  
            <h2>Assignment Title: {assignment.title}</h2>  
          </Link>  
        ))  
      ) : (  
        <p>This Lesson Has No Assignments</p>  
      )}  
    </div>  
  );  
}  

export default AssignmentToUserSide;