from flask import Blueprint, request
import tracemalloc as memoryTracer
import time as Timer
import json
import sys
import os



discuss = Blueprint("discuss", __name__)
curpath = os.path.dirname(__file__)



@discuss.route("/newpost")
def newpost():
    Args = request.args.to_dict()

    username = Args.get("username", None)
    posttime = Args.get("time", None)
    postlink = Args.get("link", None)
    posttitle = Args.get("title", None)
    question_id = Args.get("id", None)

    if not (username and posttime and postlink and posttitle and question_id):
        return {"state":0, "output":"Missing arguments"}

    with open(os.path.join(curpath, "discussions", "discussions.json"), "r") as f:
        discussions = json.load(f)
    with open(os.path.join(curpath, "problems", f"problem_{question_id}", "problem.json"), "r") as f:
        problem = json.load(f)
    
    post_id = f"{hex(len(discussions))[2:]:0>16}"

    post_data = {
        "id":post_id,
        "title":posttitle,
        "author":username,
        "time":posttime,
        "likes":0,
        "views":0,
        "question":question_id,
        "content":postlink
    }

    discussions[post_id] = post_data
    problem["discussions"][post_id] = post_data

    with open(os.path.join(curpath, "discussions", "discussions.json"), "w") as f:
        json.dump(discussions, f, indent=4)
    with open(os.path.join(curpath, "problems", f"problem_{question_id}", "problem.json"), "w") as f:
        json.dump(problem, f, indent=4)

    return {"state":1, "output":post_data}



@discuss.route("/visit")
def visit():
    Args = request.args.to_dict()
    return {"id":Args["id"]}