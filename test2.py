import json, time

with open("a.json", "r") as f:
    d = json.load(f)

def sol(nums, target):
    for i in range(1, len(nums)):
        for j in range(i):
            if nums[i]+nums[j]==target:return [i, j, nums[i], nums[j]], target

for case in d["cases"]:
    a = time.time()
    print(*sol(*case), time.time()-a)