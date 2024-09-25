import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AuthorAssignmentForm = () => {
  const { courseId, lessonId } = useParams();

  // Initialize the questions with a selectedType field
  const [questions, setQuestions] = useState([
    { question: '', selectedType: '', mcqChoices: ['', '', ''], booleanChoices: ['True', 'False'], correctAnswer: '' }
  ]);

  // Function to add a new empty question
  const addQuestion = () => {
    setQuestions([...questions, { question: '', selectedType: '', mcqChoices: ['', '', ''], booleanChoices: ['True', 'False'], correctAnswer: '' }]);
  };

  // Function to handle question changes, including type and choices
  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];

    if (field === 'question') {
      updatedQuestions[index].question = value;
    } else if (field === 'selectedType') {
      updatedQuestions[index].selectedType = value;
    } else if (field.startsWith('mcqChoice')) {
      const choiceIndex = parseInt(field.split('mcqChoice')[1]);
      updatedQuestions[index].mcqChoices[choiceIndex] = value;
    } else if (field.startsWith('booleanChoice')) {
      const choiceIndex = parseInt(field.split('booleanChoice')[1]);
      updatedQuestions[index].booleanChoices[choiceIndex] = value;
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

          {/* Dropdown to select the type of the question */}
          <select
            value={q.selectedType}
            onChange={(e) => handleQuestionChange(index, 'selectedType', e.target.value)}
          >
            <option value="">Select Type</option>
            <option value="MCQs">MCQs</option>
            <option value="True & False">True & False</option>
            <option value="Text">Text</option>
          </select>

          {/* Conditional rendering based on the selected question type */}
          {q.selectedType === 'MCQs' && (
            <div>
              {q.mcqChoices.map((choice, i) => (
                <input
                  key={i}
                  type="text"
                  placeholder={`Choice ${i + 1}`}
                  value={choice}
                  onChange={(e) => handleQuestionChange(index, `mcqChoice${i}`, e.target.value)}
                />
              ))}
            </div>
          )}

          {q.selectedType === 'True & False' && (
            <div>
              {q.booleanChoices.map((choice, i) => (
                <input
                  key={i}
                  type="text"
                  placeholder={`Choice ${i + 1}`}
                  value={choice}
                  onChange={(e) => handleQuestionChange(index, `booleanChoice${i}`, e.target.value)}
                />
              ))}
            </div>
          )}

          {q.selectedType === 'Text' && (
            <div>
              <input
                type="text"
                placeholder="Write your answer"
                value={q.correctAnswer}
                onChange={(e) => handleQuestionChange(index, 'correctAnswer', e.target.value)}
              />
            </div>
          )}

          {/* Common correct answer input for all types */}
          {q.selectedType && (
            <input
              type="text"
              placeholder="Correct Answer"
              value={q.correctAnswer}
              onChange={(e) => handleQuestionChange(index, 'correctAnswer', e.target.value)}
            />
          )}
        </div>
      ))}

      <button onClick={addQuestion}>Add Question</button>
      <button onClick={handleSubmit}>Submit Assignment</button>
    </div>
  );
};

export default AuthorAssignmentForm;
