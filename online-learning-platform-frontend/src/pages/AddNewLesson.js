import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function AddNewLesson() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [attachmentLink, setAttachmentLink] = useState("");
  const [video, setVideo] = useState(null);
  const [videoLink, setVideoLink] = useState("");

  // Handlers for form inputs
  function TitleHandler(e) {
    setTitle(e.target.value);
  }

  function DescriptionHandler(e) {
    setDescription(e.target.value);
  }

  function AttachmentHandler(e) {
    setAttachments(Array.from(e.target.files));
  }

  function AttachmentLinkHandler(e) {
    setAttachmentLink(e.target.value);
  }

  function VideoUploadHandler(e) {
    setVideo(e.target.files[0]);
  }

  function VideoLinkHandler(e) {
    setVideoLink(e.target.value);
  }

  function isValidURL(string) {
    const urlPattern = new RegExp('^(https?://)', 'i');
    return !!urlPattern.test(string);
}

  // Function to handle lesson upload
  async function AddLessonHandler(e) {
    e.preventDefault(); // Prevent page reload on form submission

            // Validation
            if (!title || !description || 
                (attachmentLink && !isValidURL(attachmentLink)) || 
                (videoLink && !isValidURL(videoLink))) {
                alert("Please ensure all fields are filled correctly.");
                return;
            }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    attachments.forEach((attachment) => formData.append('attachments', attachment));
    formData.append('attachmentLink', attachmentLink);
    formData.append('video', video);
    formData.append('videoLink', videoLink);

    try {
      const response = await fetch(`http://localhost:4000/course/${id}/upload-new-lesson/`, {
        method: 'POST',
        body: formData,
      });

      // Handle success/failure
      if (response.ok) {
        const data = await response.json();
        console.log('Success:', data);
        alert("Lesson added successfully");
      } else {
        console.error('Upload failed');
        alert("Failed to add the lesson.");
      }
    } catch (error) {
      console.error('Error:', error);
      alert("Error occurred while adding the lesson.");
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-600 mb-6">Add New Lesson To Your Amazing Course</h1>
      <form className="p-4 flex flex-col max-w-xl mx-auto bg-white shadow-md rounded-lg" onSubmit={AddLessonHandler}>
        <input
          placeholder="Title Of New Lesson"
          value={title}
          onChange={TitleHandler}
          className="mb-4 p-2 border rounded"
          required
        />

        <textarea
          placeholder="Description For New Lesson"
          value={description}
          onChange={DescriptionHandler}
          className="mb-4 p-2 border rounded"
          required
        />

        <label className="mb-2">Add Attachments from your device</label>
        <input
          type="file"
          multiple
          onChange={AttachmentHandler}
          className="mb-4"
        />

        <label className="mb-2">Add An Attachment via a link</label>
        <input
          placeholder="Attachment link"
          value={attachmentLink}
          onChange={AttachmentLinkHandler}
          className="mb-4 p-2 border rounded"
        />

        <label className="mb-2">Add A Video from your device</label>
        <input
          type="file"
          accept="video/mp4"
          onChange={VideoUploadHandler}
          className="mb-4"
        />

        <label className="mb-2">Add A Video via a link</label>
        <input
          placeholder="Video link"
          value={videoLink}
          onChange={VideoLinkHandler}
          className="mb-4 p-2 border rounded"
        />

        <button type="submit" className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700">
          Add Lesson
        </button>
      </form>
    </div>
  );
}

export default AddNewLesson;
