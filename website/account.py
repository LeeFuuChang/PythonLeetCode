from flask import Blueprint, request
from .modules import Handle_CSV
from .modules import Handle_IP
from io import StringIO
import pandas as pd
import json
import os



account = Blueprint("account", __name__)



@account.route("/login", methods=["GET"])
def login():
    Args = request.args.to_dict()

    username = Args["username"]
    password = Args["password"]

    address = request.environ.get('HTTP_X_REAL_IP', request.remote_addr)
    users_path = os.path.join(os.path.dirname(__file__), "data")
    with open(os.path.join(users_path, "users", "users.csv"), "r") as f:
        users = pd.read_csv(StringIO(f.read().replace(" ", "")))

    idx = None
    if username in list(users["account"]):
        idx = list(users["account"]).index(username)
    elif username in list(users["username"]):
        idx = list(users["username"]).index(username)

    if idx == None: return {"state":0}

    username = users.iloc[idx]["username"]

    with open(os.path.join(users_path, "current.json"), "r") as f:
        current = json.load(f)
    current = Handle_IP.Join(address, current, username)
    with open(os.path.join(users_path, "current.json"), "w") as f:
        json.dump(current, f, indent=4)

    with open(os.path.join(users_path, "users", f"{username}.json"), "r") as f:
        user_data = json.load(f)

    if password == user_data["password"]:
        return {"state":1, "user_data":user_data}
    else:
        return {"state":0}



@account.route("/signup", methods=["GET"])
def signup():
    Args = request.args.to_dict()

    email = Args["email"]
    username = Args["username"]
    password = Args["password"]

    users_path = os.path.join(os.path.dirname(__file__), "data")
    with open(os.path.join(users_path, "users", "users.csv"), "r") as f:
        users = pd.read_csv(StringIO(f.read().replace(" ", "")))

    if email in list(users["account"]):
        return {"state":-1}
    elif username in list(users["username"]):
        return {"state":-2}

    with open(os.path.join(users_path, "users.csv"), "r") as f:
        Column_Title, Current_Data = Handle_CSV.Read_CSV(Data_File=f)
    Current_Data = Current_Data.append({"account":email, "username":username, "password":password}, ignore_index=True)
    with open(os.path.join(users_path, "users.csv"), "w") as f:
        Handle_CSV.Write_CSV(Data_File=f, Titles=Column_Title, Rows=Current_Data)
    return {"state":1}



@account.route("/editor", methods=["GET"])
def editor():
    Args = request.args.to_dict()

    username = Args["username"]

    users_path = os.path.join(os.path.dirname(__file__), "data", "users")
    with open(os.path.join(users_path, "users.csv"), "r") as f:
        users = pd.read_csv(StringIO(f.read().replace(" ", "")))

    idx = None
    if username in list(users["username"]):
        idx = list(users["username"]).index(username)

    if idx == None: return {"state":0}

    with open(os.path.join(users_path, f"{username}.json"), "r") as f:
        user_data = json.load(f)
    user_data["editor"]["font"] = Args["font"]
    user_data["editor"]["theme"] = Args["theme"]
    user_data["editor"]["bind"] = Args["bind"]
    with open(os.path.join(users_path, f"{username}.json"), "w") as f:
        json.dump(user_data, f, indent=4)
    return {"state":1}



