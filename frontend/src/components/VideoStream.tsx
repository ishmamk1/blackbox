import React from "react";

const VideoStream: React.FC = () => {
  return (
    <div>
      <h2>Live Video Stream</h2>
      <img
        src="http://10.253.211.32:8000/video_stream"
        alt="Live Stream"
        style={{ width: "640px", height: "480px", border: "2px solid black" }}
      />
    </div>
  );
};

export default VideoStream;