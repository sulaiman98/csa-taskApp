from datetime import datetime, timedelta
import json
from flask import request
from flask_jwt_extended import (
    get_jwt,
    get_jwt_identity,
    jwt_required
)
from flask_restful import Resource
from app.models import Tasks
from app.schemas.task import TaskSchema


task_schema = TaskSchema()
tasks_schema = TaskSchema(many=True)

class CreateTaskResource(Resource):
    @classmethod
    def post(cls):
        tasks = task_schema.load(request.get_json())

        Tasks.save_to_db(tasks)

        return {"tasks": "created"}, 201
    
class TaskUpdateResource(Resource):
    @classmethod
    def put(cls, task_id):
        task_data = task_schema.load(request.get_json())

        task = Tasks.find_by_id(task_id)

        if task:
            task.taskname = task_data.taskname
            task.taskdescription = task_data.taskdescription
            task.startdate = task_data.startdate
            task.enddate = task_data.enddate
            task.status = task_data.status
            task.priority = task_data.priority

            task.save_to_db()
        
        else:
            return{"message": "Task not Found"}
        return task_schema.dump(task), 200

class GetAllTaskResource(Resource):
    @classmethod
    def get(cls):
        tasks = Tasks.query.all()

        results = tasks_schema.dump(tasks)
        return {"tasks": results}
    

# This EndPoints is use to get all the Task of the login User
class UserTasksResource(Resource):
    @classmethod
    @jwt_required() # Require JWT token for this endpoint
    def get(cls):

        # Get the user ID from the JWT token
        user_id = get_jwt_identity()

        user_tasks = Tasks.query.filter_by(user_id=user_id).all()
        serialized_tasks =  tasks_schema.dump(user_tasks)

        return {"Tasks": serialized_tasks}, 200
    
class DeleteTaskResource(Resource):
    @classmethod
    def delete(cls, task_id: int):
        task = Tasks.find_by_id(task_id)

        if not task:
            return {'message': 'Task not found'}

        task.delete_from_db()
        return {'message': 'Task deleted successfully'}
    
