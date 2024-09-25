import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AuthorAssignmentForm = () => {
  const { courseId, lessonId } = useParams();

    // State for assignment title  
    const [assignmentTitle, setAssignmentTitle] = useState('');

  const [questions, setQuestions] = useState([
    { question: '', selectedType: '', mcqChoices: ['', '', ''], booleanChoices: ['True', 'False'], correctAnswer: '' }
  ]);

  const addQuestion = () => {
    setQuestions([...questions, { question: '', selectedType: '', mcqChoices: ['', '', ''], booleanChoices: ['True', 'False'], correctAnswer: '' }]);
  };

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
      const response = await axios.post(`http://localhost:4000/course/${courseId}/lesson/${lessonId}/create-assignment`, { title: assignmentTitle,  questions });
        if(response.status === 201 || response.statusText ==="Created"){
          setAssignmentTitle("");
          setQuestions([
            { question: '', selectedType: '', mcqChoices: ['', '', ''], booleanChoices: ['True', 'False'], correctAnswer: '' }
          ]);
        }
        console.log(response.data);
    } catch (error) {
      console.error('Error creating assignment', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-3 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">Create Assignment</h2>

      <h3 className="mb-2 font-semibold">Assignment Title: {assignmentTitle}</h3>  
      {/* Input for assignment title */}  
       <input  
        type="text"  
        className="w-full p-2 mb-4 border border-gray-300 rounded-lg"  
        placeholder="Assignment Title"  
        value={assignmentTitle}  
        onChange={(e) => setAssignmentTitle(e.target.value)}  
      />  

      {questions.map((q, index) => (
        <div key={index} className="mb-6 p-4 bg-gray-50 rounded-lg shadow-inner">

         <select
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
            value={q.selectedType}
            onChange={(e) => handleQuestionChange(index, 'selectedType', e.target.value)}
          >
            <option value="">Select Type</option>
            <option value="MCQs">MCQs</option>
            <option value="True & False">True & False</option>
            <option value="Text">Text</option>
          </select>


          {q.selectedType !== "" && (
                    <input
                    type="text"
                    className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
                    placeholder="Question"
                    value={q.question}
                    onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                  />
          )}



          {q.selectedType === 'MCQs' && (
            <div className="space-y-2">
              {q.mcqChoices.map((choice, i) => (
                <input
                  key={i}
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder={`Choice ${i + 1}`}
                  value={choice}
                  onChange={(e) => handleQuestionChange(index, `mcqChoice${i}`, e.target.value)}
                />
              ))}
            </div>
          )}

          {q.selectedType === 'True & False' && (
            <div className="space-y-2">
              {q.booleanChoices.map((choice, i) => (
                <input
                  key={i}
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg"
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
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Write Correct Answer"
                value={q.correctAnswer}
                onChange={(e) => handleQuestionChange(index, 'correctAnswer', e.target.value)}
              />
            </div>
          )}

          {q.selectedType && (q.selectedType === 'MCQs' || q.selectedType === 'True & False') && (
            <input
              type="text"
              className="w-full p-2 mt-4 border border-gray-300 rounded-lg"
              placeholder="Correct Answer"
              value={q.correctAnswer}
              onChange={(e) => handleQuestionChange(index, 'correctAnswer', e.target.value)}
            />
          )}
        </div>
      ))}

      <div className="flex justify-between mt-4">
        <button
          onClick={addQuestion}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600"
        >
          Add Question
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow hover:bg-green-600"
        >
          Submit Assignment
        </button>
      </div>
    </div>
  );
};

export default AuthorAssignmentForm;
