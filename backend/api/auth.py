from flask import Flask, Blueprint, abort, jsonify, request, session

from flask_cors import CORS

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

from service.firestore import db, check_user_exists, register_new_user, check_email_exists

auth = Blueprint('auth', __name__)

@auth.route("/")
def hello():
    return "hi"

@auth.route("/token", methods=["POST"])
def create_token():
    if not db:
        return "Firestore database is not initialized."

    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = check_user_exists(email)

    if not user:
        return jsonify({"error": "Invalid email or password"}), 401
    
    with open('user.txt', 'w') as f:
        f.write(email)

    access_token = create_access_token(identity=email)
    return jsonify(
        access_token=access_token,
        username = user.get("username"),
        email = user.get("email")
        )

@auth.route("/register", methods=["POST"])
def register():
    # username = "eee"
    # email = "abc"
    # password = "abc"

    username = request.json.get("username", None)
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    phone_number = request.json.get("phone_number", "")  # Default to empty string if not provided


    if not username or not password or not email:
        return jsonify({"error": "Email and password are required"}), 400
    
    user = check_user_exists(username)
    checked_email = check_email_exists(email)

    if user:
        return jsonify({"error": "User already exists"}), 400
    
    if checked_email:
        return jsonify({"error": "Email already exists"}), 400
    
    with open('user.txt', 'w') as f:
        f.write(email)

    user = register_new_user(username, email, password)

    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token)

@auth.route("/logout", methods=["POST"])
def logout():
    try:
        with open('user.txt', 'w') as f:
            f.write('')
        return jsonify({"message": "Logged out successfully"}), 200
    except Exception as e:
        return jsonify({"error": f"Logout failed: {str(e)}"}), 500