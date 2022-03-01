from .modules.DataUpdater import Updater; DataUpdater__account = Updater()
from flask import Blueprint, render_template, request, abort, send_from_directory
from . import __Constants as CONSTANT
from .modules import Handle_CSV
from .modules import Handle_IP
from io import StringIO
import pandas as pd
import shutil
import codecs
import json
import os



account = Blueprint("account", __name__)
"""
USER_DEFAULT_JSON
{
    "username": "",
    "email": "",
    "password": "",
    "join":"",
    "editor": {
        "font": "14",
        "theme": "eclipse",
        "bind": "sublime"
    },
    "like_problems":[],
    "dislike_problems":[],
    "favorite_problems":[],
    "passed_problems":[],
    "problems": {}
}
"""



@account.route("/get", methods=["GET"])
def get_account_data():
    Args = request.args.to_dict()
    getting = Args.get("get", None)
    username = Args.get("username", None)

    if getting == "iplogin":
        address = request.environ.get('HTTP_X_REAL_IP', request.remote_addr)
        with codecs.open(os.path.join(os.path.dirname(__file__), "data", "current.json"), "r", "utf-8") as f:
            current = json.load(f)
        user_data = None
        address_user = Handle_IP.Search(address, current)
        if address_user:
            with codecs.open(os.path.join(os.path.dirname(__file__), "data", "users", address_user.lower(), f"user_data.json"), "r", "utf-8") as f:
                user_data = json.load(f)
        return {"state":1, "user_data":user_data}

    elif getting == "recentsubmissions":
        if username.lower() not in os.listdir(os.path.join(os.path.dirname(__file__), "data", "users")): return {"state":0}
        with codecs.open(os.path.join(os.path.dirname(__file__), "data", "users", username.lower(), f"user_data.json"), "r", "utf-8") as f:
            user_data = json.load(f)
        recent_submissions = []
        for question_id in user_data["problems"]:
            for submission in user_data["problems"][question_id]["recentSubmissions"][::-1]:
                recent_submissions.append(submission)
        recent_submissions = sorted(
            recent_submissions, 
            key=lambda result:sum(
                [
                    num*[
                        518400, 43200, 1440, 60, 1
                    ][idx] for idx, num in enumerate(
                        [
                            int(_) for _ in result["submit_time"].split()[0].split("/") + result["submit_time"].split()[1].split(":")
                        ]
                    )
                ]
            ), 
            reverse=True
        )
        return {"recentsubmissions":recent_submissions}

    elif getting == "profile":
        if username.lower() not in os.listdir(os.path.join(os.path.dirname(__file__), "data", "users")): return {"state":0}
        with codecs.open(os.path.join(os.path.dirname(__file__), "data", "users", username.lower(), f"user_data.json"), "r", "utf-8") as f:
            user_data = json.load(f)
        data = {
            "email": user_data["email"],
            "username": user_data["username"],
            "join": user_data["join"],
            "like_problems": user_data["like_problems"],
            "dislike_problems": user_data["dislike_problems"],
            "favorite_problems": user_data["favorite_problems"],
            "passed_problems": user_data["passed_problems"],
            "problems": user_data["problems"]
        }
        return {"state":1, "profile_data":data}

    elif getting == "posts":
        if username.lower() not in os.listdir(os.path.join(os.path.dirname(__file__), "data", "users")): return {"state":0}
        with codecs.open(os.path.join(os.path.dirname(__file__), "data", "users", username.lower(), f"user_data.json"), "r", "utf-8") as f:
            user_data = json.load(f)
        user_posts = []
        for question_id in user_data["problems"]:
            if not user_data["problems"][question_id]["passed"]: continue
            for post_data in user_data["problems"][question_id]["discussions"].values():
                user_posts.insert(0, post_data)
        user_posts = sorted(
            user_posts, 
            key=lambda post:sum(
                [
                    num*[
                        518400, 43200, 1440, 60, 1
                    ][idx] for idx, num in enumerate(
                        [
                            int(_) for _ in post["time"].split()[0].split("/") + post["time"].split()[1].split(":")
                        ]
                    )
                ]
            ), 
            reverse=True
        )
        return {"user_posts":user_posts}





