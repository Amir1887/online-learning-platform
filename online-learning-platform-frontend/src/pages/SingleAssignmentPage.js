import React, { useEffect, useState } from 'react';  
import { useParams } from 'react-router-dom';  
import { useAssignment } from '../context/AssignmentContext';  
import axios from 'axios';  
import { useAuth } from '@clerk/clerk-react';  

function SingleAssignmentPage() {  
    const { courseId, lessonId, assignmentId } = useParams();  
    const { assignments, isLoading, error } = useAssignment();  
    const { userId } = useAuth();  

    const [answers, setAnswers] = useState({});  
    const [submissionResult, setSubmissionResult] = useState(null);  
    const [correctAnswers, setCorrectAnswers] = useState([]);  

    useEffect(() => {  
        const fetchCorrectAnswers = async () => {  
            try {  
                const CompareRes = await axios.get(`http://localhost:4000/course/${courseId}/lesson/${lessonId}/assignment-compare/${assignmentId}`);  
                const { assignment } = CompareRes.data;  
                const answersArray = assignment.assignments.questions.map(q => q.correctAnswer);  
                setCorrectAnswers(answersArray);  
                console.log('Correct Answers:', answersArray);  
            } catch (err) {  
                console.error('Comparison Error:', err);  
            }  
        };  

        fetchCorrectAnswers();  
    }, [courseId, lessonId, assignmentId]);  

    const handleAnswerChange = (questionIndex, value) => {  
        setAnswers(prev => ({  
            ...prev,  
            [questionIndex + 1]: value, // Store answers in a 1-based index  
        }));  

        // Calculating immediate feedback  
        const isCorrect = value === correctAnswers[questionIndex];  
        const feedbackElement = document.getElementById(`feedback-${questionIndex}`);  
        feedbackElement.textContent = isCorrect ? `Correct!` : `Incorrect.`;  
        feedbackElement.style.color = isCorrect ? 'green' : 'red';  
    };  

    const SubmitHandler = async (e) => {  
        e.preventDefault();  
        try {  
            const res = await axios.post(`http://localhost:4000/course/${courseId}/lesson/${lessonId}/assignment-submit/${assignmentId}`, {  
                userId,  
                answers  
            });  
            console.log('Submission Response:', res.data);  
            setSubmissionResult(res);  
        } catch (err) {  
            console.error('Submission Error:', err);  
        }  
    };  

    // If loading or error  
    if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;  
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;  

    const assignmentIndex = parseInt(assignmentId, 10);  
    const assignment = assignments && assignments[assignmentIndex];  
    if (!assignment) {  
        return <p className="text-center text-gray-500">No assignment found for this lesson.</p>;  
    }  

    return (  
        <form className="max-w-4xl mx-auto my-8 p-6 bg-white shadow-lg rounded-lg" onSubmit={SubmitHandler}>  
            <h2 className="text-2xl font-bold text-blue-800 mb-6">Assignment Title: {assignment.title}</h2>  

            {assignment.assignments.questions.map((q, questionIndex) => (  
                <div key={questionIndex} className="mb-6">  
                    <p className="font-semibold text-gray-700 mb-4"><strong>Question {questionIndex + 1}:</strong> {q.question}</p>  
                    <p className="text-gray-600 mb-2"><strong>Type of Question:</strong> {q.selectedType}</p>  

                    {q.selectedType === 'MCQs' && (  
                        <div className="space-y-2">  
                            {q.mcqChoices.map((choice, i) => (  
                                <label key={i} className="flex items-center space-x-2 p-2 border border-gray-300 rounded-lg hover:bg-blue-50 cursor-pointer">  
                                    <input  
                                        type="radio"  
                                        name={`question-${questionIndex}`}  
                                        value={choice}  
                                        onChange={() => handleAnswerChange(questionIndex, choice)}  
                                    />  
                                    <span>{i + 1}. {choice}</span>  
                                </label>  
                            ))}  
                        </div>  
                    )}  

                    {q.selectedType === 'True & False' && (  
                        <div className="space-y-2">  
                            {q.booleanChoices.map((choice, i) => (  
                                <label key={i} className="flex items-center space-x-2 p-2 border border-gray-300 rounded-lg hover:bg-blue-50 cursor-pointer">  
                                    <input  
                                        type="radio"  
                                        name={`question-${questionIndex}`}  
                                        value={choice}  
                                        onChange={() => handleAnswerChange(questionIndex, choice)}  
                                    />  
                                    <span>{choice}</span>  
                                </label>  
                            ))}  
                        </div>  
                    )}  

                    {q.selectedType === 'Text' && (  
                        <div className="mt-2">  
                            <input  
                                type="text"  
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"  
                                placeholder="Write your answer here"  
                                onChange={(e) => handleAnswerChange(questionIndex, e.target.value)}  
                            />  
                        </div>  
                    )}  
                    <div id={`feedback-${questionIndex}`} className="mt-1 text-lg font-semibold"></div> {/* Feedback display */}  
                </div>  
            ))}  

            <button className="p-4 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600">Submit Your Answer</button>  
        </form>  
    );  
}  

export default SingleAssignmentPage;