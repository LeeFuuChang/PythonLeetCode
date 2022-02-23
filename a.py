#https://zerojudge.tw/ShowProblem?problemid=f607

n, L = [int(_) for _ in input().split()]
now = ["-"*L] #模擬棍子
#讀取輸入並依照 i 排序 [[x, 1], [x, 2], [x, 3]]
cut = sorted([[int(_) for _ in input().split()] for i in range(n)], key=lambda x:x[1])
prc = 0
for x, i in cut:
    for idx, s in enumerate(now):
        if x - len(s) <= 0: break
        x -= len(s)
    left = now[idx][:x]
    right = now[idx][x:]
    now = now[:idx] + [left, right] + now[idx+1:]
    prc += len(left)+len(right)
print(prc)