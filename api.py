import time
from flask import Flask
from flask.helpers import send_from_directory
from flask_cors import CORS, cross_origin

app = Flask(__name__, static_folder="project-name-frontend/dist", static_url_path="")
CORS(app)


@app.route("/api/time")
@cross_origin()
def get_current_time():
    return {"content": time.time()}


@app.route("/")
@cross_origin()
def server():
    return send_from_directory(app.static_folder, "index.html")
