
maxTime = 15
maxMemory = 15

def Input_Pre_Processor(inputs):
    return inputs

def Problem_Solver(s):
    ints = ["-", "+"] + [str(i) for i in range(10)]
    result = ""
    waiting_for_ints01 = True
    for i in range(len(s)):
        if s[i] != " ":
            break
    s = s[i:]
    if s:
        for i, char in enumerate(s):
            if waiting_for_ints01:
                if char in ints[:2]:
                    result += char
                    if len(s[i:])==1 or s[i+1] not in ints[2:]:
                        return 0
                elif char in ints[2:]:
                    result += char
                else:
                    return 0
                waiting_for_ints01 = False
                ints = ints[2:]
            else:
                if char in ints:
                    result += char
                if len(s[i:])==1 or s[i+1] not in ints:
                    return int(result)
    else:
        return 0

def Output_Pre_Processor(output):
    return output

def Output_Classifier(inputs, output):
    answer = Output_Pre_Processor(Problem_Solver(*inputs))
    return answer == Output_Pre_Processor(output)