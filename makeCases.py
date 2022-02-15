import random
import json

cases = {
    "cases":[]
}

for i in range(10):
    now = []
    for j in range(2):
        g = [
            f"{random.randint( 2000, 3000):0>4}",
            "/",
            f"{random.randint( 1,12):0>2}",
            "/",
            f"{random.randint( 1,30):0>2}",
            " ",
            f"{random.randint( 0,23):0>2}",
            ":",
            f"{random.randint( 0,59):0>2}",
        ]
        now.append("".join(g))
    cases["cases"].append(now)

def sp(s):
    s = s.split()
    s = [int(_) for _ in s[0].split("/") + s[1].split(":")]
    s = s[0]*12*30*24*60 + s[1]*30*24*60 + s[2]*24*60 + s[3]*60 + s[4]
    return s

def a(t1, t2):
    return sp(t2) - sp(t1)

for idx, case in enumerate(cases["cases"]):
    if a(*case) < 0:
        cases["cases"][idx] = cases["cases"][idx][::-1]
    print(cases["cases"][idx])
with open("eval.json", "w") as f:
    json.dump(cases, f, indent=4)