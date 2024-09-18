import React from 'react';

function FileDownload({ attachments }) {
  if (!attachments || attachments.length === 0) {
    return <p>No attachments available.</p>;
  }

  return (
    <div>
      {attachments.map((attachment, index) => (
        <a className='flex ' key={index} href={attachment.url} download>
          {attachment.name} Download
        </a>
      ))}
    </div>
  );
}

export default FileDownload;
