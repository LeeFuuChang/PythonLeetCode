from flask import Blueprint, request
import codecs
import json
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

    if not (username and posttime and postlink and posttitle and question_id) or not os.path.exists(os.path.join(curpath, "data", "users", username.lower())):
        return {"state":0, "output":"Missing arguments"}

    with codecs.open(os.path.join(curpath, "data", "users", username.lower(), "user_data.json"), "r", "utf-8") as f:
        user_data = json.load(f)
    if not user_data["problems"][question_id]["passed"]: return {"state":0}
    with codecs.open(os.path.join(curpath, "discussions", "discussions.json"), "r", "utf-8") as f:
        discussions = json.load(f)
    with codecs.open(os.path.join(curpath, "problems", f"problem_{question_id}", "problem.json"), "r", "utf-8") as f:
        problem = json.load(f)

    now = 0
    while(True):
        post_id = f"{hex(now)[2:]:0>16}"
        if post_id in discussions.keys():
            now += 1
            continue
        else:
            break

    post_data = {
        "id":post_id,
        "title":posttitle,
        "author":username,
        "time":posttime,
        "likes":[],
        "views":[],
        "question":question_id,
        "content":postlink
    }

    user_data["problems"][question_id]["discussions"][post_id] = post_data
    discussions[post_id] = post_data
    problem["discussions"][post_id] = post_data

    with codecs.open(os.path.join(curpath, "data", "users", username.lower(), "user_data.json"), "w", "utf-8") as f:
        json.dump(user_data, f, indent=4, ensure_ascii=False)
    with codecs.open(os.path.join(curpath, "discussions", "discussions.json"), "w", "utf-8") as f:
        json.dump(discussions, f, indent=4, ensure_ascii=False)
    with codecs.open(os.path.join(curpath, "problems", f"problem_{question_id}", "problem.json"), "w", "utf-8") as f:
        json.dump(problem, f, indent=4, ensure_ascii=False)

    return {"state":1, "output":post_data}



@discuss.route("/visit")
def visit():
    Args = request.args.to_dict()
    return {"id":Args["id"]}