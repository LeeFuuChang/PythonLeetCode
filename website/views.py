from flask import Blueprint, request, render_template
from .modules import Handle_IP
import json
import os

views = Blueprint("views", __name__)

@views.route("/problems/<path:subpath>")
def p(subpath):
    address = request.environ.get('HTTP_X_REAL_IP', request.remote_addr)
    paths = subpath.split("/")
    problem_id = paths[0]

    if len(paths)>1:
        if paths[1] == "get":
            with open(os.path.join(os.path.dirname(__file__), "problems", f"problem_{problem_id}", "problem.json"), "r") as f:
                question = json.load(f)
            with open(os.path.join(os.path.dirname(__file__), "data", "current.json"), "r") as f:
                current = json.load(f)
            user_data = None
            address_user = Handle_IP.Search(address, current)
            if address_user:
                with open(os.path.join(os.path.dirname(__file__), "data", "users", f"{address_user}.json"), "r") as f:
                    user_data = json.load(f)
            return {"question":question, "user_data":user_data}

    return render_template("output.html", problem_id=problem_id)


