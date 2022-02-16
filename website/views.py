from flask import Blueprint, request, render_template, abort
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





@views.route("/rankings")
def rankings():
    return render_template("rankings_page.html")



@views.route("/user_list")
def ranking_list():
    with open(os.path.join(os.path.dirname(__file__), "data", "user_list.json"), "r") as f:
        data = json.load(f)
    result = sorted(list(data.values()), key=lambda x:len(x["passed_problems"]))
    return {"user_list":result}





@views.route("/problems/<path:subpath>")
def question(subpath):
    paths = subpath.split("/")
    problem_id = paths[0]

    with open(os.path.join(os.path.dirname(__file__), "problems", "problem_list.json"), "r") as f:
        problem_list = json.load(f)
    problem_ids = sorted([problem["id"] for problem in problem_list["problem_list"]], key=lambda x:int(f"0x{x}", 16))

    if problem_id in problem_ids:
        if len(paths)>1:
            if paths[1] == "get":
                with open(os.path.join(os.path.dirname(__file__), "problems", f"problem_{problem_id}", "problem.json"), "r") as f:
                    question = json.load(f)

                idx = problem_ids.index(problem_id)
                if idx == 0:
                    question["prev"] = None
                    question["next"] = problem_ids[idx+1]
                elif idx == len(problem_ids)-1:
                    question["prev"] = problem_ids[idx-1]
                    question["next"] = None
                else:
                    question["prev"] = problem_ids[idx-1]
                    question["next"] = problem_ids[idx+1]

                return {"question":question}

        return render_template("question_page.html", problem_id=problem_id)

    return abort(404)


