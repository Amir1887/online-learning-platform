import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import VideoPlayer from './VideoPlayer';
import FileDownload from './FileDownload';
import UploadControls from './UploadControls';
import useUserRole from '../useUserRole';


function SingleLessonPage() {
  const {userType, loading} = useUserRole();
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

  if (loading) return <div>Loading...</div>;
  

  return (
    <div>
      <h1>{lesson.title}</h1>
      <p>{lesson.content}</p>

      {/* video component */}
      <VideoPlayer videoUrl={lesson.videourl} videopath={lesson.videopath}/>

      {/* attached files */}
      <FileDownload  attachments={lesson.attachments}/>

      {/* UploadControls component */}
      {userType === "author" && (
        <UploadControls  lessonId={lessonId} />
      )}
    </div>
  );
}

export default SingleLessonPage;
