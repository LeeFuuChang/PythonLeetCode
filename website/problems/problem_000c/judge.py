
maxTime = 15
maxMemory = 15

def Input_Pre_Processor(inputs):
    return inputs

def Problem_Solver(matrix):
    hash = set()
    waiting = []
    def Search(x, y, matrix, hash):
        if 0<=x<len(matrix) and 0<=y<len(matrix[0]):
            if matrix[x][y] == 1 and (x, y) not in hash:
                hash.add( (x, y) )
                directions = [
                    [x-1, y],
                    [x+1, y],
                    [x, y-1],
                    [x, y+1]
                ]
                for nx, ny in directions:
                    if (nx, ny) not in hash:
                        waiting.append( (nx, ny) )
    for i in range(len(matrix[0])):
        Search(0, i, matrix, hash)
        Search(len(matrix)-1, i, matrix, hash)
    for i in range(1, len(matrix)-1):
        Search(i, 0, matrix, hash)
        Search(i, len(matrix[0])-1, matrix, hash)
    while(waiting): Search(*waiting.pop(), matrix, hash)
    ans = []
    for i in range(len(matrix)):
        ans.append([])
        for j in range(len(matrix[0])):
            if (i, j) in hash:
                ans[-1].append(1)
            else:
                ans[-1].append(0)
    return ans

def Output_Pre_Processor(output):
    return output

def Output_Classifier(inputs, output):
    answer = Output_Pre_Processor(Problem_Solver(*inputs))
    return answer == Output_Pre_Processor(output)