from .modules.DataUpdater import Updater; DataUpdater__account = Updater()
from flask import Blueprint, request, abort
from .modules import Handle_CSV
from .modules import Handle_IP
from io import StringIO
import pandas as pd
import json
import os



account = Blueprint("account", __name__)
"""
USER_DEFAULT_JSON
{
    "email": "",
    "username": "",
    "password": "",
    "editor": {
        "font": "14",
        "theme": "eclipse",
        "bind": "sublime"
    },
    "passed_problems":[],
    "problems": {}
}
"""



@account.route("/get", methods=["GET"])
def get_ip_login_account():
    address = request.environ.get('HTTP_X_REAL_IP', request.remote_addr)
    
    with open(os.path.join(os.path.dirname(__file__), "data", "current.json"), "r") as f:
        current = json.load(f)
    user_data = None
    address_user = Handle_IP.Search(address, current)
    if address_user:
        with open(os.path.join(os.path.dirname(__file__), "data", "users", f"{address_user}.json"), "r") as f:
            user_data = json.load(f)

    return {"user_data":user_data}



@account.route("/login", methods=["GET"])
def login():
    Args = request.args.to_dict()

    username = Args.get("username", None)
    password = Args.get("password", None)
    now_time = Args.get("time", None)

    if not (username and password and now_time): return {"state":0}

    address = request.environ.get('HTTP_X_REAL_IP', request.remote_addr)
    users_path = os.path.join(os.path.dirname(__file__), "data", "users")
    with open(os.path.join(users_path, "users.csv"), "r") as f:
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

    with open(os.path.join(os.path.dirname(users_path), "current.json"), "r") as f:
        current = json.load(f)
    current = Handle_IP.Join(address, current, username)
    with open(os.path.join(os.path.dirname(users_path), "current.json"), "w") as f:
        json.dump(current, f, indent=4)

    with open(os.path.join(users_path, f"{username}.json"), "r") as f:
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

    with open(os.path.join(users_path, "current.json"), "r") as f:
        current = json.load(f)
    current = Handle_IP.Delete(address, current)
    with open(os.path.join(users_path, "current.json"), "w") as f:
        json.dump(current, f, indent=4)

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
    with open(os.path.join(users_path, "users.csv"), "r") as f:
        users = pd.read_csv(StringIO(f.read().replace(" ", "")))
        accounts_lower = [_.lower() for _ in users["account"]]
        usernames_lower = [_.lower() for _ in users["username"]]

    if email.lower() in accounts_lower:
        return {"state":-1}
    elif username.lower() in usernames_lower:
        return {"state":-2}

    with open(os.path.join(users_path, "users.csv"), "r") as f:
        Column_Title, Current_Data = Handle_CSV.Read_CSV(Data_File=f)
    Current_Data = Current_Data.append({"account":email, "username":username, "password":password}, ignore_index=True)
    with open(os.path.join(users_path, "users.csv"), "w") as f:
        Handle_CSV.Write_CSV(Data_File=f, Titles=Column_Title, Rows=Current_Data)

    user_data = {
        "email": email,
        "username": username,
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
    with open(os.path.join(users_path, f"{username.lower()}.json"), "w") as f:
        json.dump(user_data, f, indent=4)

    with open(os.path.join(os.path.dirname(users_path), "current.json"), "r") as f:
        current = json.load(f)
    current = Handle_IP.Join(address, current, username)
    with open(os.path.join(os.path.dirname(users_path), "current.json"), "w") as f:
        json.dump(current, f, indent=4)

    return {"state":1, "user_data":user_data}



@account.route("/update", methods=["GET"])
def editor():
    Args = request.args.to_dict()

    username = Args.get("username", None)
    if not username: return {"state":0}
    users_path = os.path.join(os.path.dirname(__file__), "data", "users", f"{username}.json")
    with open(users_path, "r") as f:
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

    elif _type == "like":
        question_id = Args.get("id", None)
        if not question_id: return {"state":0}
        if question_id in user_data["dislike_problems"]:
            user_data["dislike_problems"].remove(question_id)
        if question_id not in user_data["like_problems"]:
            user_data["like_problems"].append(question_id)
        else:
            user_data["like_problems"].remove(question_id)

    elif _type == "dislike":
        question_id = Args.get("id", None)
        if not question_id: return {"state":0}
        if question_id in user_data["like_problems"]:
            user_data["like_problems"].remove(question_id)
        if question_id not in user_data["dislike_problems"]:
            user_data["dislike_problems"].append(question_id)
        else:
            user_data["dislike_problems"].remove(question_id)

    elif _type == "favorite":
        question_id = Args.get("id", None)
        if not question_id: return {"state":0}
        if question_id not in user_data["favorite_problems"]:
            user_data["favorite_problems"].append(question_id)
        else:
            user_data["favorite_problems"].remove(question_id)

    with open(users_path, "w") as f:
        json.dump(user_data, f, indent=4)
    return {"state":1, "user_data":user_data}



@account.route("/user_list")
def ranking_list():
    Args = request.args.to_dict()

    start = int(Args.get("start", False))
    end = int(Args.get("end", False))

    with open(os.path.join(os.path.dirname(__file__), "data", "user_list.json"), "r") as f:
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
    with open(os.path.join(os.path.dirname(__file__), "data", "user_list.json"), "r") as f:
        users = json.load(f)
    if username in users.keys(): return abort(404)
