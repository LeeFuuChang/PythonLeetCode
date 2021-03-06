from flask import Blueprint, request, render_template, abort
from . import __Constants as CONSTANT
import codecs
import json
import os

views = Blueprint("views", __name__)





@views.route("/problems")
def problems():
    return render_template("problem_list.html", constantHeader=CONSTANT.HTMLconstantHeader, constantFloat=CONSTANT.HTMLconstantFloat)



@views.route("/problem_list")
def problem_list():
    Args = request.args.to_dict()

    start = int(Args.get("start", False))
    end = int(Args.get("end", False))
    get = Args.get("get", False)

    with codecs.open(os.path.join(os.path.dirname(__file__), "problems", "problem_list.json"), "r", "utf-8") as f:
        __problem_list = json.load(f)
        problem_list = sorted(list(__problem_list.values()), key=lambda p:int(p["id"], 16))

    if start and end:
        if len(problem_list) >= end:
            result = problem_list[start-1:end]
            more = True
        elif len(problem_list) >= start:
            result = problem_list[start-1:]
            more = False
        else:
            result = []
            more = False
        return {"problem_list":result, "more":more}

    elif get == "all":
        return {"problem_list":problem_list}
    elif get == "difficulty":
        data = {
            "Easy":[],
            "Medium":[],
            "Hard":[]
        }
        for problem in problem_list:
            data[problem["difficulty"]].append(problem)
        return {"problem_list":data}
    elif get == "byid":
        return {"problem_list":__problem_list}
    return {}





@views.route("/problems/<path:subpath>")
def question(subpath):
    paths = subpath.split("/")
    problem_id = paths[0]

    with codecs.open(os.path.join(os.path.dirname(__file__), "problems", "problem_list.json"), "r", "utf-8") as f:
        problem_list = json.load(f)
        problem_list = list(problem_list.values())
    problem_ids = sorted([problem["id"] for problem in problem_list], key=lambda x:int(f"0x{x}", 16))

    if problem_id in problem_ids:
        if len(paths)>1:
            if paths[1] == "get":
                with codecs.open(os.path.join(os.path.dirname(__file__), "problems", f"problem_{problem_id}", "problem.json"), "r", "utf-8") as f:
                    question = json.load(f)
                idx = problem_ids.index(problem_id)
                question["prev"] = problem_ids[idx-1] if idx!=0 else None
                question["next"] = problem_ids[idx+1] if idx!=len(problem_ids)-1 else None 
                return {"question":question}

        return render_template("question_page.html", problem_id=problem_id, constantHeader=CONSTANT.HTMLconstantHeader, constantFloat=CONSTANT.HTMLconstantFloat)

    return abort(404)





@views.route("/rankings")
def rankings():
    return render_template("rankings_page.html", constantHeader=CONSTANT.HTMLconstantHeader, constantFloat=CONSTANT.HTMLconstantFloat)





@views.route("/submissions")
def submissions():
    return render_template("submissions_page.html", constantHeader=CONSTANT.HTMLconstantHeader, constantFloat=CONSTANT.HTMLconstantFloat)

