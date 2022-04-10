import codecs
import json
import os

problem_list = {}

for folder_name in os.listdir(os.path.dirname(__file__)):
    if "." in folder_name: continue

    problem_json = os.path.join(os.path.dirname(__file__), folder_name, "problem.json")
    with codecs.open(problem_json, "r", "utf-8") as f:
        problem_data = json.load(f)

    now = {
        "id":problem_data["id"],
        "name":problem_data["name"],
        "difficulty":problem_data["difficulty"],
        "time":problem_data["time"],
        "participants":problem_data["participants"],
        "passed_participants":problem_data["passed_participants"]
    }
    problem_list[problem_data["id"]] = now

    list_file = os.path.join(os.path.dirname(__file__), "problem_list.json")
    with codecs.open(list_file, "w", "utf-8") as f:
        json.dump(problem_list, f, indent=4, ensure_ascii=False)