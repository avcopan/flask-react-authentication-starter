import os

import dotenv
import flask
import flask_cors

dotenv.load_dotenv()
STATIC_FOLDER = os.path.join("..", os.getenv("STATIC_FOLDER"))

app = flask.Flask(__name__, static_folder=STATIC_FOLDER, static_url_path="")
flask_cors.CORS(app)


@app.route("/api/time")
@flask_cors.cross_origin()
def get_current_time():
    return {"content": "time"}


@app.route("/")
@flask_cors.cross_origin()
def server():
    return flask.helpers.send_from_directory(app.static_folder, "index.html")
