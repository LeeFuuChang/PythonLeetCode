import json
import os

data = {}

dirpath = os.path.join(os.path.dirname(__file__), "users")
for user_data_folder in os.listdir(dirpath):
    if "." in user_data_folder: continue
    with open(os.path.join(dirpath, user_data_folder, "user_data.json"), "r") as f:
        user_data = json.load(f)
    username = user_data["username"]
    username_lower = user_data["username"].lower()
    data[username_lower] = {
        "username":username,
        "passed":[]
    }
    for question_id, question_data in user_data["problems"].items():
        if question_data["passed"]:
            data[username_lower]["passed"].append(question_id)

data = {ud["username"]:ud for ud in sorted(list(data.values()), key=lambda x:len(x["passed"]))}
with open(os.path.join(os.path.dirname(__file__), "user_list.json"), "w") as f:
    json.dump(data, f, indent=4, ensure_ascii=False)