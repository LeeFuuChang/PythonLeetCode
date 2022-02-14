
maxTime = 10
maxMemory = 15

def Input_Pre_Processor(inputs):
    return inputs

def Problem_Solver(nums, target):
    for i in range(1, len(nums)):
        for j in range(i):
            if nums[i]+nums[j] == target: return[i, j]

def Output_Pre_Processor(output):
    return output

def Output_Classifier(inputs, output):
    answer = Output_Pre_Processor(Problem_Solver(*inputs))
    return set(answer) == set(Output_Pre_Processor(output))