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

    if not facial_encodings_in_frame:
        return False  

    # Check each detected face against known faces
    for uncertain_face in facial_encodings_in_frame:
        matches = face_recognition.compare_faces(recognized_faces, uncertain_face)
        
        if any(matches):
            return False  

    return True

if __name__ == "__main__":
    with open("../familiar_faces/known_face.png", "rb") as file:
        known_encoded_image = base64.b64encode(file.read()).decode('utf-8')
    learn_face(known_encoded_image)

    with open("../familiar_faces/unknown_face.png", "rb") as file:
        unknown_encoded_image = base64.b64encode(file.read()).decode('utf-8')
    
    with open("../familiar_faces/another_known_face.png", "rb") as file:
        another_known_encoded_image = base64.b64encode(file.read()).decode('utf-8')
    
    print( intruder_alert( unknown_encoded_image ) )
    print( intruder_alert(known_encoded_image) )
    print( intruder_alert(another_known_encoded_image) )
    
    
