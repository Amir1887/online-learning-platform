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
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h3 className="text-2xl font-bold text-blue-600 mb-4">Upload Video and Files:</h3>

      {/* Video Upload */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="video-upload">
          Upload Video:
        </label>
        <input
          type="file"
          accept="video/mp4"
          onChange={handleVideoUpload}
          id="video-upload"
          className="block w-full text-sm text-gray-500 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-lg file:text-sm file:font-medium file:bg-gray-100 hover:file:bg-gray-200"
          />
      </div>

      {/* File Upload */}
      {/* file: prefix applies styles specifically to file input elements. */}
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="file-upload">
          Upload Files:
        </label>
        <input
          type="file"
          multiple
          onChange={handleFileUpload}
          id="file-upload"
          className="block w-full text-sm text-gray-500 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-lg file:text-sm file:font-medium file:bg-gray-100 hover:file:bg-gray-200"
          />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Upload
      </button>
    </div>
  );
};

export default UploadControls;
