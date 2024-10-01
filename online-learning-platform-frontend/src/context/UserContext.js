import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';  
import { useParams } from 'react-router-dom';

// Create the context  
const UsereContext = createContext();  

// Create a provider component  
export const UsereProvider = ({ children }) => {  
    const [userIdFromDb, setUserIdFromDb] =useState(null);
    const [userEmail, setUserEmail] =useState(null);
    const [userName, setUserName] =useState(null);
    const [userCreationTime, setUserCreationTime] =useState(null);
    const [userUpdating, setUserUpdating] =useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { userId } = useAuth(); 
      
    useEffect(() => {
      let isMounted = true; // Track component mounted state
      const fetchUserId = async () => {
        if (userId && isMounted) {
          try {
            const res = await axios.get(`http://localhost:4000/user/find-id-from-db/${userId}`);
            console.log("total data of user:",res)
            setUserIdFromDb(res.data.LoggedInUserId);
            setUserEmail(res.data.LoggedInUserEmail);
            setUserName(res.data.LoggedInUserName);
            setUserCreationTime(res.data.LoggedInUserCreatedAt);
            setUserUpdating(res.data.LoggedInUserUpdatedAt);
            setIsLoading(false);
          } catch (err) {
            console.error(err); // This helps with debugging
            setError(err.response?.data?.message || "Failed to load user details");
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
      <UsereContext.Provider value={{userIdFromDb, userEmail, userName, userCreationTime, userUpdating, isLoading, error}}>  
        {children}  
      </UsereContext.Provider>  
    );  
  };  
  
  // Create a custom hook for easy access to the context  
  export const useUser = () => {  
    return useContext(UsereContext);  
  };