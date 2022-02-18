from flask import Flask, render_template
from .submit import submit
from .views import views
from .account import account
from .discuss import discuss
from . import __Constants as CONSTANT
import codecs
import os


def Landing():
    constant_html_path = os.path.join(os.path.dirname(__file__), "templates", "constant_html")
    with codecs.open(os.path.join(constant_html_path, f"__header_{CONSTANT.lang}.html"), "r", "utf-8") as f:
        constantHeader = f.read()
    with codecs.open(os.path.join(constant_html_path, f"__float_{CONSTANT.lang}.html"), "r", "utf-8") as f:
        constantFloat = f.read()
    return render_template("index.html", constantHeader=constantHeader, constantFloat=constantFloat)


def CreateApp():
    app = Flask(__name__)

    app.route("/")(Landing)

    app.register_blueprint(views, url_prefix="/views")
    app.register_blueprint(submit, url_prefix="/submit")
    app.register_blueprint(account, url_prefix="/account")
    app.register_blueprint(discuss, url_prefix="/discuss")

    return app