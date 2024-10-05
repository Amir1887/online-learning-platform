import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';  
import { useParams } from 'react-router-dom';

// Create the context  
const CoursesCategoriesContext = createContext();

// Create a provider component  
export const CoursesCategoriesProvider = ({ children }) => {  
    const [categories, setCategories] = useState([]);
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
 

      
    useEffect(() => {  
        async function fetchAllCategories() {  
          try {  
            const result = await axios.get('http://localhost:4000/dashboard/categories') 
            console.log("categories Response:", result);  
            if (result.status === 200 || result.statusText === "OK") {  
                setCategories(result.data);   
                setIsLoading(false);
            } else {  
                setCategories([]); // Clear categories if not OK    
            }  
          } catch (error) {  
            console.error("Error fetching categories:", error); 
            setError(error.response?.data?.message || "Failed to load categories");
            setIsLoading(false); 
            setCategories([]); // Clear categories if an error occurs  
          }  
        }  
        fetchAllCategories();  
      }, []); 

      //fetch all courses 
      useEffect(() => {
        async function fetchAllCourses() {
            try {
              const courseRes = await axios.get(`http://localhost:4000/dashboard/courses`)
              console.log("courses Response:", courseRes);
              if (courseRes.status === 200 || courseRes.statusText === "OK") {  
                setCourses(courseRes.data);   
                setIsLoading(false);
            } else {  
                setCategories([]); // Clear categories if not OK    
            }  
            } catch (error) {
                
            }
         }
   
         fetchAllCourses();
      }, []);
    return (  
      <CoursesCategoriesContext.Provider value={{ categories, courses, isLoading, error}}>  
        {children}  
      </CoursesCategoriesContext.Provider>  
    );  
  };  
  
  // Create a custom hook for easy access to the context  
  export const useCoursesCategories = () => {  
    return useContext(CoursesCategoriesContext);  
  };