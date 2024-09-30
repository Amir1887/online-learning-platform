import React from 'react';
import { useParams } from 'react-router-dom';
import { useAssignment } from '../context/AssignmentContext';

function SingleAssignmentPage() {
    const { index } = useParams();  // Get the assignment index from the URL
    const { assignments, isLoading, error } = useAssignment();

    // Convert the index to a number because `useParams` returns it as a string
    const assignmentIndex = parseInt(index, 10);

    // If loading or error
    if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;

    // Check if the assignmentIndex is valid and assignments exist
    const assignment = assignments && assignments[assignmentIndex];
    if (!assignment) {
        return <p className="text-center text-gray-500">No assignment found for this lesson.</p>;
    }

    return (
        <div className="max-w-4xl mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-blue-800 mb-6">Assignment Title: {assignment.title}</h2>

            {assignment.assignments.questions.map((q, questionIndex) => (
                <div key={questionIndex} className="mb-6">
                    <p className="font-semibold text-gray-700 mb-4"><strong>Question:</strong> {q.question}</p>
                    <p className=" text-gray-600 mb-2"><strong>Type of Question:</strong> {q.selectedType}</p>

                    {q.selectedType === 'MCQs' && (
                        <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                            {q.mcqChoices.map((choice, i) => (
                                <option key={i} value={choice}>{i + 1}. {choice}</option>
                            ))}
                        </select>
                    )}

                    {q.selectedType === 'True & False' && (
                        <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                            {q.booleanChoices.map((choice, i) => (
                                <option key={i} value={choice}>{i + 1}. {choice}</option>
                            ))}
                        </select>
                    )}

                    {q.selectedType === 'Text' && (
                        <input
                            type="text"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Write your answer here"
                        />
                    )}
                </div>
            ))}
        </div>
    );
}

export default SingleAssignmentPage;
