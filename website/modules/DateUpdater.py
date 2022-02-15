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
                "passed":[]
            }
            for question_id, question_data in user_data["problems"].items():
                if question_data["passed"]:
                    data[username]["passed"].append(question_id)

        data = {ud["username"]:ud for ud in sorted(list(data.values()), key=lambda x:len(x["passed"]))}
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


    def Update_Problem_Participants(self, problem_id, passed):
        problem_data_file = os.path.join(self.Path__problems, f"problem_{problem_id}", "problem.json")
        with open(problem_data_file, "r") as f:
            pass