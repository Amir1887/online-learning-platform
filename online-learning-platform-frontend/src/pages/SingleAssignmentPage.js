import React from 'react';
import { useParams } from 'react-router-dom';
import { useAssignment } from '../context/AssignmentContext';

function SingleAssignmentPage() {
    const { index } = useParams();  // Get the assignment index from the URL
    const { assignments, isLoading, error } = useAssignment();

    // Convert the index to a number because `useParams` returns it as a string
    const assignmentIndex = parseInt(index, 10);

    // If loading or error
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    // Check if the assignmentIndex is valid and assignments exist
    const assignment = assignments && assignments[assignmentIndex];
    if (!assignment) {
        return <p>No assignment found for this lesson.</p>;
    }

    return (
        <div>
            <h2>Assignment Title: {assignment.title}</h2>
            { assignment.assignments.questions.map((q, questionIndex) => (  
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
    );
}

export default SingleAssignmentPage;
