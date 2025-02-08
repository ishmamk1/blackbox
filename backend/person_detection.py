import cv2
import numpy as np
import base64


def people_present( encoded_image : str ) -> bool:

    # Load the pre-trained model
    net = cv2.dnn.readNetFromCaffe("models/deploy.prototxt", "models/mobilenet_iter_73000.caffemodel")

    # Decode Base64 string, convert to numpy array, then decode into a OpenCV image
    image_data = base64.b64decode(encoded_image)
    nparr = np.frombuffer(image_data, np.uint8)
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    
    # pass the image into a pre-trained model
    blob = cv2.dnn.blobFromImage(image, 0.007843, (300, 300), 127.5)
    net.setInput(blob)
    detections = net.forward()

    for i in range(detections.shape[2]):
        # go through the detected objects and retrieve type of classification + confidence
        confidence = detections[0, 0, i, 2]  
        class_id = int(detections[0, 0, i, 1])  

        # class_id == human tests for human
        if class_id == 15 and confidence > 0.5:
            return True  
    
    return False



if __name__ == "__main__":
    
    with open("images/no_people.png", "rb") as file:
        encoded_image = base64.b64encode(file.read()).decode('utf-8')

    print(people_present(encoded_image))


