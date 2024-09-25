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
      const result = await axios.get(`http://localhost:4000/course/${courseId}/lesson/${lessonId}/assignments-to-lesson`);
      console.log("Assignment Response:", result);
      setTitle(result.data.title);
      setCreatedAt(result.data.createdAt);
      setQuestions(result.data.assignments.questions);
    }
    fetchAssignments();
  }, [courseId, lessonId]);

  return (
    <div>
      <h1>Assignment: {title}</h1>
      <p>Created At: {new Date(createdAt).toString()}</p>

      {questions && questions.length > 0 && (
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
      )}
    </div>
  );
}

export default AssignmentToUserSide;
