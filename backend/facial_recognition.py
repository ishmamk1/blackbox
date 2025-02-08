import face_recognition
import os 
import cv2 
import numpy as np
import base64

recognized_faces = []

def learn_face( encoded_image : str ) -> None:

    # Decode Base64 string, convert to numpy array, then decode into a OpenCV image
    image_data = base64.b64decode(encoded_image)
    nparr = np.frombuffer(image_data, np.uint8)
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    # get the facial encoding for the newly added face, add to pool of known faces
    facial_encoding = face_recognition.face_encodings(image)[0] 
    recognized_faces.append(facial_encoding)
    return


def intruder_alert( encoded_image ) -> bool:
    global recognized_faces

    # Decode Base64 string, convert to numpy array, then decode into a OpenCV image
    image_data = base64.b64decode(encoded_image)
    nparr = np.frombuffer(image_data, np.uint8)
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    # process for intruders
    faces = face_recognition.face_locations(image)
    facial_encodings_in_frame = face_recognition.face_encodings(image, faces)

    # if the person in frame is anyone we know, then set off an alarm
    for uncertain_face in facial_encodings_in_frame:
        for known_face in uncertain_face:
            if( face_recognition.compare_faces([known_face], uncertain_face)[0] ):
                return False

    return True
