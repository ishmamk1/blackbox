import sys
import os
sys.path.append(os.path.abspath("../models"))  # Add the directory to sys.path
import facial_recognition
import person_detection 
import base64 
import numpy as np 
import cv2


def decode_encoded_image( encoded_image : str ):
    # Decode Base64 string, convert to numpy array, then decode into a OpenCV image
    image_data = base64.b64decode(encoded_image)
    nparr = np.frombuffer(image_data, np.uint8)
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    return image


def process_snapshot( encoded_image : str ) -> True:
    if( person_detection.people_present( encoded_image ) ):
        if ( person_detection.intruder_alert( encoded_image ) ):
            # do stuff with AWS and Firebase
            return True 
    return False
    
