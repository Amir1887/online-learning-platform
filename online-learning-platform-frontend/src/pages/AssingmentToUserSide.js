import axios from 'axios';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'



function AssingmentToUserSide() {
    const {courseId, lessonId} = useParams();
    useEffect(()=>{
     async function fetchAssignments(){
         const result = await axios.get(`http://localhost:4000/course/${courseId}/lesson/${lessonId}/assignments-to-lesson`);
        console.log("assignment Response:", result);
      }
      fetchAssignments();
    }, [courseId, lessonId])
   
  
  return (
    <div>
      assignments to this lesson
    </div>
  )
}

export default AssingmentToUserSide
