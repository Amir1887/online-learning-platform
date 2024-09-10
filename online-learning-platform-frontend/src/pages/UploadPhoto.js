import React, { useState } from 'react';
import axios from 'axios';

function UploadPhoto() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState('');

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
    console.log(e.target.files);
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
      
      setPhotoUrl(response.data.filePath);
      alert('File uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file.');
    }
    setUploading(false);
  };

  return (
    <div>
      <input type="file" onChange={onFileChange} />
      <button onClick={onUpload} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload Photo'}
      </button>
      {photoUrl && (
        <div>
          <h3>Uploaded Photo:</h3>
          <img src={photoUrl} alt="Uploaded" style={{ width: '300px' }} />
        </div>
      )}
    </div>
  );
}

export default UploadPhoto;
