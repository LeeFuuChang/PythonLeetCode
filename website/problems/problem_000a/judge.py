
maxTime = 15
maxMemory = 15

def Input_Pre_Processor(inputs):
    return inputs

def Problem_Solver(c):
    c **= 2
    now = 1
    while(now**2 <= c):
        aa = now**2
        bb = c-aa
        if not bb: break
        if (aa**(1/2))%1==0 and (bb**(1/2))%1==0: return True
        now += 1
    return False

def Output_Pre_Processor(output):
    return output

def Output_Classifier(inputs, output):
    answer = Output_Pre_Processor(Problem_Solver(*inputs))
    return answer == Output_Pre_Processor(output)