
maxTime = 1
maxMemory = 15

def Input_Pre_Processor(inputs):
    return inputs

def Problem_Solver(t1, t2):
    def d(s):
        s = s.split()
        s = [int(_) for _ in s[0].split("/") + s[1].split(":")]
        s = s[0]*12*30*24*60 + s[1]*30*24*60 + s[2]*24*60 + s[3]*60 + s[4]
        return s
    return d(t2) - d(t1)

def Output_Pre_Processor(output):
    return output

def Output_Classifier(inputs, output):
    answer = Output_Pre_Processor(Problem_Solver(*inputs))
    print(answer, Output_Pre_Processor(output))
    return answer == Output_Pre_Processor(output)