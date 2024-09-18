import { useState } from 'react';

const UploadControls = ({ lessonId }) => {
  const [videoFile, setVideoFile] = useState(null);
  const [files, setFiles] = useState([]);

  const handleVideoUpload = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleFileUpload = (e) => {
    setFiles([...e.target.files]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('video', videoFile);
    files.forEach((file) => formData.append('attachments', file));

    // Submit form to backend to save video and files
    try {
      const response = await fetch(`http://localhost:4000/lesson/upload-file/${lessonId}`, {
        method: 'POST',
        body: formData,
      });

      // handle success/failure
      if (response.ok) {
        const data = await response.json();
        console.log('Success:', data);
      } else {
        console.error('Upload failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="upload-controls">
      <h3>Upload Video and Files:</h3>

      {/* Video Upload */}
      <input type="file" accept="video/mp4" onChange={handleVideoUpload} />

      {/* File Upload */}
      <input type="file" multiple onChange={handleFileUpload} />

      <button onClick={handleSubmit}>Upload</button>
    </div>
  );
};

export default UploadControls;
