from flask import Flask, Response
import cv2
from flask_cors import CORS
import time
import os
import requests

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

# Open the camera (you can modify the index if you have multiple cameras)
cap = cv2.VideoCapture(0)

# Define FPS
FPS = 30

# Define the uploads folder path
uploads_folder = '/Users/ishmam/blackbox-1/stream/uploads'

# Create the uploads folder if it doesn't exist
if not os.path.exists(uploads_folder):
    os.makedirs(uploads_folder)

# Function to generate frames for the video stream
def generate_frames():
    last_saved_time = time.time()
    
    while True:
        # Read a frame from the camera
        success, frame = cap.read()
        if not success:
            break

        # Resize frame if necessary
        frame = cv2.resize(frame, (640, 480))

        # Encode the frame to JPEG format
        ret, buffer = cv2.imencode('.jpg', frame)
        if not ret:
            continue

        # Capture and save a screenshot every 5 seconds
        current_time = time.time()
        if current_time - last_saved_time >= 5:
            timestamp = time.strftime("%Y%m%d-%H%M%S")
            image_filename = os.path.join(uploads_folder, f'screenshot_{timestamp}.jpg')
            cv2.imwrite(image_filename, frame)
            last_saved_time = current_time  # Update the last saved time

            with open(image_filename, "rb") as img_file:
                files = {"file": img_file}
                try:
                    response = requests.post("http://127.0.0.1:5000/test", files=files)
                    print(f"Sent {image_filename}, Response: {response.text}")
                except requests.exceptions.RequestException as e:
                    print(f"Failed to send screenshot: {e}")

        # Convert the frame to bytes and yield it to stream
        frame = buffer.tobytes()

        # Yield the frame and set appropriate HTTP headers for streaming
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

# Route for video streaming
@app.route('/video_stream')
def video_stream():
    return Response(generate_frames(), content_type='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
