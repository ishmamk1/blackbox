from flask import Flask, Blueprint, abort, jsonify, request, session

from flask_cors import CORS

from service.firestore import db, check_user_exists, register_new_user, check_email_exists

upload = Blueprint('upload', __name__)

@upload.route("/upload", methods=["POST"])
def upload_image():
    user


@upload.route("/intrusion_alerts", methods=["GET", "POST"])
def get_intrusions():
    