
maxTime = 15
maxMemory = 15

def Input_Pre_Processor(inputs):
    return inputs

def Problem_Solver(y):
    return (y%4==0 and y%100!=0) or y%400==0

def Output_Pre_Processor(output):
    return output

def Output_Classifier(inputs, output):
    answer = Output_Pre_Processor(Problem_Solver(*inputs))
    print(answer, Output_Pre_Processor(output))
    return answer == Output_Pre_Processor(output)