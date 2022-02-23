from .modules.DataUpdater import Updater; DataUpdater__submit = Updater()
from .modules.CodeProcess import CodeProcessor
from .modules.OnlineJudge import Judge
from flask import Blueprint, request
import time as Timer
import codecs
import json
import sys
import os



submit = Blueprint("submit", __name__)
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



def Save_Submit_Result(problem_id, code, result, username):
    submissions_file = os.path.join(os.path.dirname(__file__), "submissions", "submissions.json")
    with codecs.open(submissions_file, "r", "utf-8") as f:
        submissions_data = json.load(f)
    submission = submissions_data["pending"][result["submit_id"]]
    del submissions_data["pending"][result["submit_id"]]
    submission["result"] = result["result"]
    submissions_data["submissions"][result["submit_id"]] = submission
    with codecs.open(submissions_file, "w", "utf-8") as f:
        json.dump(submissions_data, f, indent=4, ensure_ascii=False)

    users_path = os.path.join(os.path.dirname(__file__), "data", "users")
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
        DataUpdater__submit.Update_User_Passed(problem_id, username)
        DataUpdater__submit.Update_User_List(username=username)
    DataUpdater__submit.Update_Problem_Participants(problem_id, username, user_data["problems"][f"{problem_id}"]["passed"])
    DataUpdater__submit.Update_Problem_List(question_id=problem_id)

    return {**result, "user_data":user_data}





def CE_RE_Error_CleanUP(s):
    while((start:=s.find("<"))>0 and (end:=s.find(">"))>0):
        s = s[:start] + s[end+1:]
    return s



def FixInfiniteWhile(code):
    now = 0
    while(True):
        finding = "while("
        idx = code.find(finding, now)
        if idx < 0 or idx > len(code): break
        inserting = "(Solution.__GetTimeFunction() - Solution.__RuntimeStartTime < Solution.__RuntimeMaxTime) and ("
        code = code[:idx+len(finding)] + inserting + code[idx+len(finding):]
        now = idx+len(finding)+len(inserting)

        _now = now
        while(True):
            ending = code.find(":", _now)
            if code[ending+1] == "=": 
                _now = ending+1
                continue
            code = code[:ending] + ")" + code[ending:]
            now = ending+2
            break
    return code



def FixLongFor(code):
    now = 0
    while(True):
        now = code.find("for", now)
        if now < 0 or now > len(code): break

        indent = 0
        tmp = now
        while(True):
            if code[tmp-4:tmp] != " "*4: break
            indent += 1
            tmp -= 4

        while(True):
            ending = code.find(":", now)
            _now = ending
            while(True):
                _now -= 1
                if code[_now] != " ":
                    break
            if code[ending+1] != "=" and code[_now] == ")": break
            if ending < 0 or ending > len(code): break
            now = ending+1
        if ending < 0 or ending > len(code): break

        tmp = now
        while(True):
            if code[tmp] != " ":
                code = code[:now] + code[tmp:]
                break
            tmp += 1
        
        adding = "\n" + " "*4*(indent+1) + "if(Solution.__GetTimeFunction() - Solution.__RuntimeStartTime > Solution.__RuntimeMaxTime):break" + "\n" + " "*4*(indent+1)
        code = code[:now] + adding + code[now:] + "\n"
        now += len(adding)
    return code



def FixLongComprehension(code):
    now = 0
    while(True):
        now = code.find("for", now)
        if now < 0 or now > len(code): break

        is_comprehension = True
        tmp = now-1
        remember_space = [now-1, 1]
        p = [0, 0]
        while(True):
            if remember_space[1]:
                if code[remember_space[0]] != " ":
                    remember_space[1] = 0
                else:
                    remember_space[0] -= 1

            if code[tmp] == ")":
                p[0] += 1
            elif code[tmp] == "]":
                p[1] += 1
            elif code[tmp] == "(":
                if p[0] == 0:
                    break
                else:
                    p[0] -= 1
            elif code[tmp] == "[":
                if p[1] == 0:
                    break
                else:
                    p[1] -= 1
            elif code[tmp] == ":":
                is_comprehension = False
                break
            tmp -= 1
            if tmp < 0: 
                is_comprehension = False
                break

        if not is_comprehension:
            now += 3
            continue
        else:
            adding = ") if(Solution.__GetTimeFunction() - Solution.__RuntimeStartTime < Solution.__RuntimeMaxTime)else(Solution.__KillTLE()) "
            code = code[:tmp+1] + "(" + code[tmp+1:]
            code = code[:remember_space[0]+2] + adding + code[now+1:]
            now += len(adding)+3
    return code





