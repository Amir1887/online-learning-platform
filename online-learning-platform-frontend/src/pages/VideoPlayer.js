import React from 'react';

function VideoPlayer({ videoUrl, videopath }) {
  console.log("videopath", videopath);
  // Ensure videoUrl is defined and is a string
  if ((!videoUrl || typeof videoUrl !== 'string')  && !videopath ) {
    return <div>No video available</div>;
  }

  const fullVideoPath = videopath ? `http://localhost:4000${videopath}` : null;
  // Check if the video URL is from YouTube
  const isYouTube = videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be');

  return (
    <div className="video-player">
      {isYouTube ? (
        <iframe
          className="rounded-xl"
          width="1000"
          height="500"
          src={`https://www.youtube.com/embed/${new URL(videoUrl).searchParams.get('v')}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="YouTube Video player"
        ></iframe>
      ) : fullVideoPath ? (
        <video width="1000" height="500" controls>
          <source src={fullVideoPath} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : videoUrl ? (
        <video width="1000" height="500" controls>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div>No video available</div>
      )}
    </div>
  );
}

export default VideoPlayer;
