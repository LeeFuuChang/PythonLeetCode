from flask import Flask
from .submit import submit
from .views import views


def CreateApp():
    app = Flask(__name__)

    app.register_blueprint(views, url_prefix="/views")
    app.register_blueprint(submit, url_prefix="/submit")

    return app