
maxTime = 5
maxMemory = 50

class ListNode:
    def __init__(self, val, next=None):
        self.val = val
        self.next = next

def Input_Pre_Processor(inputs):
    new_inps = []
    for l in inputs:
        head = ListNode(l[0])
        curr = head
        for n in l[1:]:
            ln = ListNode(n)
            curr.next = ln
            curr = ln
        new_inps.append(head)
    return new_inps

def Problem_Solver(l1, l2):
    n1 = []
    while(True):
        n1.insert(0, str(l1.val))
        if not l1.next: break
        l1 = l1.next
    n1 = int("".join(n1))
    n2 = []
    while(True):
        n2.insert(0, str(l2.val))
        if not l2.next: break
        l2 = l2.next
    n2 = int("".join(n2))
    
    sm = str(n1+n2)
    ls = ListNode(val=int(sm[-1]))
    cn = ls
    for i in range(2, len(sm)+1):
        tmp = ListNode(val=int(sm[-i]))
        cn.next = tmp
        cn = tmp
    return ls

def Output_Pre_Processor(output):
    new_out = []
    while(True):
        new_out.append(output.val)
        if not output.next: break
        output = output.next
    return new_out

def Output_Classifier(inputs, output):
    answer = Output_Pre_Processor(Problem_Solver(*inputs))
    print(answer, Output_Pre_Processor(output))
    return answer == Output_Pre_Processor(output)