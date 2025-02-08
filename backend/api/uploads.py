from flask import Flask, Blueprint, abort, jsonify, request, session

from flask_cors import CORS

from service.firestore import db, check_user_exists, register_new_user, check_email_exists

uploads = Blueprint('uploads', __name__)

@uploads.route("/upload", methods=["POST"])
def upload_image():
    print("hello")
    return "a"


"""
@uploads.route("/intrusion_alerts", methods=["GET", "POST"])
def get_intrusions():
"""
