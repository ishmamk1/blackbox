from flask import Flask, Blueprint, jsonify, request
from flask_cors import CORS
from service.firestore import *

from service.aws_service import * 

phone = Blueprint('phoneNumber', __name__)

@phone.route("/submit-phone", methods=["POST"])
def upload_number():
    try:
        
        # Use get_json to parse the JSON body sent from the frontend
        data = request.get_json()  # Make sure to use get_json() for JSON data
        username = data.get("username")
        phone_number = data.get("phoneNumber")
        if not phone_number:
            return jsonify({"message": "Phone number is required"}), 400

        print(f"Received phone number: {phone_number}")
        add_phone_number(username, phone_number)
        return jsonify({"message": "Phone number submitted successfully"}), 200
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"message": "An error occurred, please try again later."}), 500

