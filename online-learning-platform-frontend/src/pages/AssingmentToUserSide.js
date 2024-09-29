import axios from 'axios';  
import React, { useEffect, useState } from 'react';  
import { useParams } from 'react-router-dom';  

function AssignmentToUserSide() {  
  const { courseId, lessonId } = useParams();  
  const [assignments, setAssignments] = useState([]); // Renamed to assignments for clarity  
  const [title, setTitle] = useState("");  
  const [createdAt, setCreatedAt] = useState("");  

  useEffect(() => {  
    async function fetchAssignments() {  
      try {  
        const result = await axios.get(`http://localhost:4000/course/${courseId}/lesson/${lessonId}/assignments-to-lesson`);  
        console.log("Assignment Response:", result);  
        if (result.status === 200 || result.statusText === "OK") {  
          setAssignments(result.data); // Here we set the state to the array of assignment objects  
          
          // Assuming we can use the first assignment's title and creation date for display purposes  
          if (result.data.length > 0) {  
            setTitle(result.data[0].title);  
            setCreatedAt(result.data[0].createdAt);  
          }  
        } else {  
          setAssignments([]); // Clear assignments if not OK  
          setTitle("This Lesson Has No Assignments");  
        }  
      } catch (error) {  
        console.error("Error fetching assignments:", error);  
        setAssignments([]); // Clear assignments if an error occurs  
        setTitle("Error fetching assignments."); // Set an error message  
      }  
    }  
    fetchAssignments();  
  }, [courseId, lessonId]);  

  return (  
    <div>  
      <h1>Assignments: {title || "No Assignments Available"}</h1>  
      <p>Created At: {createdAt ? new Date(createdAt).toString() : "No date available"}</p>  

      {assignments.length > 0 ? (  
        assignments.map((assignment, index) => (  
          <div key={index} className="mb-4 p-4 border border-gray-300 rounded-lg">  
            <h2>Assignment Title: {assignment.title}</h2>  
            {assignment.assignments.questions.map((q, questionIndex) => (  
              <div key={questionIndex} className="mb-2">  
                <p><strong>Type of Question:</strong> {q.selectedType}</p>  
                <p><strong>Question:</strong> {q.question}</p>  

                {q.selectedType === 'MCQs' && (  
                  <select className="w-full p-2 border border-gray-300 rounded-lg">  
                    {q.mcqChoices.map((choice, i) => (  
                      <option key={i} value={choice}>{i + 1}. {choice}</option>  
                    ))}  
                  </select>  
                )}  

                {q.selectedType === 'True & False' && (  
                  <select className="w-full p-2 border border-gray-300 rounded-lg">  
                    {q.booleanChoices.map((choice, i) => (  
                      <option key={i} value={choice}>{i + 1}. {choice}</option>  
                    ))}  
                  </select>  
                )}  

                {q.selectedType === 'Text' && (  
                  <input  
                    type="text"  
                    className="w-full p-2 border border-gray-300 rounded-lg"  
                    placeholder="Write your answer here"  
                  />  
                )}  
              </div>  
            ))}  
          </div>  
        ))  
      ) : (  
        <p>This Lesson Has No Assignments</p>  
      )}  
    </div>  
  );  
}  

export default AssignmentToUserSide;