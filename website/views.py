from flask import Blueprint, request, render_template
from .modules import Handle_IP
import json
import os

views = Blueprint("views", __name__)



@views.route("/problems")
def problems():
    return render_template("problem_list.html")



@views.route("/problem_list")
def problem_list():
    Args = request.args.to_dict()

    start = int(Args.get("start", False))
    end = int(Args.get("end", False))

    with open(os.path.join(os.path.dirname(__file__), "problems", "problem_list.json"), "r") as f:
        problem_list = json.load(f)

    if start and end:
        if len(problem_list["problem_list"]) >= end:
            result = problem_list["problem_list"][start-1:end]
            more = True
        elif len(problem_list["problem_list"]) >= start:
            result = problem_list["problem_list"][start-1:]
            more = False
        else:
            result = []
            more = False

    elif Args.get("get", False) == "all":
        return {"all":problem_list["problem_list"]}

    return {"problem_list":result, "more":more}



@views.route("/problems/<path:subpath>")
def question(subpath):

    paths = subpath.split("/")
    problem_id = paths[0]

    if len(paths)>1:
        if paths[1] == "get":
            with open(os.path.join(os.path.dirname(__file__), "problems", f"problem_{problem_id}", "problem.json"), "r") as f:
                question = json.load(f)
            return {"question":question}

    return render_template("question_page.html", problem_id=problem_id)


