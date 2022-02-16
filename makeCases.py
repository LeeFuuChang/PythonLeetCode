import random
import json

cases = {
    "cases":[
        [[0, 0], 0],
        [[3,3], 6],
        [[3,2,4], 6],
        [[2,7,11,15], 9],
    ]
}

for i in range(1, 7):
    _len = random.randint(2, int(10**i**(1/2)))
    picked = random.sample(range(_len), 2)
    nums = [
        random.randint(-10**9, 10**9) for j in range(_len)
    ]
    now = [
        nums,
        nums[picked[0]]+nums[picked[1]]
    ]
    cases["cases"].append(now)

for idx, case in enumerate(cases["cases"]):
    print(cases["cases"][idx])
with open("eval.json", "w") as f:
    json.dump(cases, f, indent=4)