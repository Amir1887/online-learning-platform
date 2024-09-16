import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function SingleLessonPage() {
  const { courseId, lessonId } = useParams();
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    async function fetchLesson() {
      try {
        const res = await axios.get(`http://localhost:4000/lesson/${lessonId}`);
        if(res.data){
            setLesson(res.data);
            console.log("Lesson response", res);
        }
      } catch (error) {
        console.error("Error fetching lesson:", error);
      }
    }
    fetchLesson();
  }, [lessonId]);

  if (!lesson) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{lesson.title}</h1>
      <p>{lesson.content}</p>
    </div>
  );
}

export default SingleLessonPage;
