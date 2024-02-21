from flask import jsonify
from marshmallow import ValidationError

from app import app, jwt, api

from app.resources.user import (
    UserRegister, 
    UserLogin, 
    UserDetailsResource,
    UpdateUserDetailsResource,
    GetSingleUserResource,
    UserPasswordUpdateResource, 
    UserDeleteResource,
    UserProfileUpdate
)

from app.resources.task import (
    CreateTaskResource,
    GetAllTaskResource,
    UserTasksResource,
    DeleteTaskResource,
    TaskUpdateResource
)

from app.resources.comment import CommentResource
from app.resources.notification import NotificationResource


api.add_resource(UserRegister, "/register")
api.add_resource(UserLogin, "/login")
api.add_resource(UserDetailsResource, "/user-details/<int:user_id>")
api.add_resource(GetSingleUserResource, "/all-users")
api.add_resource(UpdateUserDetailsResource, "/update-user/<int:user_id>")
api.add_resource(UserPasswordUpdateResource, "/update-password")
api.add_resource(UserDeleteResource, "/user-delete/<int:user_id>")
api.add_resource(UserProfileUpdate, "/user-profile")

api.add_resource(CreateTaskResource, "/create-task")
api.add_resource(GetAllTaskResource, "/all-tasks")
api.add_resource(UserTasksResource, "/user-tasks")
api.add_resource(DeleteTaskResource, "/delete-task/<int:task_id>")
api.add_resource(TaskUpdateResource, "/update-task/<int:task_id>")

api.add_resource(CommentResource, "/create-comment")
api.add_resource(NotificationResource, "/create-notification")


@app.route('/')
@app.route('/index')
def index():
    return 'This is my first flask project!!'