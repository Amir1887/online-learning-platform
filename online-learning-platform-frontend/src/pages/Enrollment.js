import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Enrollment() {
    const [enrollingCondition, setEnrollingCondition] = useState(null);
    const { id } = useParams();
    const { userId } = useAuth(); // clreck userId
    // to fetch user_id from singleCourseRoute to send it to enrollmentRoute...
    const [course, setCourse] = useState(null);
    const [isloading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch course details by ID
    useEffect(() => {
        if (id) {
            const fetchCourse = async () => {
                try {
                    const res = await axios.get(`http://localhost:4000/course/${id}` ,{params: { userId }});
                    setCourse(res.data); 
                    setEnrollingCondition(res.data.enrollmentStatus)
                    setIsLoading(false);      
                    console.log("course details", res.data);
                } catch (err) {
                    console.error('Error fetching course:', err);
                    setError('Failed to load course details');
                    setIsLoading(false);
                }
            };
            fetchCourse();
        }
    }, [id]);

  

    if (isloading) return <div>Loading... </div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            {enrollingCondition && (enrollingCondition.paymentstate === "complete") ? (
                <>
                    <div>You are already enrolled in this course using: {enrollingCondition.paymentmethod}</div>
                    <div>Course ID: {course.id}</div>
                </>
            ) :
            
              (
                <div>
                    You are not enrolled. Click below to enroll.
                    {/* Add your enrollment form or button here */}
                </div>
            )}
        </div>
    );
}

export default Enrollment;
