import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UploadPhoto() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState('');
  const [preview, setPreview] = useState('');


  // When file changes, generate a preview URL
  const onFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));  // Generate preview URL
    } else {
      setPreview('');
    }
  };

  const onUpload = async () => {
    if (!file) {
      alert('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('photo', file);

    setUploading(true);
    try {
      const response = await axios.post('http://localhost:4000/upload-photo', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      // Prepend the server URL to the photo URL if needed
       setPhotoUrl(`http://localhost:4000${response.data.filePath}`);
      console.log("here is the photo url after uploading",response.data.filePath);

      alert('File uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file.');
    }
    setUploading(false);
  };

  return (
    <div className='mt-4 ml-5  flex flex-col  gap-3'>
      {/* Custom styled input for file */}
      <div className="mb-4">
        <label htmlFor="file-upload" className="cursor-pointer inline-block p-3 text-white bg-blue-500 rounded-xl font-semibold hover:bg-blue-600">
          Choose File
        </label>
        <input
          id="file-upload"
          type="file"
          className="hidden"  // Hide the default file input
          onChange={onFileChange}
        />
      </div>

      {/* Image preview before uploading */}
      {preview && (
        <div className='mb-4 ml-5'>
          <h3>Image Preview:</h3>
          <img src={preview} alt="Preview" style={{ width: '300px' }} />
        </div>
      )}

      {/* Upload button */}
      <button className=' border font-semibold hover:border-blue-400 p-3 rounded-xl mb-4 max-w-xs' onClick={onUpload} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload Photo'}
      </button>

      {/* Display uploaded photo */}
      {photoUrl && (
        <div className='ml-9'>
          <h3>Uploaded Photo:</h3>
          <img className='ml-3' src={photoUrl} alt="Uploaded" style={{ width: '300px' }} />
        </div>
      )}
    </div>
  );
}

export default UploadPhoto;
