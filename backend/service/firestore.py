import firebase_admin
from firebase_admin import credentials, firestore
import datetime
import os

# Path to your service account JSON file
SERVICE_ACCOUNT_PATH = "/Users/muslimhussaini/blackbox/backend/keys/blackbox-firebase.json"


def initialize_firebase():
    try:
        # Initialize the Firebase Admin SDK
        cred = credentials.Certificate(SERVICE_ACCOUNT_PATH)
        firebase_admin.initialize_app(cred)
        print("Firebase Admin SDK initialized successfully!")

        # Access Firestore
        db = firestore.client()
        print("Connected to Firestore!")

        # Test Writing to Firestore
        user_collection = db.collection("users")
        """
        user_collection.add({
            "username": "johndoe1",
            "email": "johndoe@example.com",
            "password": "abc123",
            "profile_picture": "",
            "bio": "Just another tech enthusiast!",
            "followers": [],
            "following": []
        })
        """

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

def register_new_user(username: str, email:str, password: str):
    users_collection = db.collection("users")
    users_collection.add({
        "username": username,
        "email": email,
        "password": password,
        "profile_picture": "",
        "bio": "No bio yet.",
        "followers": [],
        "following": []
    })
    return check_user_exists(username)

def add_new_image(username: str, image_url:str):
    image_collection = db.collection("imageUpload")
    image_collection.add({
        "username": username,
        "s3Reference": image_url
    })

def add_intrusion(username:str, image_url:str):
    intrusion_collection = db.collection("intrusionLogs")
    intrusion_collection.add({
        "username":username,
        "s3Reference": image_url,
        "datetime": str(datetime.now())
    })



db = initialize_firebase()