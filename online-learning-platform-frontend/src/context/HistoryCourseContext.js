// import { useAuth } from "@clerk/clerk-react";
// import axios from "axios";
// import { createContext, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// // Create the context
// const CourseContext = createContext();

// export const CourseSurrounderProvider = ({ children }) => {
//     const { id } = useParams();
//     const { userId } = useAuth(); 
//     const [course, setCourse] = useState(null);
//     const [enrollingCondition, setEnrollingCondition] = useState(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState(null);
  
//     useEffect(() => {
//         let isMounted = true; // Track component mounted state
//         const fetchCourse = async () => {
//           if (id && isMounted) {
//             try {
//               const res = await axios.get(`http://localhost:4000/course/${id}`, { params: { userId } });
//               setCourse(res.data);
//               setEnrollingCondition(res.data.enrollmentStatus);
//               setIsLoading(false);
//             } catch (err) {
//               setError("Failed to load course details");
//               setIsLoading(false);
//             }
//           }
//         };
//         fetchCourse();
      
//         return () => {
//           isMounted = false; // Cleanup when unmounting
//         };
//       }, [id, userId]);
      
//     const value={course, isLoading, error, enrollingCondition}
    
//     return (  
//         <CourseContext.Provider value={value}>  
//             {children}  
//         </CourseContext.Provider>  
//     );
//   }
  

// export default CourseContext;
