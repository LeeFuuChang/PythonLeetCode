from flask import Blueprint, request, render_template, abort
from . import __Constants as CONSTANT
import codecs
import json
import os

views = Blueprint("views", __name__)





@views.route("/problems")
def problems():
    constant_html_path = os.path.join(os.path.dirname(__file__), "templates", "constant_html")
    with codecs.open(os.path.join(constant_html_path, f"__header_{CONSTANT.lang}.html"), "r", "utf-8") as f:
        constantHeader = f.read()
    with codecs.open(os.path.join(constant_html_path, f"__float_{CONSTANT.lang}.html"), "r", "utf-8") as f:
        constantFloat = f.read()
    return render_template("problem_list.html", constantHeader=constantHeader, constantFloat=constantFloat)



@views.route("/problem_list")
def problem_list():
    Args = request.args.to_dict()

    start = int(Args.get("start", False))
    end = int(Args.get("end", False))

    with codecs.open(os.path.join(os.path.dirname(__file__), "problems", "problem_list.json"), "r", "utf-8") as f:
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
    constant_html_path = os.path.join(os.path.dirname(__file__), "templates", "constant_html")
    with codecs.open(os.path.join(constant_html_path, f"__header_{CONSTANT.lang}.html"), "r", "utf-8") as f:
        constantHeader = f.read()
    with codecs.open(os.path.join(constant_html_path, f"__float_{CONSTANT.lang}.html"), "r", "utf-8") as f:
        constantFloat = f.read()
    return render_template("rankings_page.html", constantHeader=constantHeader, constantFloat=constantFloat)





@views.route("/problems/<path:subpath>")
def question(subpath):
    paths = subpath.split("/")
    problem_id = paths[0]

    with codecs.open(os.path.join(os.path.dirname(__file__), "problems", "problem_list.json"), "r", "utf-8") as f:
        problem_list = json.load(f)
    problem_ids = sorted([problem["id"] for problem in problem_list["problem_list"]], key=lambda x:int(f"0x{x}", 16))

    if problem_id in problem_ids:
        if len(paths)>1:
            if paths[1] == "get":
                with codecs.open(os.path.join(os.path.dirname(__file__), "problems", f"problem_{problem_id}", "problem.json"), "r", "utf-8") as f:
                    question = json.load(f)
                idx = problem_ids.index(problem_id)
                question["prev"] = problem_ids[idx-1] if idx!=0 else None
                question["next"] = problem_ids[idx+1] if idx!=len(problem_ids)-1 else None 
                return {"question":question}

        constant_html_path = os.path.join(os.path.dirname(__file__), "templates", "constant_html")
        with codecs.open(os.path.join(constant_html_path, f"__header_{CONSTANT.lang}.html"), "r", "utf-8") as f:
            constantHeader = f.read()
        with codecs.open(os.path.join(constant_html_path, f"__float_{CONSTANT.lang}.html"), "r", "utf-8") as f:
            constantFloat = f.read()
        return render_template("question_page.html", problem_id=problem_id, constantHeader=constantHeader, constantFloat=constantFloat)

    return abort(404)


