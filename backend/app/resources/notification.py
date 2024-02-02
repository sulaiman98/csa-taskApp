from datetime import datetime, timedelta
import json
from flask import request
from flask_jwt_extended import (
    get_jwt,
    get_jwt_identity,
    jwt_required
)
from flask_restful import Resource
from app.models import Notifications
from app.schemas.notification import NotificationSchema

notification_schema = NotificationSchema()

class NotificationResource(Resource):
    @classmethod
    def post(cls):
        notification = notification_schema.load(request.get_json())
        
        notification.save_to_db()

        return {"message": "Notification created successfully."}, 201
