from email.headerregistry import Address
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin

db = SQLAlchemy()


class User(UserMixin, db.Model):
    """User model"""

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(80), unique=True, nullable=False)


class Favorites(db.Model):
    """Favorites model"""

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, unique=True, nullable=False)
    name = db.Column(db.String(80), nullable=False)
    address = db.Column(db.String(200))
    ratings = db.Column(db.String(30))
    range = db.Column(db.String(20))
    yelp_url = db.Column(db.String(100))
