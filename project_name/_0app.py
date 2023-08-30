import os

import dotenv
import flask
import flask_cors
import flask_session
import flask_sqlalchemy
import sqlalchemy

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


@app.route("/api/time")
def get_current_time():
    return {"content": "TIME!"}


@app.route("/")
def server():
    return flask.helpers.send_from_directory(app.static_folder, "index.html")
