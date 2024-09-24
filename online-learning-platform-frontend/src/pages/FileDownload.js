import React from 'react';
const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:4000';

function FileDownload({ attachments, attachmentpath }) {
  if (!attachments || attachments.length === 0 || !attachmentpath) {
    return <p className="text-center text-gray-600">No attachments available.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      {attachmentpath && (
        <div className="mb-4">
          <a
            href={`${BASE_URL}${attachmentpath}`}
            download
            className="block text-blue-600 hover:underline mb-2 text-lg font-semibold"
          >
            Download Main File
          </a>
        </div>
      )}
      {attachments && attachments.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-blue-600 mb-4">Other Attachments:</h3>
          <ul className="space-y-2">
            {attachments.map((attachment, index) => (
            <li key={index}>
              {attachment.url ?(
                <a
                className="flex items-center text-blue-600 hover:underline"
                href={attachment.url}
                download
              >
                <svg
                  className="w-5 h-5 mr-2 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v8m4-4H8m4 4L4 12m8 8l8-8"
                  />
                </svg>
                {attachment.name} <span className="ml-2">(Download)</span>
              </a>
              ):(
                <span className="text-gray-500">No link available</span>
              )}   
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default FileDownload;