@submit.route("/submit", methods=["GET"])
def submit_submit():
    Args = request.args.to_dict()


    #args checking
    code = Args.get("code", None)
    username = Args.get("username", None)
    problem_id = Args.get("id", None)
    submit_time = Args.get("st", None)
    if not (code and username and problem_id and submit_time) or f"problem_{problem_id}" not in os.listdir(os.path.join(os.path.dirname(__file__), "problems")) or username.lower() not in os.listdir(os.path.join(os.path.dirname(__file__), "data", "users")):
        result = {
            "submit_time":submit_time, "time":0.0, "memory":0.0, "result":states[7][0], "output":f"{states[7][1]}: Missing Data"
        }
        return result


    #submissions saving
    with codecs.open(os.path.join(os.path.dirname(__file__), "submissions", "submissions.json"), "r", "utf-8") as f:
        submissions_data = json.load(f)
    all_ids = list(submissions_data["pending"].keys()) + list(submissions_data["submissions"].keys())
    submit_id = 0
    while(True):
        if f"{submit_id:0>8}" not in all_ids:
            submit_id = f"{submit_id:0>8}"
            break
        submit_id += 1
    submissions_data["pending"][submit_id] = {
        "problem_id":problem_id,
        "submit_id":submit_id,
        "username":username,
        "submit_time":submit_time,
        "result":states[0][0]
    }
    with codecs.open(os.path.join(os.path.dirname(__file__), "submissions", "submissions.json"), "w", "utf-8") as f:
        json.dump(submissions_data, f, indent=4, ensure_ascii=False)
    result = {"submit_id":submit_id, "submit_time":submit_time, "time":0.0, "memory":0.0}


    #args processing
    with codecs.open(os.path.join(os.path.dirname(__file__), "storage", "replacement.json"), "r", "utf-8") as replacement:
        StringReplacement = json.load(replacement)
    for key, val in StringReplacement.items():
        code = code.replace(val, key)
    with codecs.open(os.path.join(os.path.dirname(__file__), "problems", f"problem_{problem_id}", "eval.json"), "r", "utf-8") as eval_cases_data:
        eval_cases = json.load(eval_cases_data)["cases"]


    #prevent evil imports
    if "import" in code:
        result["result"] = states[6][0]
        result["output"] = f"{states[6][1]}: 'import' is not allowed"
        return Save_Submit_Result(problem_id, code, result, username)


    #run imports and define inputs
    codeed = {}
    judger = {}
    exec(f"from website.problems.problem_{problem_id}.judge import *", judger)
    try:
        fixed_code = CodeProcessor.Fix(code)
        exec(fixed_code, codeed)
    except Exception as e:
        result["result"] = states[6][0]
        result["output"] = f"{states[6][1]}: {CE_RE_Error_CleanUP(str(e))}"
        return Save_Submit_Result(problem_id, code, result, username)
    if "Solution" not in codeed.keys():
        result["result"] = states[5][0]
        result["output"] = f"{states[5][1]}: 'Solution' is not defined"
        return Save_Submit_Result(problem_id, code, result, username)


    #run judge
    Judger = Judge(
        websitepath=os.path.dirname(__file__),
        problem_id=problem_id,
        code=code,
        username=username,
        init_result=result,
        judger=judger,
        compiled=codeed,
        eval_cases=eval_cases
    )
    print("Judge Start", Judge)
    result = Judger.RunJudge()
    print("Judge End", Judge)
    return result



@submit.route("/test", methods=["GET"])
def submit_test():
    Args = request.args.to_dict()


    #args
    code = Args.get("code", None)
    problem_id = Args.get("id", None)
    inputDefinition = Args.get("inputDefinition", None)
    if not (problem_id and code and inputDefinition):
        result = {
            "time":0, "memory":0, "result":states[7][0], "output":f"{states[7][1]}: Missing Data"
        }
        return result

    with codecs.open(os.path.join(os.path.dirname(__file__), "storage", "replacement.json"), "r", "utf-8") as replacement:
        StringReplacement = json.load(replacement)
    for key, val in StringReplacement.items():
        code = code.replace(val, key)
        inputDefinition = inputDefinition.replace(val, key)


    #prevent evil imports
    if "import" in code:
        result = {
            "time":0, "memory":0, "result":states[6][0], "output":f"{states[6][1]}: 'import' is not allowed"
        }
        return result


    #run imports and define inputs
    codeed = {}
    judger = {}
    inputs = {}
    exec(f"from website.problems.problem_{problem_id}.judge import *", judger)
    maxTime = float(judger["maxTime"])
    maxMemory = float(judger["maxMemory"])
    try:
        exec(inputDefinition, inputs)
    except Exception as e:
        result = {
            "time":0, "memory":0, "result":states[6][0], "output":f"Input {states[6][1]}: {CE_RE_Error_CleanUP(str(e))}"
        }
        return result
    try:
        fixed_code = CodeProcessor.Fix(code)
        exec(fixed_code, codeed)
    except Exception as e:
        result = {
            "time":0, "memory":0, "result":states[6][0], "output":f"Code {states[6][1]}: {CE_RE_Error_CleanUP(str(e))}"
        }
        return result
    if "Solution" not in codeed.keys(): 
        result = {
            "time":0, "memory":0, "result":states[5][0], "output":f"{states[5][1]}: 'Solution' is not defined"
        }
        return result


    #run judge
    inputs = judger["Input_Pre_Processor"](list(inputs.values())[1:])
    result = {}
    curT = Timer.time()
    try:
        setattr(codeed["Solution"], "_RuntimeStartTime", curT)
        setattr(codeed["Solution"], "_RuntimeMaxTime", maxTime)
        setattr(codeed["Solution"], "_GetTimeFunction", CodeProcessor._GetTimeFunction)
        setattr(codeed["Solution"], "_KillTLE", CodeProcessor._KillTLE)
        output = codeed["Solution"]().main(*inputs)
    except Exception as e:
        result = {
            "time":0, "memory":0, "result":states[5][0], "output":f"{states[5][1]}: {CE_RE_Error_CleanUP(str(e))}"
        }
        return result
    endT = Timer.time()

    result["time"] = endT-curT
    result["memory"] = sys.getsizeof(code)/(32**3)

    if(not result.get("result", False)):
        if result["time"] > maxTime:
            result["result"] = states[3][0]
            result["output"] = states[3][1]
        elif result["memory"] > maxMemory:
            result["result"] = states[4][0]
            result["output"] = states[4][1]
        else:
            failed = not judger["Output_Classifier"](inputs, output)
            result["result"] = states[failed+1][0]
            result["output"] = states[failed+1][1]
    return result









