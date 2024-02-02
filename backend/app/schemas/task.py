from app import ma
from app.models import Tasks

class TaskSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Tasks
        dump_only = ("id",)
        include_fk = True
        load_instance = True

    # Specify date and datetime formats for startdate and enddate fields
    # startdate = ma.Field(format='%Y/%m/%d')
    # enddate = ma.Field(format='%Y/%m/%d')

    
    # Optionally, you can add custom serialization for datetime fields
    # startdate = ma.auto_field(dump_only=True)
    # enddate = ma.auto_field(dump_only=True)