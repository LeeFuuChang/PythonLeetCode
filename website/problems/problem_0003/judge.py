
maxTime = 15
maxMemory = 15

def Input_Pre_Processor(inputs):
    return inputs

def Problem_Solver(x):
    string = str(x)
    negtiv = string[0] == "-"
    string = string[::-1]
    if negtiv:
        string = "-" + string[:len(string)-1]
    res = int(string)
    return res

def Output_Pre_Processor(output):
    return output

def Output_Classifier(inputs, output):
    answer = Output_Pre_Processor(Problem_Solver(*inputs))
    return answer == Output_Pre_Processor(output)