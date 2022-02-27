import json, os

def main():
    wp = os.path.join(os.path.dirname(__file__), "website")

    #clear current login
    with open(os.path.join(wp, "data", "current.json"), "w") as f:
        json.dump({}, f)

    #clear discussions
    with open(os.path.join(wp, "discussions", "discussions.json"), "w") as f:
        json.dump({}, f)

    #clear submissions
    with open(os.path.join(wp, "submissions", "submissions.json"), "w") as f:
        json.dump({"submissions": {},"pending": {}}, f)

    #clear all users & update user list
    userList = {}
    for folder in os.listdir(os.path.join(wp, "data", "users")):
        if "." in folder: continue
        with open(os.path.join(wp, "data", "users", folder, "user_data.json"), "r") as f:
            data = json.load(f)
        data["editor"] = {
            "font": "14",
            "theme": "eclipse",
            "bind": "sublime"
        }
        data["like_problems"] = []
        data["dislike_problems"] = []
        data["favorite_problems"] = []
        data["passed_problems"] = []
        data["problems"] = {}
        with open(os.path.join(wp, "data", "users", folder, "user_data.json"), "w") as f:
            json.dump(data, f, indent=4, ensure_ascii=False)
        userList[data["username"].lower()] = {}
        userList[data["username"].lower()]["username"] = data["username"]
        userList[data["username"].lower()]["passed_problems"] = []
        userList[data["username"].lower()]["tried_problems"] = []
        userList[data["username"].lower()]["join"] = data["join"]
    with open(os.path.join(wp, "data", "user_list.json"), "w") as f:
        json.dump(userList, f, indent=4, ensure_ascii=False)

    #reset all problem data & update problem list
    problemList = {}
    for folder in os.listdir(os.path.join(wp, "problems")):
        if "." in folder: continue
        with open(os.path.join(wp, "problems", folder, "problem.json"), "r") as f:
            data = json.load(f)
        data["likes"] = []
        data["dislikes"] = []
        data["participants"] = []
        data["passed_participants"] = []
        data["discussions"] = {}
        with open(os.path.join(wp, "problems", folder, "problem.json"), "w") as f:
            json.dump(data, f, indent=4, ensure_ascii=False)
        problemList[data["id"]] = {
            "id": data["id"],
            "name": data["name"],
            "difficulty": data["difficulty"],
            "time": data["time"],
            "participants": data["participants"],
            "passed_participants": data["passed_participants"]
        }
    with open(os.path.join(wp, "problems", "problem_list.json"), "w") as f:
        json.dump(problemList, f, indent=4, ensure_ascii=False)

main()