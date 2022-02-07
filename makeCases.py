import random
import json

cases = {
    "cases":[
        [[0],[0]]
    ]
}
l = 100
for i in range(9):
    now = [[], []]
    z = random.randint(95, 100)
    for j in range(z):
        if len(now[0]) == 0 or j==z-1:
            p = random.randint(1, 9)
        else:
            p = random.randint(0, 9)
        now[0].append(p)
    z = random.randint(95, 100)
    for j in range(z):
        if len(now[1]) == 0 or j==z-1:
            p = random.randint(1, 9)
        else:
            p = random.randint(0, 9)
        now[1].append(p)
    cases["cases"].append(now)
cases["cases"] = sorted(cases["cases"], key=lambda x:len(x[0])+len(x[1]))
for case in cases["cases"]:
    print(case)
with open("problem_2.json", "w") as f:
    json.dump(cases, f, indent=4)