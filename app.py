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
    # NB: DO NOT add an "index.html" file in your normal templates folder
    # Flask will stop serving this React page correctly
    return flask.render_template("index.html")
    
app.register_blueprint(bp)

@app.route("/")
def index():

    return flask.redirect(flask.url_for("login"))


@app.route("/login")
def login():

    return flask.render_template("login.html")

@app.route("/signup")
def signup():

    return flask.render_template("signup.html")


@app.route("/search_yelp", methods=['GET','POST'])
def search_yelp():
    location = flask.request.get_json(force=True)

    business_list = business_search(location)
    
    return flask.jsonify(business_list)

@app.route("/search_maps", methods=['GET','POST'])
def search_maps():
    q = flask.request.get_json(force=True)

    google_maps = maps_search(q)

    return flask.jsonify(google_maps)




app.run(
    debug=True,
    host="0.0.0.0",
    port=int(os.getenv("PORT", 8080)),
)
