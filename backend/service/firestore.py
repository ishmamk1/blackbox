import firebase_admin
from firebase_admin import credentials, firestore
import datetime
import os

# Path to your service account JSON file
SERVICE_ACCOUNT_PATH = os.getenv("SERVICE_PATH")


def initialize_firebase():
    try:
        # Initialize the Firebase Admin SDK
        cred = credentials.Certificate(SERVICE_ACCOUNT_PATH)
        firebase_admin.initialize_app(cred)
        print("Firebase Admin SDK initialized successfully!")

        # Access Firestore
        db = firestore.client()
        print("Connected to Firestore!")



        print("Document written successfully!")
        return db

    except Exception as e:
        print("An error occurred:", e)
        return None

def check_user_exists(email: str):
    users_collection = db.collection("users")
    query = users_collection.where("email", "==", email)

    results = list(query.stream())
    user = results[0].to_dict() if len(results) > 0 else None
    print(user)
    return user

def check_email_exists(email: str):
    users_collection = db.collection("users")
    query = users_collection.where("email", "==", email)

    results = list(query.stream())
    user = results[0].to_dict() if len(results) > 0 else None
    return user

def register_new_user(username: str, email: str, password: str):
    users_collection = db.collection("users")

    try:
        users_collection.add({
            "username": username,
            "email": email,
            "password": password,
            "profile_picture": "",
            "bio": "No bio yet.",
            "followers": [],
            "following": []
        })
        print(f"User {username} added successfully!")  # Debugging
    except Exception as e:
        print("Error adding user:", e)

    return check_user_exists(username)


def add_new_image(username: str, image_url:str):
    image_collection = db.collection("imageUpload")
    image_collection.add({
        "username": username,
        "s3Reference": image_url
    })
    
def add_phone_number(username: str, phone_number: str):
    try:
        # Query Firestore to find the document by username field
        user_ref = db.collection("users").where("username", "==", username).limit(1)

        # Get the document snapshot
        doc_snapshot = user_ref.get()

        # Check if the document exists
        if len(doc_snapshot) == 0:
            print(f"No user found with username: {username}")
            return  # If user is not found, do nothing or handle as needed

        # Get the first document from the snapshot
        user_doc = doc_snapshot[0]

        # Set the phone number field using the document reference
        user_doc.reference.set({
            "phone_number": phone_number
        }, merge=True)  # Using merge=True will only set the phone_number without affecting other fields

        print(f"Phone number set successfully for {username}.")
    except Exception as e:
        print(f"Error setting phone number: {e}")




    

def add_intrusion(username:str, image_url:str):
    intrusion_collection = db.collection("intrusionLogs")
    intrusion_collection.add({
        "username":username,
        "s3Reference": image_url,
        "datetime": str(datetime.now())
    })


db = initialize_firebase()