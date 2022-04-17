# pylint:disable=no-member
# pylint: disable=invalid-name
"""Control all server side logic and routes"""
import os
from dotenv import find_dotenv, load_dotenv
import flask
from flask import make_response
from emails import create_email
from tokenizer import confirm_token, generate_confirmation_token
from flask_mail import Mail
from yelp import business_search
from maps import maps_search
from google_calendar import add_event
from models import db, Favorites, User

app = flask.Flask(__name__)


# set up a separate route to serve the index.html file generated
# by create-react-app/npm run build.
# By doing this, we make it so you can paste in all your old app routes
# from Milestone 2 without interfering with the functionality here.
bp = flask.Blueprint(
    "bp",
    __name__,
    template_folder="./static/react",
)

load_dotenv(find_dotenv())

app.secret_key = os.getenv("SECRET_KEY")

# Point SQLAlchemy to your Heroku database
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("MY_DATABASE")
# Gets rid of a warning
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

app.config["MAIL_SERVER"] = os.getenv("MAIL_SERVER")
app.config["MAIL_USERNAME"] = os.getenv("MAIL_USERNAME")
app.config["MAIL_PASSWORD"] = os.getenv("MAIL_PASSWORD")
app.config["MAIL_PORT"] = 465
app.config["MAIL_USE_TLS"] = False
app.config["MAIL_USE_SSL"] = True
mail = Mail(app)

db.init_app(app)

with app.app_context():
    db.create_all()

# route for serving React page
@bp.route("/home")
def home():
    """
    Route for serving React page
    """
    return flask.render_template("index.html")


app.register_blueprint(bp)


@app.route("/")
def index():
    """Route for index page"""
    return flask.redirect(flask.url_for("login"))


@app.route("/login")
def login():
    """Route for login page on React"""
    return flask.render_template("index.html")


@app.route("/signup")
def signup():
    """Route for signup page on React"""
    return flask.render_template("index.html")


@app.route("/profile")
def profile():
    """Route for profile page on React"""
    return flask.render_template("index.html")


@app.route("/dashboard")
def dashboard():
    """Route for dashbord page on React"""
    return flask.render_template("index.html")


@app.route("/landing")
def landing():
    """Route for landing page on React"""
    return flask.render_template("index.html")


@app.route("/search_yelp", methods=["GET", "POST"])
def search_yelp():
    """Route for loading yelp info"""
    request = flask.request.get_json(force=True)
    location = request["location"]
    term = request["term"]
    rating = int(request["rating"])
    price = request["price"]

    business_list = business_search(location, term, rating, price)

    return flask.jsonify(business_list)


@app.route("/search_maps", methods=["GET", "POST"])
def search_maps():
    """Route for loading google maps"""
    query = flask.request.get_json(force=True)

    google_maps = maps_search(query)

    return flask.jsonify(google_maps)


@app.route("/save_google_user", methods=["POST"])
def save_google_user():
    """Route for persisting google user"""
    data = flask.request.get_json(force=True)
    username = data["name"]
    email = data["email"]
    pic_url = data["imageUrl"]
    user = User.query.filter_by(username=username).first()
    if not user:
        user = User(
            username=username,
            email=email,
            pic_url=pic_url,
            is_google_user=True,
            verified=True,
        )
        db.session.add(user)
        db.session.commit()
    return make_response(
        flask.jsonify(
            {
                "name": user.username,
                "username": user.username,
                "email": user.email,
                "imageUrl": user.pic_url,
                "isGoogleUser": user.is_google_user,
                "verified": user.verified,
            }
        ),
        200,
    )


@app.route("/login_user", methods=["Post"])
def login_reg_users():
    """Route for Logging in regular user"""
    data = flask.request.get_json(force=True)
    email = data["email"]
    user = User.query.filter_by(email=email).first()
    if user:
        print("user found")
        print(user.email)
        if user.is_google_user is False:
            return make_response(
                flask.jsonify(
                    {
                        "name": user.username,
                        "username": user.username,
                        "email": user.email,
                        "imageUrl": user.pic_url,
                        "isGoogleUser": user.is_google_user,
                        "verified": user.verified,
                    }
                ),
                200,
            )
        else:
            return make_response(flask.jsonify("Please Login through Google"), 202)
    else:
        return make_response(flask.jsonify("User does not exist"), 403)


