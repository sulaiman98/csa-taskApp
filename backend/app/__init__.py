from flask import Flask
# from flask_admin import Admin
from flask_restful import Api
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from flask_uploads import configure_uploads
from app.libs.image_helper import IMAGE_SET
from config import Config 

app = Flask(__name__)
app.config.from_object(Config)

api = Api(app)
jwt = JWTManager(app)
db = SQLAlchemy(app)
migrate = Migrate(app, db)
ma = Marshmallow(app)
CORS(app)
configure_uploads(app, IMAGE_SET)


from app import routes