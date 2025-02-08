from flask import Flask, Blueprint, abort, jsonify, request, session

from flask_cors import CORS

from service.firestore import *

from service.aws_service import * 

uploads = Blueprint('uploads', __name__)

@uploads.route("/upload", methods=["POST"])
def upload_image():

    username = request.form.get("username")
    
    files = request.files.getlist("files")

    print(username)
    print(request.files)

    for file in files:
        presigned_url = upload_image_to_s3(file)

        if presigned_url:
            add_new_image(username, presigned_url)
        else:
            return jsonify({"message": "File upload failed"}), 500

    return jsonify({"message": "File upload"}), 200


@uploads.route("/test", methods=["POST"])
def test():
    file = request.files.get("file")

    presigned_url = upload_image_to_s3(file)
    return presigned_url




"""
@uploads.route("/intrusion_alerts", methods=["GET", "POST"])
def get_intrusions():
"""
