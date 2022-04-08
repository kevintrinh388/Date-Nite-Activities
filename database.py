# pylint: disable=missing-module-docstring
import os
from dotenv import load_dotenv, find_dotenv
from flask import Flask
from flask_sqlalchemy import SQLAlchemy


load_dotenv(find_dotenv())


app = Flask(__name__)  # comming from flask library

db_url = os.getenv("MY_DATABASE")
if db_url.startswith("postgres://"):
    db_url = db_url.replace("postgres://", "postgresql://", 1)

app.config["SQLALCHEMY_DATABASE_URI"] = db_url
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
app.config["SESSION_TYPE"] = "filesystem"

# Initialize the database
db = SQLAlchemy(app)
