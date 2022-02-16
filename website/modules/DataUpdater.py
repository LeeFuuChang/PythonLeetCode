import json
import os

Path__website = os.path.dirname(
    os.path.dirname(
        __file__
    )
)

class Updater():
    Path__data = os.path.join(Path__website, "data")
    Path__problems = os.path.join(Path__website, "problems")
    Path__discussions = os.path.join(Path__website, "discussions")


    def Update_User_List(self):
        data = {}

        dirpath = os.path.join(self.Path__data, "users")
        for user_data_file in os.listdir(dirpath):
            if not ".json" in user_data_file: continue
            with open(os.path.join(dirpath, user_data_file), "r") as f:
                user_data = json.load(f)
            username = user_data["username"]
            data[username] = {
                "username":username,
                "passed_problems":user_data["passed_problems"],
                "tried_problems":list(user_data["problems"].keys()),
                "join":user_data["join"]
            }
        data = {ud["username"]:ud for ud in sorted(list(data.values()), key=lambda x:len(x["passed_problems"]))}
        with open(os.path.join(self.Path__data, "user_list.json"), "w") as f:
            json.dump(data, f, indent=4)


    def Update_Problem_List(self):
        problem_list = {
            "problem_list":[]
        }

        for folder_name in os.listdir(self.Path__problems):
            if "." in folder_name: continue

            problem_json = os.path.join(self.Path__problems, folder_name, "problem.json")
            with open(problem_json, "r") as f:
                problem_data = json.load(f)

            now = {
                "id":problem_data["id"],
                "name":problem_data["name"],
                "difficulty":problem_data["difficulty"],
                "time":problem_data["time"],
                "participants":problem_data["participants"],
                "passed_participants":problem_data["passed_participants"]
            }
            problem_list["problem_list"].append(now)

        with open(os.path.join(self.Path__problems, "problem_list.json"), "w") as f:
            json.dump(problem_list, f, indent=4)


    def Update_User_Passed(self, problem_id, username):
        user_data_file = os.path.join(self.Path__data, "users", f"{username}.json")
        with open(user_data_file, "r") as f:
            user_data = json.load(f)
        if problem_id not in user_data["passed_problems"]:
            user_data["passed_problems"].append(problem_id)
            with open(user_data_file, "w") as f:
                json.dump(user_data, f, indent=4)


    def Update_Problem_Participants(self, problem_id, username, passed):
        problem_data_file = os.path.join(self.Path__problems, f"problem_{problem_id}", "problem.json")
        with open(problem_data_file, "r") as f:
            problem_data = json.load(f)
        if username not in problem_data["participants"]:
            problem_data["participants"].append(username)
        if passed and username not in problem_data["passed_participants"]:
            problem_data["passed_participants"].append(username)
        with open(problem_data_file, "w") as f:
            json.dump(problem_data, f, indent=4)
