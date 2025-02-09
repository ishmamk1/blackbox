import sys
import os
# sys.path.append(os.path.abspath("../"))  # Add the directory to sys.path
from models.facial_recognition import *
from models.person_detection import *
import base64 
import numpy as np 
import cv2
from service.aws_service import *
import jsonify
import firestore
import io


def decode_encoded_image( encoded_image : str ):
    # Decode Base64 string, convert to numpy array, then decode into a OpenCV image
    image_data = base64.b64decode(encoded_image)
    nparr = np.frombuffer(image_data, np.uint8)
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    return image


def process_snapshot(encoded_image: str) -> bool:
    # Decode the base64 string
    image_data = base64.b64decode(encoded_image)
    image_file = io.BytesIO(image_data)
    
    if people_present(image_file):
        if intruder_alert(image_file):
            # Upload to AWS and Firebase
            presigned_url = upload_image_to_s3(image_file)

            with open("../user.txt", "r") as file:
                username = file.read()
            
            if presigned_url:
                firestore.add_intrusion(username, presigned_url)
            else:
                return jsonify({"message": "File upload failed"}), 500
            
            return True 
    return False
    
