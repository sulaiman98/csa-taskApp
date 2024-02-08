from typing import List
from datetime import datetime, date, timedelta
from sqlalchemy.dialects.mysql import LONGTEXT
from sqlalchemy import or_
from werkzeug.security import generate_password_hash, check_password_hash
import hashlib
import pytz
import moment


from app import app, db


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True, index=True)
    firstname = db.Column(db.String(50))
    lastname = db.Column(db.String(50))
    username = db.Column(db.String(50))
    email = db.Column(db.String(50))
    gender = db.Column(db.String(50))
    address = db.Column(db.String(250))
    phone = db.Column(db.String(50))
    password = db.Column(db.String(150))
    profile_uri = db.Column(db.String(255))
    timestamp = db.Column(db.DateTime, default=datetime.now())


    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()

    def set_password(self, password: str):
        self.password = generate_password_hash(password)

    def check_password(self, password: str):
        return check_password_hash(self.password, password)
    
    @classmethod
    def find_by_id(cls, _id: int) -> "Users":
        return cls.query.filter_by(id=_id).first()
    
    @classmethod
    def find_by_username(cls, username: str) -> "Users":
        return cls.query.filter_by(username=username).first()
    
    @classmethod
    def find_by_email(cls, email: str) -> "Users":
        return cls.query.filter_by(email=email).first()
    
    @classmethod
    def find_by_phone(cls, phone: str) -> "Users":
        return cls.query.filter_by(phone=phone).first()


class Tasks(db.Model):
    id = db.Column(db.Integer, primary_key=True, index=True)
    taskname = db.Column(db.String(250), nullable=False)
    taskdescription = db.Column(db.String(500), nullable=False)
    startdate = db.Column(db.Date, index=True, nullable=False)
    enddate = db.Column(db.Date, index=True, nullable=False)
    status = db.Column(db.String(100), default="On-going") # Default value for status
    priority = db.Column(db.String(100))
    visibility = db.Column(db.String(100))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.now())

    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()

    @classmethod
    def find_by_id(cls, _id: int) -> "Tasks":
        return cls.query.filter_by(id=_id).first()
    
    @classmethod
    def find_by_userid(cls, _userid: int) -> "Tasks":
        return cls.query.filter_by(user_id=_userid).first()
    
    # # Parsing Datatime String function
    # @staticmethod
    # def parse_date(date_string):
    #     return datetime.strptime(date_string, '%Y/%m/%d')
    

class Comments(db.Model):
    id = db.Column(db.Integer, primary_key=True, index=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    message = db.Column(db.String(1000), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.now())

    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()

    @classmethod
    def find_by_id(cls, _id: int) -> "Comments":
        return cls.query.filter_by(id=_id).first()
    
    @classmethod
    def find_by_userid(cls, _userid: int) -> "Comments":
        return cls.query.filter_by(user_id=_userid).first()
    

class Notifications(db.Model):
    id = db.Column(db.Integer, primary_key=True, index=True)
    task_id = db.Column(db.Integer, db.ForeignKey("tasks.id"), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.now())

    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()

    @classmethod
    def find_by_id(cls, _id: int) -> "Notifications":
        return cls.query.filter_by(id=_id).first()
    
    @classmethod
    def find_by_taskid(cls, _task_id: int) -> "Notifications":
        return cls.query.filter_by(task_id=_task_id).first()




