import cv2
import yt_dlp
import time
import sys
import os
import base64

# sys.path.append(os.path.abspath("../service"))  # Add the directory to sys.path
from stream.snapshot_process import process_snapshot

def get_youtube_stream_url(youtube_url):
    ydl_opts = {
        'quiet': True,
        'format': 'best[ext=mp4]',  # Get the best available mp4 format
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(youtube_url, download=False)
        return info['url'] if 'url' in info else None


def analyze_stream(url: str):
    stream_url = get_youtube_stream_url(url)
    if not stream_url:
        print("Failed to retrieve stream URL")
        return

    capture = cv2.VideoCapture(stream_url)
    last_saved_time = time.time()

    while True:
        _, frame = capture.read()

        current_time = time.time()
        if current_time - last_saved_time >= 5:
            _, buffer = cv2.imencode('.jpg', frame)
            encoded_image = base64.b64encode(buffer).decode('utf-8')

            if process_snapshot(encoded_image):
                print("intruder detected")
            else:
                print("intruder not detected")
            
            last_saved_time = current_time  # Reset timer


if __name__ == "__main__":
    analyze_stream("https://www.youtube.com/watch?v=1OtdnQEVqG8")

            