@account.route("/login", methods=["GET"])
def login():
    Args = request.args.to_dict()

    username = Args.get("username", None)
    password = Args.get("password", None)
    now_time = Args.get("time", None)

    if not (username and password and now_time): return {"state":0}

    address = request.environ.get('HTTP_X_REAL_IP', request.remote_addr)
    users_path = os.path.join(os.path.dirname(__file__), "data", "users")
    with codecs.open(os.path.join(users_path, "users.csv"), "r", "utf-8") as f:
        users = pd.read_csv(StringIO(f.read().replace(" ", "")))
        accounts_lower = [_.lower() for _ in users["account"]]
        usernames_lower = [_.lower() for _ in users["username"]]

    idx = None
    if username.lower() in accounts_lower:
        idx = accounts_lower.index(username.lower())
    elif username.lower() in usernames_lower:
        idx = usernames_lower.index(username.lower())

    if idx == None: return {"state":0}

    username = users.iloc[idx]["username"]

    with codecs.open(os.path.join(os.path.dirname(users_path), "current.json"), "r", "utf-8") as f:
        current = json.load(f)
    current = Handle_IP.Join(address, current, username)
    with codecs.open(os.path.join(os.path.dirname(users_path), "current.json"), "w", "utf-8") as f:
        json.dump(current, f, indent=4, ensure_ascii=False)

    with codecs.open(os.path.join(users_path, username.lower(), "user_data.json"), "r", "utf-8") as f:
        user_data = json.load(f)

    if password == user_data["password"]:
        return {"state":1, "user_data":user_data}
    else:
        return {"state":0}



@account.route("logout", methods=["GET"])
def logout():
    Args = request.args.to_dict()

    username = Args.get("username", None)

    if not (username): return {"state":0}

    address = request.environ.get('HTTP_X_REAL_IP', request.remote_addr)
    users_path = os.path.join(os.path.dirname(__file__), "data")

    with codecs.open(os.path.join(users_path, "current.json"), "r", "utf-8") as f:
        current = json.load(f)
    current = Handle_IP.Delete(address, current)
    with codecs.open(os.path.join(users_path, "current.json"), "w", "utf-8") as f:
        json.dump(current, f, indent=4, ensure_ascii=False)

    return {"state":1}



@account.route("/signup", methods=["GET"])
def signup():
    Args = request.args.to_dict()

    email = Args.get("email", None)
    username = Args.get("username", None)
    password = Args.get("password", None)
    now_time = Args.get("time", None)

    if not (email and username and password and now_time): return {"state":0}

    address = request.environ.get('HTTP_X_REAL_IP', request.remote_addr)
    users_path = os.path.join(os.path.dirname(__file__), "data", "users")
    with codecs.open(os.path.join(users_path, "users.csv"), "r", "utf-8") as f:
        users = pd.read_csv(StringIO(f.read().replace(" ", "")))
        accounts_lower = [_.lower() for _ in users["account"]]
        usernames_lower = [_.lower() for _ in users["username"]]

    if email.lower() in accounts_lower:
        return {"state":-1}
    elif username.lower() in usernames_lower:
        return {"state":-2}

    with codecs.open(os.path.join(users_path, "users.csv"), "r", "utf-8") as f:
        Column_Title, Current_Data = Handle_CSV.Read_CSV(Data_File=f)
    Current_Data = Current_Data.append({"account":email, "username":username, "password":password}, ignore_index=True)
    with codecs.open(os.path.join(users_path, "users.csv"), "w", "utf-8") as f:
        Handle_CSV.Write_CSV(Data_File=f, Titles=Column_Title, Rows=Current_Data)

    user_data = {
        "username": username,
        "email": email,
        "password": password,
        "join":now_time.split()[0],
        "editor": {
            "font": "14",
            "theme": "eclipse",
            "bind": "sublime"
        },
        "like_problems":[],
        "dislike_problems":[],
        "favorite_problems":[],
        "passed_problems":[],
        "problems": {}
    }
    user_folder = os.path.join(users_path, username.lower())
    if not os.path.exists(user_folder): 
        os.mkdir(user_folder)
        shutil.copyfile(
            os.path.join(os.path.dirname(__file__), "static", "assets", "images", "default_profile_img.jpg"),
            os.path.join(user_folder, "profile_img.jpg")
        )
    with codecs.open(os.path.join(user_folder, "user_data.json"), "w", "utf-8") as f:
        json.dump(user_data, f, indent=4, ensure_ascii=False)

    with codecs.open(os.path.join(os.path.dirname(users_path), "current.json"), "r", "utf-8") as f:
        current = json.load(f)
    current = Handle_IP.Join(address, current, username)
    with codecs.open(os.path.join(os.path.dirname(users_path), "current.json"), "w", "utf-8") as f:
        json.dump(current, f, indent=4, ensure_ascii=False)

    DataUpdater__account.Update_User_List(username=username)
    return {"state":1, "user_data":user_data}



