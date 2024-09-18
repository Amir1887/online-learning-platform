import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import VideoPlayer from './VideoPlayer';
import FileDownload from './FileDownload';
import UploadControls from './UploadControls';
import useUserRole from '../useUserRole';

function SingleLessonPage() {
  const { userType, loading } = useUserRole();
  const { courseId, lessonId } = useParams();
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    async function fetchLesson() {
      try {
        const res = await axios.get(`http://localhost:4000/lesson/${lessonId}`);
        if (res.data) {
          setLesson(res.data);
          console.log("Lesson response", res);
        }
      } catch (error) {
        console.error("Error fetching lesson:", error);
      }
    }
    fetchLesson();
  }, [lessonId]);

  if (!lesson || loading) {
    return <div className='flex justify-center items-center h-screen text-lg text-gray-700'>Loading...</div>;
  }

  return (

    <div className='p-6 bg-white shadow-md rounded-lg'>
      <h1 className='text-3xl font-bold text-blue-600 mb-4'>{lesson.title}</h1>
      <p className='text-lg font-semibold text-gray-800 mb-2'>{lesson.content}</p>
      <p className='text-sm text-gray-600 mb-4'>
        Created at: <span className='font-medium'>{new Date(lesson.createdAt).toLocaleDateString()}</span>
      </p>
      <p className='text-sm text-gray-600 mb-4'>
        Last updated at: <span className='font-medium'>{new Date(lesson.updatedAt).toLocaleDateString()}</span>
      </p>

      {/* Video Component */}
      <div className='mb-6'>
        <VideoPlayer videoUrl={lesson.videourl} videopath={lesson.videopath} />
      </div>

      {/* Attached Files */}
      <div className='mb-6'>
        <FileDownload attachments={lesson.attachments} attachmentpath={lesson.attachmentpath} />
      </div>

      {/* Upload Controls Component */}
      {userType === "author" && (
        <div className='mt-8'>
          <UploadControls lessonId={lessonId} />
        </div>
      )}
    </div>
  );
}

export default SingleLessonPage;
