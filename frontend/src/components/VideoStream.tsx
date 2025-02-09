import React, { useRef, useEffect, useState } from 'react';
  
  // VideoStream.tsx
  
  const VideoStream: React.FC = () => {
    
  
    return (
      <div className="flex flex-col items-center gap-4 p-4">
        <img
          src="http://10.253.210.224:8000/video_stream"
          alt="Live Stream"
          className="w-[640px] h-[480px] border-2 border-black"
        />
        </div>

    );
  };
  
  export default VideoStream;