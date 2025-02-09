import React, { useRef, useEffect, useState } from 'react';

interface CaptureStatus {
    isActive: boolean;
    lastCaptureTime: string | null;
    error: string | null;
  }
  
  interface UploadResponse {
    success: boolean;
    message: string;
  }
  
  // VideoStream.tsx
  
  const VideoStream: React.FC = () => {
    const imgRef = useRef<HTMLImageElement | null>(null);
    const [status, setStatus] = useState<CaptureStatus>({
      isActive: true,
      lastCaptureTime: null,
      error: null
    });
  
    const captureAndSendScreenshot = async (): Promise<void> => {
      if (!imgRef.current) return;
      
      const canvas: HTMLCanvasElement = document.createElement('canvas');
      const context: CanvasRenderingContext2D | null = canvas.getContext('2d');
      
      canvas.width = imgRef.current.width;
      canvas.height = imgRef.current.height;
      
      if (!context) {
        setStatus(prev => ({
          ...prev,
          error: 'Failed to get canvas context'
        }));
        return;
      }
      
      try {
        // Draw the current frame
        context.drawImage(imgRef.current, 0, 0, canvas.width, canvas.height);
        
        // Convert to blob
        const blob: Blob = await new Promise((resolve, reject) => {
          canvas.toBlob((blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Failed to create blob'));
            }
          }, 'image/jpeg', 0.95);
        });
        
        // Create FormData
        const formData = new FormData();
        formData.append('image', blob, `screenshot-${Date.now()}.jpg`);
        
        // Send to endpoint
        const response = await fetch('//127.0.0.1/test', {
          method: 'POST',
          body: formData,
        });
        
        const result: UploadResponse = await response.json();
        
        if (response.ok && result.success) {
          setStatus(prev => ({
            ...prev,
            lastCaptureTime: new Date().toLocaleTimeString(),
            error: null
          }));
        } else {
          throw new Error(result.message || 'Upload failed');
        }
      } catch (error) {
        setStatus(prev => ({
          ...prev,
          error: error instanceof Error ? error.message : 'An unknown error occurred'
        }));
      }
    };
  
    useEffect(() => {
      let intervalId: ReturnType<typeof setInterval> | undefined;
  
      if (status.isActive) {
        // Initial capture
        void captureAndSendScreenshot();
        
        // Set up interval for subsequent captures
        intervalId = setInterval(() => {
          void captureAndSendScreenshot();
        }, 5000);
      }
  
      // Cleanup function
      return () => {
        if (intervalId) {
          clearInterval(intervalId);
        }
      };
    }, [status.isActive]);
  
    const toggleCapture = (): void => {
      setStatus(prev => ({
        ...prev,
        isActive: !prev.isActive,
        error: null
      }));
    };
  
    return (
      <div className="flex flex-col items-center gap-4 p-4">
        <h2 className="text-xl font-bold">Live Video Stream</h2>
        <img
          ref={imgRef}
          src="http://10.253.211.32:8000/video_stream"
          alt="Live Stream"
          className="w-[640px] h-[480px] border-2 border-black"
        />
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={toggleCapture}
            className={`px-4 py-2 rounded transition-colors ${
              status.isActive 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-green-500 hover:bg-green-600'
            } text-white`}
          >
            {status.isActive ? 'Stop Capture' : 'Start Capture'}
          </button>
          
          {status.lastCaptureTime && (
            <p className="text-sm text-gray-600">
              Last capture: {status.lastCaptureTime}
            </p>
          )}
          
          {status.error && (
            <p className="text-sm text-red-500">
              Error: {status.error}
            </p>
          )}
        </div>
      </div>
    );
  };
  
  export default VideoStream;