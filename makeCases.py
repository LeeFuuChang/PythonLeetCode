import random
import json

cases = {
    "cases":[]
}

for i in range(1, 10):
    l = random.randint(2, 10)
    now = [
        [[random.randint(-20000, 20000) for j in range(l)] for k in range(random.randint(2, 10))]
    ]
    cases["cases"].append(now)

for idx, case in enumerate(cases["cases"]):
    print(cases["cases"][idx])
with open("eval.json", "w") as f:
    json.dump(cases, f, indent=4)