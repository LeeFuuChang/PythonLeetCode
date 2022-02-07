from flask import Blueprint, request
from .modules import Handle_CSV
from io import StringIO
import pandas as pd
import json
import os

account = Blueprint("account", __name__)

@account.route("/login")
def login():
    Args = request.args.to_dict()

    username = Args["username"]
    password = Args["password"]

    users_path = os.path.join(os.path.dirname(__file__), "data", "users")
    with open(os.path.join(users_path, "users.csv"), "r") as f:
        users = pd.read_csv(StringIO(f.read().replace(" ", "")))

    idx = None
    if username in list(users["account"]):
        idx = list(users["account"]).index(username)
    elif username in list(users["username"]):
        idx = list(users["username"]).index(username)

    if idx == None: return {"state":0}

    username = users.iloc[idx]["username"]

    with open(os.path.join(users_path, f"{username}.json"), "r") as f:
        user_data = json.load(f)

    if password == user_data["password"]:
        return {"state":1, "user_data":user_data}
    else:
        return {"state":0}

@account.route("/signup")
def signup():
    Args = request.args.to_dict()

    email = Args["email"]
    username = Args["username"]
    password = Args["password"]

    users_path = os.path.join(os.path.dirname(__file__), "data", "users")
    with open(os.path.join(users_path, "users.csv"), "r") as f:
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







