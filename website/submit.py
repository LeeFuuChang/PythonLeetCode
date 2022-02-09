from flask import Blueprint, request
import tracemalloc as memoryTracer
import time as Timer
import json
import sys
import os



submit = Blueprint("submit", __name__)
states = {
    1:("AC", "Accepted"), 
    2:("WA", "Wrong Answer"), 
    3:("TLE", "Time Limit Exceed"), 
    4:("MLE", "Memory Limit Exceed"), 
    5:("RE", "Runtime Error"), 
    6:("CE", "Compile Error"),
    7:("SE", "Server Error")
}



def Save_Submit_Result(problem_id, code, result, username):
    users_path = os.path.join(os.path.dirname(__file__), "data", "users")
    with open(os.path.join(users_path, f"{username}.json"), "r") as f:
        user_data = json.load(f)

    if(not user_data["problems"].get(f"{problem_id}", False)):
        user_data["problems"][f"{problem_id}"] = {
            "passed":False,
            "lastSubmission": {
                "result": {},
                "code": ""
            },
            "recentSubmissions": []
        }

    user_data["problems"][f"{problem_id}"]["lastSubmission"]["code"] = code
    result["time"] = int(result["time"]*1000)
    result["memory"] = round(result["memory"], 3)
    user_data["problems"][f"{problem_id}"]["lastSubmission"]["result"] = result
    user_data["problems"][f"{problem_id}"]["recentSubmissions"].insert(0, result)
    user_data["problems"][f"{problem_id}"]["recentSubmissions"][0]["code"] = code

    if not user_data["problems"][f"{problem_id}"]["passed"]:
        user_data["problems"][f"{problem_id}"]["passed"] = result["result"] == states[1][0]

    if(len(user_data["problems"][f"{problem_id}"]["recentSubmissions"]) > 10):
        user_data["problems"][f"{problem_id}"]["recentSubmissions"] = user_data["problems"][f"{problem_id}"]["recentSubmissions"][:10]

    with open(os.path.join(users_path, f"{username}.json"), "w") as f:
        json.dump(user_data, f, indent=4)

    return result



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
        inserting = "(self.GetTimeFunction() - self.RuntimeStartTime < self.RuntimeMaxTime) and ("
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





@submit.route("/submit", methods=["GET"])
def submit_submit():
    Args = request.args.to_dict()


    #args
    code = Args.get("code", None)
    username = Args.get("username", None)
    problem_id = Args.get("id", None)
    submit_time = Args.get("st", None)
    if not (code and username and problem_id and submit_time):
        result = {
            "time":0.0, "memory":0.0, "result":states[7][0], "output":f"{states[7][1]}: Missing Data"
        }
        return Save_Submit_Result(problem_id, code, result, username)

    with open(os.path.join(os.path.dirname(__file__), "storage", "replacement.json"), "r") as replacement:
        StringReplacement = json.load(replacement)
    for key, val in StringReplacement.items():
        code = code.replace(val, key)
    with open(os.path.join(os.path.dirname(__file__), "problems", f"problem_{problem_id}", "eval.json"), "r") as eval_cases_data:
        eval_cases = json.load(eval_cases_data)["cases"]


    #prevent evil imports
    if "import" in code:
        result = {
            "submit_time":submit_time, "time":0.0, "memory":0.0, "result":states[6][0], "output":f"{states[6][1]}: 'import' is not allowed"
        }
        return Save_Submit_Result(problem_id, code, result, username)


    #run imports and define inputs
    codeed = {}
    judger = {}
    inputs = {}
    exec(f"from website.problems.problem_{problem_id}.judge import *", judger)
    maxTime = float(judger["maxTime"])
    maxMemory = float(judger["maxMemory"])
    try:
        fixed_code = FixInfiniteWhile(code)
        exec(fixed_code, codeed)
    except Exception as e:
        result = {
            "submit_time":submit_time, "time":0.0, "memory":0.0, "result":states[6][0], "output":f"{states[6][1]}: {CE_RE_Error_CleanUP(str(e))}"
        }
        return Save_Submit_Result(problem_id, code, result, username)
    if "Solution" not in codeed.keys(): 
        result = {
            "submit_time":submit_time, "time":0.0, "memory":0.0, "result":states[5][0], "output":f"{states[5][1]}: 'Solution' is not defined"
        }
        return Save_Submit_Result(problem_id, code, result, username)


    #run judge
    CurrentMaxTime = 0
    CurrentMaxMemory = 0
    result = {}
    for idx, case_input in enumerate(eval_cases):
        print(result)
        print("\n\n\nrunning case", idx)
        inputs = judger["Input_Pre_Processor"](case_input)
        result = {}
        curT = Timer.time()
        memoryTracer.start()
        curMem = memoryTracer.get_traced_memory()[0] / 10**3
        try:
            setattr(codeed["Solution"], "RuntimeStartTime", curT)
            setattr(codeed["Solution"], "RuntimeMaxTime", maxTime)
            setattr(codeed["Solution"], "GetTimeFunction", Timer.time)
            output = codeed["Solution"]().main(*inputs)
        except Exception as e:
            result = {
                "submit_time":submit_time, "time":0.0, "memory":0.0, "result":states[5][0], "output":f"{states[5][1]}: {CE_RE_Error_CleanUP(str(e))}"
            }
            return Save_Submit_Result(problem_id, code, result, username)
        endT = Timer.time()
        endMem = memoryTracer.get_traced_memory()[0] / 10**3
        memoryTracer.stop()

        result["submit_time"] = submit_time
        result["time"] = CurrentMaxTime = max(CurrentMaxTime, endT-curT)
        result["memory"] = CurrentMaxMemory = max( CurrentMaxMemory, endMem-curMem + ( sys.getsizeof(code)/(1024**2) ) )

        if result["time"] > maxTime:
            result["result"] = states[3][0]
            result["output"] = states[3][1]
            return Save_Submit_Result(problem_id, code, result, username)
        elif result["memory"] > maxMemory:
            result["result"] = states[4][0]
            result["output"] = states[4][1]
            return Save_Submit_Result(problem_id, code, result, username)
        else:
            failed = not judger["Output_Classifier"](inputs, output)
            result["result"] = states[failed+1][0]
            result["output"] = states[failed+1][1]
            if failed: return Save_Submit_Result(problem_id, code, result, username)

    return Save_Submit_Result(problem_id, code, result, username)





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

    with open(os.path.join(os.path.dirname(__file__), "storage", "replacement.json"), "r") as replacement:
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
        exec(code, codeed)
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
    memoryTracer.start()
    curMem = memoryTracer.get_traced_memory()[0] / 10**3
    try:
        output = codeed["Solution"]().main(*inputs)
    except Exception as e:
        result = {
            "time":0, "memory":0, "result":states[5][0], "output":f"{states[5][1]}: {CE_RE_Error_CleanUP(str(e))}"
        }
        return result
    endT = Timer.time()
    endMem = memoryTracer.get_traced_memory()[0] / 10**3
    memoryTracer.stop()

    result["time"] = endT-curT
    result["memory"] =  endMem-curMem + ( sys.getsizeof(code)/(1024**2) )

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









