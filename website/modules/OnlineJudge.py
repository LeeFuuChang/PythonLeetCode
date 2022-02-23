from .DataUpdater import Updater; DataUpdater__Judge = Updater()
from .CodeProcess import CodeProcessor
import tracemalloc as memoryTracer
import time as timeTracer
import codecs
import json
import sys
import os

states = {
    0:("PD", "Pending"),
    1:("AC", "Accepted"), 
    2:("WA", "Wrong Answer"), 
    3:("TLE", "Time Limit Exceed"), 
    4:("MLE", "Memory Limit Exceed"), 
    5:("RE", "Runtime Error"), 
    6:("CE", "Compile Error"),
    7:("SE", "Server Error")
}

class Judge():
    def CE_RE_Error_CleanUP(self, s):
        while((start:=s.find("<"))>0 and (end:=s.find(">"))>0):
            s = s[:start] + s[end+1:]
        return s


    def __init__(self, websitepath, problem_id, code, username, init_result, judger, compiled, eval_cases):
        self.websitepath = websitepath
        self.result = init_result
        self.problem_id = problem_id
        self.code = code
        self.username = username
        self.CurrentMaxTime = 0
        self.CurrentMaxMemory = 0
        self.judger = judger
        self.maxTime = float(self.judger["maxTime"])
        self.maxMemory = float(self.judger["maxMemory"])
        self.compiled = compiled
        self.eval_cases = eval_cases


    def RunJudge(self):
        for case_idx, case_input in enumerate(self.eval_cases):
            print("Judge Running Case", case_idx+1)
            result = self.RunCase(case_input)
            if result: return result
        return self.Save_Submit_Result(self.problem_id, self.code, self.result, self.username)


    def RunCase(self, case_input):
        inputs = self.judger["Input_Pre_Processor"](case_input)
        curT = timeTracer.time()
        try:
            setattr(self.compiled["Solution"], "_RuntimeStartTime", curT)
            setattr(self.compiled["Solution"], "_RuntimeMaxTime", self.maxTime)
            setattr(self.compiled["Solution"], "_GetTimeFunction", CodeProcessor._GetTimeFunction)
            setattr(self.compiled["Solution"], "_KillTLE", CodeProcessor._KillTLE)
            output = self.compiled["Solution"]().main(*inputs)
        except Exception as e:
            self.result["result"], self.result["output"] = states[5][0], f"{states[5][1]}: {self.CE_RE_Error_CleanUP(str(e))}"
            return self.Save_Submit_Result(self.problem_id, self.code, self.result, self.username)
        endT = timeTracer.time()

        self.result["time"] = self.CurrentMaxTime = max(self.CurrentMaxTime, endT-curT)
        self.result["memory"] = self.CurrentMaxMemory = max( self.CurrentMaxMemory, sys.getsizeof(self.code)/(1024**2) )

        if self.result["time"] > self.maxTime:
            self.result["result"], self.result["output"] = states[3]
            return self.Save_Submit_Result(self.problem_id, self.code, self.result, self.username)
        elif self.result["memory"] > self.maxMemory:
            self.result["result"], self.result["output"] = states[4]
            return self.Save_Submit_Result(self.problem_id, self.code, self.result, self.username)
        else:
            failed = not self.judger["Output_Classifier"](inputs, output)
            self.result["result"], self.result["output"] = states[failed+1]
            if failed: return self.Save_Submit_Result(self.problem_id, self.code, self.result, self.username)
        return False


    def Save_Submit_Result(self, problem_id, code, result, username):
        submissions_file = os.path.join(self.websitepath, "submissions", "submissions.json")
        with codecs.open(submissions_file, "r", "utf-8") as f:
            submissions_data = json.load(f)
        submission = submissions_data["pending"][result["submit_id"]]
        del submissions_data["pending"][result["submit_id"]]
        submission["result"] = result["result"]
        submissions_data["submissions"][result["submit_id"]] = submission
        with codecs.open(submissions_file, "w", "utf-8") as f:
            json.dump(submissions_data, f, indent=4, ensure_ascii=False)

        users_path = os.path.join(self.websitepath, "data", "users")
        with codecs.open(os.path.join(users_path, username.lower(), "user_data.json"), "r", "utf-8") as f:
            user_data = json.load(f)

        if(not user_data["problems"].get(f"{problem_id}", False)):
            user_data["problems"][f"{problem_id}"] = {
                "passed":False,
                "lastSubmission": {
                    "result": {},
                    "code": ""
                },
                "recentSubmissions": [],
                "discussions":{}
            }

        user_data["problems"][f"{problem_id}"]["lastSubmission"]["code"] = code
        result["time"] = int(result["time"]*1000)
        result["memory"] = round(result["memory"], 3)
        user_data["problems"][f"{problem_id}"]["lastSubmission"]["result"] = result
        user_data["problems"][f"{problem_id}"]["recentSubmissions"].insert(0, result)
        user_data["problems"][f"{problem_id}"]["recentSubmissions"][0]["code"] = code
        user_data["problems"][f"{problem_id}"]["recentSubmissions"][0]["problem_id"] = problem_id

        if result["result"] == states[1][0] and not user_data["problems"][f"{problem_id}"]["passed"]:
            user_data["problems"][f"{problem_id}"]["passed"] = True

        if(len(user_data["problems"][f"{problem_id}"]["recentSubmissions"]) > 10):
            user_data["problems"][f"{problem_id}"]["recentSubmissions"] = user_data["problems"][f"{problem_id}"]["recentSubmissions"][:10]

        with codecs.open(os.path.join(users_path, username.lower(), "user_data.json"), "w", "utf-8") as f:
            json.dump(user_data, f, indent=4, ensure_ascii=False)
        
        if user_data["problems"][f"{problem_id}"]["passed"]:
            DataUpdater__Judge.Update_User_Passed(problem_id, username)
            DataUpdater__Judge.Update_User_List(username=username)
        DataUpdater__Judge.Update_Problem_Participants(problem_id, username, user_data["problems"][f"{problem_id}"]["passed"])
        DataUpdater__Judge.Update_Problem_List(question_id=problem_id)

        return {**result, "user_data":user_data}




