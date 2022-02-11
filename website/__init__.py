from flask import Flask, render_template
from .submit import submit
from .views import views
from .account import account
from .discuss import discuss


def CreateApp():
    app = Flask(__name__)

    app.route("/")(lambda: render_template("index.html"))

    app.register_blueprint(views, url_prefix="/views")
    app.register_blueprint(submit, url_prefix="/submit")
    app.register_blueprint(account, url_prefix="/account")
    app.register_blueprint(discuss, url_prefix="/discuss")

    return app