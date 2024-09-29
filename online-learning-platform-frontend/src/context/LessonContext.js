import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';  
import { useParams } from 'react-router-dom';

// Create the context  
const LessonContext = createContext();  


// Create a provider component  
export const LessonProvider = ({ children }) => {  
 
    const [lesson, setLesson] = useState(null);  
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { lessonId } = useParams();
 
      
    useEffect(() => {
      let isMounted = true; // Track component mounted state
      const fetchLesson = async () => {
        if ( isMounted ) {
            try {
                const res = await axios.get(`http://localhost:4000/lesson/${lessonId}`);
                if (res.data) {
                  setLesson(res.data);
                  console.log("lesson from lesson context");
                  setIsLoading(false);
                  console.log("Lesson response", res);
                }
              } catch (error) {
                console.error("Error fetching lesson:", error);
                setError(error);
                setIsLoading(false);
              }
        }
      };
      fetchLesson();
    
      return () => {
        isMounted = false; // Cleanup when unmounting
      };
    }, [lessonId]);
    return (  
      <LessonContext.Provider value={{ lesson,  isLoading, error}}>  
        {children}  
      </LessonContext.Provider>  
    );  
  };  
  
  // Create a custom hook for easy access to the context  
  export const useLesson = () => {  
    return useContext(LessonContext);  
  };