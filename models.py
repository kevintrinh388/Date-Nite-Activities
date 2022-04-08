# pylint: disable=no-member,too-few-public-methods
""" Database models """
from flask_login import UserMixin
from database import db


class User(UserMixin, db.Model):
    """User model"""

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.Integer, unique=True, nullable=False)
    email = db.Column(db.String(80), unique=True, nullable=False)
    pic_url = db.Column(db.String(120))

    def __repr__(self):
        return f"<User {self.username, self.email}>"


class Favorites(db.Model):
    """Favorites model"""

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.Integer, unique=True, nullable=False)
    place = db.Column(db.String(80), nullable=False)
    address = db.Column(db.String(200))
    rating = db.Column(db.Integer)
    range = db.Column(db.String(20))
    yelp_url = db.Column(db.String(120))

    def __repr__(self):
        return f"<Favorites {self.username, self.place}>"


db.create_all()
