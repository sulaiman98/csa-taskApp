from app import ma
from app.models import Comments

class CommentSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Comments
        dumb_only = ("id",)
        include_fk = True
        load_instance = True
