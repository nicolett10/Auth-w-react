"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from werkzeug.security import generate_password_hash, check_password_hash
import os

api = Blueprint('api', __name__)

@api.route('/users', methods=['POST'])
def store_user():

    id = request.json.get('id')
    firstname = request.json.get('firstname')  
    lastname = request.json.get('lastname')  
    email = request.json.get('email')  
    password = request.json.get('password')  
    is_active = request.json.get('is_active')  

    user = User()
    user.id = id
    user.firstname = firstname
    user.lastname = lastname
    user.email = email
    user.password = generate_password_hash(password)
    user.is_active = is_active
    user.save()

    return jsonify(user.serialize()), 201


@api.route('/token', methods=['POST'])
def login():

    email = request.json.get('email') 
    password = request.json.get('password')

    if not email: return jsonify({ "status": "error", "code": 400, "message": "Email is required!"}), 400
    if not password: return jsonify({ "status": "error", "code": 400, "message": "Password is required!"}), 400

    user = User.query.filter_by(email=email).first()

    if not user: return jsonify({ "status": "error", "code": 401, "message": "Email/Password are incorrects"}), 401
    if not check_password_hash(user.password, password): return jsonify({ "status": "error", "code": 401, "message": "Email/Password are incorrects"}), 401


    access_token = create_access_token(identity=user.id)

    data = {
        "access_token": access_token,
        "user": user.serialize()
    }

    return jsonify({ "status": "success", "code": 200, "message": "User loggin successfully!", "data": data}), 200

@api.route("/hello", methods=["GET"])
@jwt_required()
def get_hello():
    message = {
        "msg" : "you are logged in"
    }
    return jsonify(message)