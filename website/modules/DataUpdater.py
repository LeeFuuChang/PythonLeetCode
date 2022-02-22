import codecs
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


    def Update_User_List(self, username):
        dirpath = os.path.join(self.Path__data, "users")
        with codecs.open(os.path.join(self.Path__data, "user_list.json"), "r", "utf-8") as f:
            data = json.load(f)
        username_lower = username.lower()
        if username_lower not in os.listdir(dirpath): return
        with codecs.open(os.path.join(dirpath, username_lower, "user_data.json"), "r", "utf-8") as f:
            user_data = json.load(f)
        data[username_lower] = {
            "username":username,
            "passed_problems":user_data["passed_problems"],
            "tried_problems":list(user_data["problems"].keys()),
            "join":user_data["join"]
        }
        data = {ud["username"].lower():ud for ud in sorted(list(data.values()), key=lambda x:len(x["passed_problems"]))}
        with codecs.open(os.path.join(self.Path__data, "user_list.json"), "w", "utf-8") as f:
            json.dump(data, f, indent=4, ensure_ascii=False)
        return user_data


    def Update_Problem_List(self, question_id):
        with codecs.open(os.path.join(self.Path__problems, "problem_list.json"), "r", "utf-8") as f:
            problem_list = json.load(f)
        if f"problem_{question_id}" not in os.listdir(self.Path__problems): return
        problem_json = os.path.join(self.Path__problems, f"problem_{question_id}", "problem.json")
        with codecs.open(problem_json, "r", "utf-8") as f:
            problem_data = json.load(f)

        problem_list[question_id] = {
            "id":problem_data["id"],
            "name":problem_data["name"],
            "difficulty":problem_data["difficulty"],
            "time":problem_data["time"],
            "participants":problem_data["participants"],
            "passed_participants":problem_data["passed_participants"]
        }

        with codecs.open(os.path.join(self.Path__problems, "problem_list.json"), "w", "utf-8") as f:
            json.dump(problem_list, f, indent=4, ensure_ascii=False)
        return problem_list[question_id]


    def Update_User_Passed(self, problem_id, username):
        user_data_file = os.path.join(self.Path__data, "users", f"{username.lower()}", "user_data.json")
        with codecs.open(user_data_file, "r", "utf-8") as f:
            user_data = json.load(f)
        if problem_id not in user_data["passed_problems"]:
            user_data["passed_problems"].append(problem_id)
            with codecs.open(user_data_file, "w", "utf-8") as f:
                json.dump(user_data, f, indent=4, ensure_ascii=False)


    def Update_Problem_Participants(self, problem_id, username, passed):
        problem_data_file = os.path.join(self.Path__problems, f"problem_{problem_id}", "problem.json")
        with codecs.open(problem_data_file, "r", "utf-8") as f:
            problem_data = json.load(f)
        if username not in problem_data["participants"]:
            problem_data["participants"].append(username)
        if passed and username not in problem_data["passed_participants"]:
            problem_data["passed_participants"].append(username)
        with codecs.open(problem_data_file, "w", "utf-8") as f:
            json.dump(problem_data, f, indent=4, ensure_ascii=False)
