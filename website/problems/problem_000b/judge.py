
maxTime = 15
maxMemory = 15

def Input_Pre_Processor(inputs):
    return inputs

def Problem_Solver(s):
    Waiting = []
    pair = {"(":")", "{":"}", "[":"]"}
    for c in s:
        if c in "({[":
            Waiting.append(pair[c])
        else:
            if Waiting and c == Waiting.pop(-1):continue
            return False
    return len(Waiting) == 0

def Output_Pre_Processor(output):
    return output

def Output_Classifier(inputs, output):
    answer = Output_Pre_Processor(Problem_Solver(*inputs))
    return answer == Output_Pre_Processor(output)