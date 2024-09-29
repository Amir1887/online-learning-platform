import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';  
import { useParams } from 'react-router-dom';

// Create the context  
const AssignmentContext = createContext();

// Create a provider component  
export const AssignmentProvider = ({ children }) => {  
    const { courseId, lessonId } = useParams();  
    const [assignments, setAssignments] = useState([]); // Renamed to assignments for clarity  
    const [title, setTitle] = useState("");  
    const [createdAt, setCreatedAt] = useState("");  
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
 

      
    useEffect(() => {  
        async function fetchAssignments() {  
          try {  
            const result = await axios.get(`http://localhost:4000/course/${courseId}/lesson/${lessonId}/assignments-to-lesson`);  
            console.log("Assignment Response:", result);  
            if (result.status === 200 || result.statusText === "OK") {  
              setAssignments(result.data); // Here we set the state to the array of assignment objects  
              setIsLoading(false);
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
            setError(error.response?.data?.message || "Failed to load course details");
            setIsLoading(false); 
            setAssignments([]); // Clear assignments if an error occurs  
            setTitle("Error fetching assignments."); // Set an error message  
          }  
        }  
        fetchAssignments();  
      }, [courseId, lessonId]); 
    return (  
      <AssignmentContext.Provider value={{ assignments, title, createdAt, isLoading, error}}>  
        {children}  
      </AssignmentContext.Provider>  
    );  
  };  
  
  // Create a custom hook for easy access to the context  
  export const useAssignment = () => {  
    return useContext(AssignmentContext);  
  };