from flask import Blueprint, request
import tracemalloc as memoryTracer
import time as Timer
import json
import os

submit = Blueprint("submit", __name__)
states = {
    1:("AC", "Accepted"), 
    2:("WA", "Wrong Answer"), 
    3:("TLE", "Time Limit Exceed"), 
    4:("MLE", "Memory Limit Exceed"), 
    5:("RE", "Runtime Error"), 
    6:("CE", "Compile Error")
}

def CE_RE_Error_CleanUP(s):
    while((start:=s.find("<"))>0 and (end:=s.find(">"))>0):
        s = s[:start] + s[end+1:]
    return s

@submit.route("/submit", methods=["GET"])
def submit_submit():
    Args = request.args.to_dict()



    return

@submit.route("/test", methods=["GET"])
def submit_test():
    Args = request.args.to_dict()


    #args
    with open(os.path.join(os.path.dirname(__file__), "storage", "replacement.json"), "r") as replacement:
        StringReplacement = json.load(replacement)
    problem_id = int(Args["id"])
    code = Args["code"]
    inputDefinition = Args["inputDefinition"]
    for key, val in StringReplacement.items():
        code = code.replace(val, key)
        inputDefinition = inputDefinition.replace(val, key)

    #prevent evil imports
    if "import" in code:
        result = {
            "time":0.0, "memory":0.0, "result":"CE", "output":"Compile Error: 'import' is not allowed"
        }
        return result


    #run imports and define inputs
    codeed = {}
    judger = {}
    inputs = {}
    exec(inputDefinition, inputs)
    exec(f"from website.judger.problem_{problem_id} import *", judger)
    try:
        exec(f"{code}", codeed)
    except Exception as e:
        result = {
            "time":0.0, "memory":0.0, "result":"CE", "output":f"Compile Error: {CE_RE_Error_CleanUP(str(e))}"
        }
        return result
    maxTime = float(judger["maxTime"])
    maxMemory = float(judger["maxMemory"])
    inputs = judger["Input_Pre_Processor"](list(inputs.values())[1:])


    #run judge
    result = {}
    curT = Timer.time()
    memoryTracer.start()
    curMem = memoryTracer.get_traced_memory()[0] / 10**3
    try:
        if "Solution" not in codeed.keys(): 
            result["result"] = str(states[5][0])
            result["output"] = f"{str(states[5][1])}: 'Solution' is not defined"
        else:
            output = codeed["Solution"]().main(*inputs)
    except Exception as e:
        result["result"] = str(states[5][0])
        result["output"] = f"Compile Error: {CE_RE_Error_CleanUP(str(e))}"
    endT = Timer.time()
    endMem = memoryTracer.get_traced_memory()[0] / 10**3
    memoryTracer.stop()

    result["time"] = endT-curT
    result["memory"] = endMem-curMem

    if(not result.get("result", False)):
        if result["time"] > maxTime:
            result["result"] = str(states[3][0])
            result["output"] = str(states[3][1])
        elif result["memory"] > maxMemory:
            result["result"] = str(states[4][0])
            result["output"] = str(states[4][1])
        else:
            correct = not judger["Output_Classifier"](inputs, output)
            result["result"] = str(states[correct+1][0])
            result["output"] = str(states[correct+1][1])
    return result









