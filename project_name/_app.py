import os
import time

import dotenv
import flask
import flask_bcrypt
import flask_cors
import flask_session
import flask_sqlalchemy
import sqlalchemy

from project_name import query
from project_name._utils import response

dotenv.load_dotenv()

# 1. Create the app
app = flask.Flask(
    __name__,
    static_folder=os.path.join("..", os.getenv("STATIC_FOLDER")),
    static_url_path="",
)

# 2. Configure the app
app.config.update(
    SECRET_KEY=os.getenv("SECRET_KEY"),
    SESSION_TYPE="sqlalchemy",
    SESSION_USE_SIGNER=True,
    SQLALCHEMY_DATABASE_URI=sqlalchemy.engine.URL.create(
        "postgresql+psycopg",
        username=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        host=os.getenv("DB_HOST"),
        port=os.getenv("DB_PORT"),
        database=os.getenv("DB_NAME"),
    ),
)

# 3. Create SQLAlchemy database instance (only for authentication session)
db = flask_sqlalchemy.SQLAlchemy(app)
app.config.update(
    SESSION_SQLALCHEMY=db,
)

# 4. Start the session
flask_session.Session(app)
with app.app_context():
    db.create_all()

# 5. Allow credentials in CORS
flask_cors.CORS(app, supports_credentials=True)

# 6. Create a bcrypt instance
bcrypt = flask_bcrypt.Bcrypt(app)


# helper functions
def get_user() -> dict:
    """Get information about the current user"""
    user = None
    user_id = flask.session.get("user_id", None)

    if user_id is not None:
        user = query.get_user(user_id)

    return user


# STATIC FILES
@app.route("/")
def server():
    return flask.helpers.send_from_directory(app.static_folder, "index.html")


# AUTHENTICATION ROUTES
@app.route("/api/@me", methods=["GET"])
def get_current_user():
    """@api {get} /api/@me Get user identity for the session, based on cookies

    @apiSuccess {Object} The user's information; keys `id`, `email`, `admin`
    """
    user = get_user()
    if user is None:
        return response(401, error="Unauthorized")

    return response(200, contents=user)


@app.route("/api/login", methods=["POST"])
def login_user():
    """@api {post} /api/login Login and start a new session with cookies

    @apiBody {String} email Email for authentication
    @apiBody {String} password Password for authentication
    @apiSuccess {Object} The user's information; keys `id`, `email`, `admin`
    """
    email = flask.request.json.get("email")
    password = flask.request.json.get("password")

    user = query.lookup_user(email, return_password=True)
    # If the user doesn't exist or password doesn't match, return a 401
    if user is None or not bcrypt.check_password_hash(user["password"], password):
        return response(401, error="Unauthorized")

    # Don't return the password
    user.pop("password")

    # Create a new session for the user
    flask.session["user_id"] = user["id"]

    return response(200, contents=user)


@app.route("/api/logout", methods=["POST"])
def logout_user():
    """@api {post} /api/logout Logout and end the session, clearing cookies"""
    flask.session.pop("user_id")
    return response(200)


@app.route("/api/register", methods=["POST"])
def register_user():
    """@api {post} /api/register Register as a new user and start a new session
    with cookies

    @apiBody {String} email Email for authentication
    @apiBody {String} password Password for authentication
    @apiSuccess {Object} The user's information; keys `id`, `email`, `admin`
    """
    email = flask.request.json.get("email")
    password = flask.request.json.get("password")

    if query.lookup_user(email) is not None:
        return response(409, error="A user with this email already exists")

    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")

    user = query.add_user(email, hashed_password)

    # # All users get a "My Data" collection to start with
    # query.add_user_collection(user["id"], "My Data")

    # Create a new session for the user
    flask.session["user_id"] = user["id"]

    return response(201, contents=user)


# OTHER ROUTES
@app.route("/api/time")
def get_current_time():
    return response(200, contents=time.time())
