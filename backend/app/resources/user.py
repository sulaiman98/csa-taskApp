from datetime import datetime, timedelta
import json
from flask import request
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    get_jwt,
    get_jwt_identity,
    jwt_required
)
from flask_restful import Resource
from app.models import Users
from app.schemas.user import UserSchema

from app import db

user_schema = UserSchema()
users_schema = UserSchema(many=True)

class UserRegister(Resource):
    @classmethod
    def post(cls):
        user = user_schema.load(request.get_json())

        if user.find_by_username(user.username):
            return {"message": "A user with that username already exists."}, 400
        
        if user.find_by_email(user.email):
            return {"message": "A user with that email already exists."}, 400
        
        # if user.find_by_phone(user.phone):
        #     return {"message": "A user with that phone number already exists."}, 400
        
        user.set_password(user.password)
        user.save_to_db()

        return {"message": "User created successfully."}, 201
    

class UserLogin(Resource):
    @classmethod
    def post(cls):
        user_data = user_schema.load(request.get_json())

        user = Users.find_by_email(user_data.email)

        if user and user.check_password(user_data.password):
            access_token = create_access_token(identity=user.id, fresh=True)
            refresh_token = create_refresh_token(user.id)

            return {
                "access_token": access_token,
                "refresh_token": refresh_token,
                "email": user.email,
                "lastname": user.lastname,
                "firstname": user.firstname,
                "username": user.username,
                "email": user.email,
                "image_uri": user.profile_uri,
                "id": user.id
            }, 200
        
        return {"message": "Invalid credentials"}, 401

class UserDetailsResource(Resource):
    @classmethod
    # @jwt_required()
    def get(cls, user_id: int):
        user = Users.find_by_id(user_id)
        if not user:
            return {"message": "user not found"}, 404
        return user_schema.dump(user), 200
    
class UpdateUserDetailsResource(Resource):
    @classmethod
    def put(cls, user_id: int):
        data = user_schema.load(request.get_json())
        user = Users.find_by_id(user_id)

        if user:
            user.firstname = data.firstname
            user.lastname = data.lastname
            user.username = data.username
            user.email = data.email
            user.gender = data.gender
            user.phone = data.phone
            user.address = data.address
            user.save_to_db()
        else: 
            return {"message": "User not found"}
        return user_schema.dump(user), 200    
    

class GetSingleUserResource(Resource):
    @classmethod
    def get(cls):
        users = Users.query.all()

        results = users_schema.dump(users)
        return {'users': results}, 200

class UserPasswordUpdateResource(Resource):
    @classmethod
    def put(cls):
        user_data = user_schema.load(request.get_json())

        user = Users.find_by_email(user_data.email)

        if user: 
            user.set_password(user_data.password)
            user.save_to_db()
        else:
            return {"message": "user not found"}, 404
        return user_schema.dump(user), 200

class UserDeleteResource(Resource):
    @classmethod
    def delete(cls, user_id: int):
        user = Users.find_by_id(user_id)

        if not user:
            return {"message": "user not found"}, 404
        user.delete_from_db()
        return {"message": "user deleted successfully"}, 200
    

class UserProfileUpdate(Resource):
    @classmethod
    @jwt_required()
    def post(cls):
        data = request.get_json()
        user_id = get_jwt_identity()

        image_uri = data['image_uri']
        user = Users.find_by_id(user_id)

        if user:
            user.profile_uri = image_uri
            db.session.commit()

            print(user)
            return user_schema.dump(user)
            # return {'message': 'Image uploaded successfully'}, 200

        return {'message': 'User not found'}, 404