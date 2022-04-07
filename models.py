#pylint: disable=no-member,too-few-public-methods
''' Database models '''
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin

db = SQLAlchemy()

class User(UserMixin, db.Model):
    """ User model """

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(80), unique=True, nullable=False)


class Activities(db.Model):
    """ Activities model """

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, unique=True, nullable=False)
    name = db.Column(db.String(80), nullable=False)
