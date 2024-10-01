import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';  
import { useParams } from 'react-router-dom';

// Create the context  
const UsereContext = createContext();  

// Create a provider component  
export const UsereProvider = ({ children }) => {  
    const [userIdFromDb, setuserIdFromDb] =useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { courseId, lessonId, assignmentId } = useParams();
    const { userId } = useAuth(); 
      
    useEffect(() => {
      let isMounted = true; // Track component mounted state
      const fetchUserId = async () => {
        if (userId && isMounted) {
          try {
            const res = await axios.get(`http://localhost:4000/user/find-id-from-db/${userId}`, {params : {courseId, lessonId, assignmentId}});
            setuserIdFromDb(res.data);
            setIsLoading(false);
          } catch (err) {
            console.error(err); // This helps with debugging
            setError(err.response?.data?.message || "Failed to load course details");
            setIsLoading(false);
          }
          
        }
      };
      fetchUserId();
    
      return () => {
        isMounted = false; // Cleanup when unmounting
      };
    }, [userId]);
    return (  
      <UsereContext.Provider value={{userIdFromDb, isLoading, error}}>  
        {children}  
      </UsereContext.Provider>  
    );  
  };  
  
  // Create a custom hook for easy access to the context  
  export const useUser = () => {  
    return useContext(UsereContext);  
  };