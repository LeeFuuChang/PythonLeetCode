
maxTime = 15
maxMemory = 15

def Input_Pre_Processor(inputs):
    return inputs

def Problem_Solver(x):
    return str(x) == str(x)[::-1]

def Output_Pre_Processor(output):
    return output

def Output_Classifier(inputs, output):
    answer = Output_Pre_Processor(Problem_Solver(*inputs))
    print(answer, Output_Pre_Processor(output))
    return answer == Output_Pre_Processor(output)