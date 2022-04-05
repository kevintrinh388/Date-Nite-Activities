import os
import flask
from yelp import business_search
from maps import maps_search

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

# route for serving React page
@bp.route("/home")
def home():
    """Route for home page on React"""
    # NB: DO NOT add an "index.html" file in your normal templates folder
    # Flask will stop serving this React page correctly
    return flask.render_template("index.html")


app.register_blueprint(bp)


@app.route("/")
def index():
    """Route for index page"""
    return flask.redirect(flask.url_for("login"))


@app.route("/login")
def login():
    """Route for login page"""
    return flask.render_template("index.html")


@app.route("/signup")
def signup():
    """Route for signup page"""
    return flask.render_template("index.html")


@app.route("/profile")
def profile():
    """Route for profile page on React"""
    return flask.render_template("login.html")


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


app.run(
    debug=True,
    host="0.0.0.0",
    port=int(os.getenv("PORT", "8080")),
)
