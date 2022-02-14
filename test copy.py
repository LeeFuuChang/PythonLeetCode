import random, json

diffs = ["Easy", "Medium", "Hard"]
r = {
    "problem_list":[]
}

for i in range(100):
    p = random.randint(1, 500)
    now = {
        "id":f"a{i:0>3}",
        "name":"just testing",
        "difficulty":random.choice(diffs),
        "time":f"2022/{random.randint(1, 12):0>2}/{random.randint(1, 30):0>2}",
        "participants":p,
        "passed_participants":random.randint(1, p)
    }
    r["problem_list"].append(now)

with open("a.json", "w") as f:
    json.dump(r, f, indent=4)