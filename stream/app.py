from flask import Flask, Response
import cv2
from flask_cors import CORS
import time

app = Flask(__name__)
CORS(app, supports_credentials=True, origins=["http://localhost:5173"])

# Open the camera (default camera)
cap = cv2.VideoCapture(0)

# Set the desired frame size (e.g., 640x480)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

# Set the frame rate to 15 FPS (you can adjust this based on needs)
FPS = 30

def generate_frames():
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
        # Convert the frame to bytes and yield it to stream
        frame = buffer.tobytes()
        
        # Control the frame rate by introducing a delay
        time.sleep(1 / FPS)
        
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/video_stream')
def video_stream():
    return Response(generate_frames(), content_type='multipart/x-mixed-replace; boundary=frame')

@app.route("/test", methods=["GET"])
def test():
    return "hi"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)