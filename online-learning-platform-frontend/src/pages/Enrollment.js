import React from 'react';

import { useCourse } from '../context/MyCourseContext';


function Enrollment() {
    const { course, enrollingCondition, isLoading,  error,} = useCourse(); // Access the context 

    if (isLoading) return <div>Loading... </div>;
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
