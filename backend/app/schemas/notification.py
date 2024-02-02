from app import ma
from app.models import Notifications

class NotificationSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Notifications
        dump_only = ("id",)
        include_fk = True
        load_instance = True
