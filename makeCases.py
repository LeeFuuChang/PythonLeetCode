import random
import json

cases = {
    "cases":[]
}
items = [chr(i) for i in range(65, 91)] + [chr(i) for i in range(97, 123)] + [str(i) for i in range(10)] + [" "]
for i in range(10):
    now = random.randint(-2**31, 2**31 - 1)
    cases["cases"].append(
        [f"{now}"]
    )
for case in cases["cases"]:
    print(case)
with open("eval.json", "w") as f:
    json.dump(cases, f, indent=4)