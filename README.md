Steps used to create this repository:
```
npm create vite@latest react-flask-authentication-starter
cd react-flask-authentication-starter
npm install
mkdir api
cd api
python3 -m venv env
. env/bin/activate
vi requirements.txt
    ~ flask
    ~ python-dotenv
    ~ psycopg
    ~ flask-pg-session
    ~ flask-bcrypt
    ~ flask-cors
pip install -r requirements.txt
# Then, create database as described in api/database.sql
```
