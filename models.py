# pylint: disable=no-member,too-few-public-methods
""" Database models """
from flask_login import UserMixin
from database import db


class User(UserMixin, db.Model):
    """User model"""

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(80), unique=True, nullable=False)
    pic_url = db.Column(db.String(120))
    is_google_user = db.Column(db.Boolean, default=False, nullable=False)
    confirmed = db.Column(db.Boolean, default=False, nullable=False)

    def __repr__(self):
        return f"<User {self.username, self.email}>"


class Favorites(db.Model):
    """Favorites model"""

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False)
    place = db.Column(db.String(80), nullable=False)
    rating = db.Column(db.Integer)
    range = db.Column(db.String(20))
    address1 = db.Column(db.String(200))
    city = db.Column(db.String(100))
    zipcode = db.Column(db.String(100))
    state = db.Column(db.String(100))
    yelp_id = db.Column(db.String(100))
    yelp_url = db.Column(db.String(300))
    image_url = db.Column(db.String(300))

    def __repr__(self):
        return f"<Favorites {self.username, self.place}>"


db.create_all()
