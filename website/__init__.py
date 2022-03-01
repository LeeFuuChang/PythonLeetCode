from flask import Flask, render_template
from .submit import submit
from .views import views
from .account import account
from .discuss import discuss
from . import __Constants as CONSTANT


def Landing():
    return render_template("index.html", constantHeader=CONSTANT.HTMLconstantHeader, constantFloat=CONSTANT.HTMLconstantFloat)


def CreateApp():
    app = Flask(__name__)

    app.route("/")(Landing)

    app.register_blueprint(views, url_prefix="/views")
    app.register_blueprint(submit, url_prefix="/submit")
    app.register_blueprint(account, url_prefix="/account")
    app.register_blueprint(discuss, url_prefix="/discuss")

    return app