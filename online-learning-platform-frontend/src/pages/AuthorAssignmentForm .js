import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AuthorAssignmentForm = () => {
    const {courseId, lessonId} = useParams();
  const [questions, setQuestions] = useState([
    { question: '', choices: ['', '', '', ''], correctAnswer: '' }
  ]);

  const addQuestion = () => {
    setQuestions([...questions, { question: '', choices: ['', '', '', ''], correctAnswer: '' }]);
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    if (field === 'question') {
      updatedQuestions[index].question = value;
    } else if (field.startsWith('choice')) {
      const choiceIndex = parseInt(field.split('choice')[1]);
      updatedQuestions[index].choices[choiceIndex] = value;
    } else if (field === 'correctAnswer') {
      updatedQuestions[index].correctAnswer = value;
    }
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`http://localhost:4000/course/${courseId}/create-assignment`, { questions });
      console.log(response.data);
    } catch (error) {
      console.error('Error creating assignment', error);
    }
  };

  return (
    <div>
      <h2>Create Assignment</h2>
      {questions.map((q, index) => (
        <div key={index} className="mb-4">
          <input
            type="text"
            placeholder="Question"
            value={q.question}
            onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
          />
          {q.choices.map((choice, i) => (
            <input
              key={i}
              type="text"
              placeholder={`Choice ${i + 1}`}
              value={choice}
              onChange={(e) => handleQuestionChange(index, `choice${i}`, e.target.value)}
            />
          ))}
          <input
            type="text"
            placeholder="Correct Answer"
            value={q.correctAnswer}
            onChange={(e) => handleQuestionChange(index, 'correctAnswer', e.target.value)}
          />
        </div>
      ))}
      <button onClick={addQuestion}>Add Question</button>
      <button onClick={handleSubmit}>Submit Assignment</button>
    </div>
  );
};

export default AuthorAssignmentForm;
