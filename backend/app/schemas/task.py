from app import ma
from app.models import Tasks

class TaskSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Tasks
        dump_only = ("id",)
        include_fk = True
        load_instance = True
