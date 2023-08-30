# Flask-React Authentication Starter

Before deploying to heroku, you must set the following environment variables to connect to your database:
```
heroku config:set SECRET_KEY=<secret key>
heroku config:set STATIC_FOLDER=project-name-frontend/dist
heroku config:set DB_USER=<database username>
heroku config:set DB_PASSWORD=<database password>
heroku config:set DB_HOST=<database host>
heroku config:set DB_PORT=<database port>
heroku config:set DB_NAME=<database name>
```
See database.sql for what tables need to be created.
