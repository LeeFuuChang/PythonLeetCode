from flask import Blueprint, render_template
import json
import os

views = Blueprint("views", __name__)

@views.route("/problems/<path:subpath>")
def p(subpath):
    paths = subpath.split("/")
    problem_id = paths[0]

    if len(paths)>1:
        if paths[1] == "get":
            with open(os.path.join(os.path.dirname(__file__), "storage", "problems.json"), "r") as problems_data:
                return json.load(problems_data)[f"{problem_id}"]

    return render_template("output.html", problem_id=problem_id)