@app.route("/confirm/<token>")
def verify_account(token):
    try:
        email = confirm_token(token)
    except:
        flask.flash("The verification link is invalid or has expired.", "danger")
    user = User.query.filter_by(email=email).first_or_404()
    if user.verified:
        flask.flash("Account already verified. Please login.", "success")
    else:
        user.verified = True
        db.session.commit()
        flask.flash("You have verified your account. Thanks!", "success")
    return flask.redirect(flask.url_for("landing"))


@app.route("/get_user", methods=["GET", "POST"])
def get_user():
    """Route for fetching regular user"""
    email = flask.request.get_json(force=True)
    user = User.query.filter_by(email=email).first()
    if user:
        return make_response(
            flask.jsonify(
                {
                    "name": user.username,
                    "username": user.username,
                    "email": user.email,
                    "imageUrl": user.pic_url,
                    "isGoogleUser": user.is_google_user,
                    "verified": user.verified,
                }
            ),
            200,
        )
    return make_response(flask.jsonify("User does not exist"), 403)


@app.route("/save_user", methods=["POST"])
def save_user():
    """Route for persisting regular user"""
    data = flask.request.get_json(force=True)
    username = data["email"].split("@")[0]
    email = data["email"]
    pic_url = data["imageUrl"]
    user = User.query.filter_by(email=email).first()
    if not user:
        user = User(
            username=username,
            email=email,
            pic_url=pic_url,
            is_google_user=False,
            verified=False,
        )
        db.session.add(user)
        db.session.commit()

        token = generate_confirmation_token(user.email)
        confirm_url = flask.url_for("verify_account", token=token, _external=True)
        html = flask.render_template("activate.html", confirm_url=confirm_url)
        subject = "Please confirm your email"
        msg = create_email(
            user,
            subject=subject,
            html=html,
            sender=os.getenv("MAIL_USERNAME"),
        )
        mail.send(msg)
    else:
        return make_response(flask.jsonify("User already exists"), 403)
    return make_response(flask.jsonify("Success"), 200)


@app.route("/update_user", methods=["POST"])
def update_user():
    """Route for updating regular user"""
    data = flask.request.get_json(force=True)
    email = data["email"]
    new_username = data["newUsername"]
    user = User.query.filter_by(email=email).first()

    if user:
        user.username = new_username
        db.session.commit()
    else:
        return make_response(flask.jsonify("User does not exist"), 403)
    return make_response(
        flask.jsonify(
            {
                "name": user.username,
                "username": user.username,
                "email": user.email,
                "imageUrl": user.pic_url,
                "isGoogleUser": user.is_google_user,
                "verified": user.verified,
            }
        ),
        200,
    )


@app.route("/add_to_favorites", methods=["POST"])
def save_favorites():
    """Route for Saving Favorites"""
    data = flask.request.get_json(force=True)
    username = data["username"]
    yelp_id = data["activityId"]
    user_favorites = (
        Favorites.query.filter_by(username=username).filter_by(yelp_id=yelp_id).first()
    )
    if not user_favorites:
        new_favorite = Favorites(
            username=data["username"],
            place=data["place"],
            address1=data["address"],
            rating=data["rating"],
            range=data["price"],
            city=data["city"],
            zipcode=data["zipCode"],
            state=data["state"],
            yelp_id=data["activityId"],
            yelp_url=data["yelpUrl"],
            image_url=data["imageUrl"],
        )
        db.session.add(new_favorite)
        db.session.commit()
    else:
        return flask.jsonify({"message": True})
    return flask.jsonify({"message": False})


@app.route("/load_favs", methods=["GET", "POST"])
def load_favs():
    """Route for loading Favorites"""
    data = flask.request.get_json(force=True)
    username = data["name"]
    favsList = Favorites.query.filter_by(username=username).all()
    return flask.jsonify(
        [
            {
                "username": fav.username,
                "place": fav.place,
                "rating": fav.rating,
                "range": fav.range,
                "address": fav.address1,
                "city": fav.city,
                "zipcode": fav.zipcode,
                "state": fav.state,
                "yelp_id": fav.yelp_id,
                "yelp_url": fav.yelp_url,
                "image_url": fav.image_url,
            }
            for fav in favsList
        ]
    )


@app.route("/add_to_calendar", methods=["GET", "POST"])
def add_to_calendar():
    """Route for adding event to google calendar"""
    data = flask.request.get_json(force=True)
    start = data["start"]
    end = data["end"]
    token = data["token"]
    place = data["place"]

    response = add_event(start, end, token, place)

    return response


app.run(
    debug=True,
    host="0.0.0.0",
    port=int(os.getenv("PORT", "8080")),
)
