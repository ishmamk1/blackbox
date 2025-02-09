from flask import Flask, Blueprint, abort, jsonify, request, session

from flask_cors import CORS

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

from service.firestore import db, check_user_exists, register_new_user, check_email_exists
import os
from livekit import api

livestream = Blueprint('livestream', __name__)

LIVEKIT_API_KEY = os.getenv("LIVEKIT_API_KEY", "your-api-key")
LIVEKIT_API_SECRET = os.getenv("LIVEKIT_API_SECRET", "your-api-secret")

@livestream.route("get_livekit_token", methods=["GET"])
def get_token():
    identity = request.args.get("identity", "guest")
    room = request.args.get("room", "test-room")

    # Create an access token
    at = api.AccessToken(LIVEKIT_API_KEY, LIVEKIT_API_SECRET, identity=identity)
    at.add_grant({"roomJoin": True, "room": room})

    return jsonify({"token": at.to_jwt()})