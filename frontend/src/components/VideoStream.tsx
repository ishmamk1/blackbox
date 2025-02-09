import React, { useState } from 'react';

const VideoStream: React.FC = () => {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [embedUrl, setEmbedUrl] = useState('');

  // Update the input value as the user types
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYoutubeUrl(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const videoId = extractVideoId(youtubeUrl);
    console.log('Extracted Video ID:', videoId);
    
    if (videoId) {
      setEmbedUrl(`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`);
      
      // Send the URL to Flask backend
      try {
        const response = await fetch('http://127.0.0.1:5000/video_url', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ youtubeUrl }),
        });

        if (!response.ok) {
          throw new Error('Failed to send YouTube URL');
        }

        const data = await response.json();
        console.log('Response from Flask:', data);
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      alert('Please enter a valid YouTube URL');
    }
  };

  // Extract the video ID from a YouTube URL
  const extractVideoId = (url: string): string | null => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      {/* Form to paste the YouTube URL */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          placeholder="Enter YouTube URL"
          value={youtubeUrl}
          onChange={handleUrlChange}
          className="border border-gray-400 p-2 rounded text-black"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Play
        </button>
      </form>

      {/* If an embed URL is set, display the YouTube video in an iframe */}
      {embedUrl ? (
        <iframe
          width="1200"
          height="800"
          src={embedUrl}
          title="YouTube Video Stream"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <p>Please enter a YouTube link to start streaming</p>
      )}
    </div>
  );
};

export default VideoStream;
