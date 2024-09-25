import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function AssignmentToUserSide() {
  const { courseId, lessonId } = useParams();
  const [title, setTitle] = useState("");
  const [createdAt, setCreatedAt] = useState(null);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function fetchAssignments() {
        try {
            const result = await axios.get(`http://localhost:4000/course/${courseId}/lesson/${lessonId}/assignments-to-lesson`);
            console.log("Assignment Response:", result);
              if(result.status === 200 || result.statusText === "OK" ){
                  setTitle(result.data.title);
                  setCreatedAt(result.data.createdAt);
                  setQuestions(result.data.assignments.questions);
              }else{
                  // Handle cases where the response is not OK
                  setQuestions([]); // Clear questions if not OK
                  setTitle("This Lesson Has No Assignments");
              }
        } catch (error) {
            console.error("Error fetching assignments:", error);
            setQuestions([]); // Clear questions if an error occurs
            setTitle("Error fetching assignments."); // Set an error message
        }
    }
    fetchAssignments();
  }, [courseId, lessonId]);

  return (
    <div>
          <h1>Assignment: {title || "No Assignments Available"}</h1>
          <p>Created At: {createdAt ? new Date(createdAt).toString() : "No date available"}</p>

      {questions && questions.length > 0 ? (
        questions.map((q, index) => (
          <div key={index} className="mb-4 p-4 border border-gray-300 rounded-lg">
            <p><strong>Type of question:</strong> {q.selectedType}</p>
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
        ))
      ):(
        <p>This Lesson Has No Assignments</p>
      )}
    </div>
  );
}

export default AssignmentToUserSide;
