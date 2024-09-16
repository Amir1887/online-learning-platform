import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Enrollment() {
    const [enrollingCondition, setEnrollingCondition] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchEnrollmentStatus = async () => {
            try {
                const enrollingRes = await axios.get(`http://localhost:4000/enrollment/${id}`);
                setEnrollingCondition(enrollingRes.data);  
            } catch (error) {
                console.error('Error fetching enrollment status:', error);
            }
        };
        
        fetchEnrollmentStatus();
    }, [id]);

    if (!enrollingCondition) {
        return <div>Loading...</div>;  
    }

    return (
        <div>
            {enrollingCondition.status === 'enrolled' ? (
                <div>You are already enrolled in this course.</div>
            ) : (
                <div>
                    You are not enrolled. Click below to enroll.
                    {/* Add your enrollment form or button here */}
                </div>
            )}
        </div>
    );
}

export default Enrollment;