@account.route("/update", methods=["GET", "POST"])
def editor():
    Args = request.args.to_dict()

    username = Args.get("username", None)
    if not username or username.lower() not in os.path.listdir(os.path.join(os.path.dirname(__file__), "data", "users")): return {"state":0}
    users_path = os.path.join(os.path.dirname(__file__), "data", "users", username.lower(), "user_data.json")
    with codecs.open(users_path, "r", "utf-8") as f:
        user_data = json.load(f)

    _type = Args.get("type", None)

    if _type == "editor":
        font = Args.get("font", None)
        theme = Args.get("theme", None)
        bind = Args.get("bind", None)
        if not (font and theme and bind): return {"state":0}
        if not os.path.exists(users_path): return {"state":0}
        user_data["editor"]["font"] = font
        user_data["editor"]["theme"] = theme
        user_data["editor"]["bind"] = bind

    elif _type in ["like", "dislike", "favorite"]:
        question_id = Args.get("id", None)
        if not question_id: return {"state":0}
        question_path = os.path.join(os.path.dirname(__file__), "problems", f"problem_{question_id}", f"problem.json")
        with codecs.open(question_path, "r", "utf-8") as f:
            question_data = json.load(f)
        if _type == "like":
            #user data
            if question_id in user_data["dislike_problems"]:
                user_data["dislike_problems"].remove(question_id)
            if question_id not in user_data["like_problems"]:
                user_data["like_problems"].append(question_id)
            else:
                user_data["like_problems"].remove(question_id)
            #question data
            if username in question_data["dislikes"]:
                question_data["dislikes"].remove(username)
            if username not in question_data["likes"]:
                question_data["likes"].append(username)
            else:
                question_data["likes"].remove(username)

        elif _type == "dislike":
            #user data
            if question_id in user_data["like_problems"]:
                user_data["like_problems"].remove(question_id)
            if question_id not in user_data["dislike_problems"]:
                user_data["dislike_problems"].append(question_id)
            else:
                user_data["dislike_problems"].remove(question_id)
            #question data
            if username in question_data["likes"]:
                question_data["likes"].remove(username)
            if username not in question_data["dislikes"]:
                question_data["dislikes"].append(username)
            else:
                question_data["dislikes"].remove(username)

        elif _type == "favorite":
            if question_id not in user_data["favorite_problems"]:
                user_data["favorite_problems"].append(question_id)
            else:
                user_data["favorite_problems"].remove(question_id)
        with codecs.open(question_path, "w", "utf-8") as f:
            json.dump(question_data, f, indent=4, ensure_ascii=False)

    elif _type == "profile_img":
        profile_img = request.files.to_dict().get("profile_img", None)
        if not profile_img: return {"state":0}
        profile_img.save(os.path.join(os.path.dirname(__file__), "data", "users", username.lower(), "profile_img.jpg"))
        return {"state":1, "user_data":user_data}

    with codecs.open(users_path, "w", "utf-8") as f:
        json.dump(user_data, f, indent=4, ensure_ascii=False)
    return {"state":1, "user_data":user_data}



@account.route("/user_list")
def ranking_list():
    Args = request.args.to_dict()

    start = int(Args.get("start", False))
    end = int(Args.get("end", False))

    with codecs.open(os.path.join(os.path.dirname(__file__), "data", "user_list.json"), "r", "utf-8") as f:
        user_list = json.load(f)
    user_list = sorted(list(user_list.values()), key=lambda user:len(user["passed_problems"]))

    if start and end:
        if len(user_list) >= end:
            result = user_list[start-1:end]
            more = True
        elif len(user_list) >= start:
            result = user_list[start-1:]
            more = False
        else:
            result = []
            more = False

    elif Args.get("get", False) == "all":
        return {"all":user_list}

    return {"user_list":result, "more":more}



@account.route("/profile/<path:subpath>")
def profile(subpath):
    subpath = subpath.split("/")
    username = subpath[0]
    with codecs.open(os.path.join(os.path.dirname(__file__), "data", "user_list.json"), "r", "utf-8") as f:
        users = json.load(f)
    if username.lower() not in users.keys(): return abort(404)

    if len(subpath)>1:
        if subpath[1] == "get_profile_img":
            return send_from_directory("data", f"users/{username.lower()}/profile_img.jpg", as_attachment=True)

    constant_html_path = os.path.join(os.path.dirname(__file__), "templates", "constant_html")
    with codecs.open(os.path.join(constant_html_path, f"__header_{CONSTANT.lang}.html"), "r", "utf-8") as f:
        constantHeader = f.read()
    with codecs.open(os.path.join(constant_html_path, f"__float_{CONSTANT.lang}.html"), "r", "utf-8") as f:
        constantFloat = f.read()
    return render_template("profile_page.html", username=username, constantHeader=constantHeader, constantFloat=constantFloat)