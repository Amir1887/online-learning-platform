// CourseContext.js  
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';  
import { useParams } from 'react-router-dom';

// Create the context  
const CourseContext = createContext();  

// Create a provider component  
export const CourseProvider = ({ children }) => {  
  const [course, setCourse] = useState(null);  
  const [enrollingCondition, setEnrollingCondition] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const { userId } = useAuth(); 
    
  useEffect(() => {
    let isMounted = true; // Track component mounted state
    const fetchCourse = async () => {
      if (id && isMounted) {
        try {
          const res = await axios.get(`http://localhost:4000/course/${id}`, { params: { userId } });
          setCourse(res.data);
          setEnrollingCondition(res.data.enrollmentStatus);
          setIsLoading(false);
        } catch (err) {
          console.error(err); // This helps with debugging
          setError(err.response?.data?.message || "Failed to load course details");
          setIsLoading(false);
        }
        
      }
    };
    fetchCourse();
  
    return () => {
      isMounted = false; // Cleanup when unmounting
    };
  }, [id, userId]);
  return (  
    <CourseContext.Provider value={{ course, setCourse, enrollingCondition, setEnrollingCondition, isLoading, setIsLoading, error, setError}}>  
      {children}  
    </CourseContext.Provider>  
  );  
};  

// Create a custom hook for easy access to the context  
export const useCourse = () => {  
  return useContext(CourseContext);  
};