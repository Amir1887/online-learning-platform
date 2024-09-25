import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AuthorAssignmentForm = () => {
    const {courseId, lessonId} = useParams();

// Initializes state with an array containing one question object. Each question has:
    // An empty question string.
    // An array of choices (4 empty strings).
    // An empty correctAnswer string.
  const [questions, setQuestions] = useState([
    { question: '', choices: ['', '', '', ''], correctAnswer: '' }
  ]);

  //adds a new empty question object to the questions state (adding new qs to assignment)
  const addQuestion = () => {
    setQuestions([...questions, { question: '', choices: ['', '', '', ''], correctAnswer: '' }]);
  };


  //This function updates the state based on user input:
          //1.It takes an index of the question, the field being updated, and the new value.
          //2.Creates a copy of the current questions state.
          //3.Updates the specific property (question text, choice, or correct answer) of the selected question.
  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions]; //Creates a copy
    if (field === 'question') {
      updatedQuestions[index].question = value;
    } else if (field.startsWith('choice')) {
      const choiceIndex = parseInt(field.split('choice')[1]);
      updatedQuestions[index].choices[choiceIndex] = value; // index > index of qs but choiceIndex is index of choice 
    } else if (field === 'correctAnswer') {
      updatedQuestions[index].correctAnswer = value;
    }
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`http://localhost:4000/course/${courseId}/lesson/${lessonId}/create-assignment`, { questions });
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
