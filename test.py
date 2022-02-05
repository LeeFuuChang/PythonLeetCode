from random import randint, shuffle
import json
k = [
    [(10**9) // (2**20), (10**4 - 5) // (2**20)],
    [(10**9) // (2**18), (10**4 - 5) // (2**18)],
    [(10**9) // (2**16), (10**4 - 5) // (2**16)],
    [(10**9) // (2**14), (10**4 - 5) // (2**14)],
    [(10**9) // (2**12), (10**4 - 5) // (2**12)],
    [(10**9) // (2**10), (10**4 - 5) // (2**10)],
    [(10**9) // (2**8), (10**4 - 5) // (2**8)],
    [(10**9) // (2**6), (10**4 - 5) // (2**6)],
    [(10**9) // (2**4), (10**4 - 5) // (2**4)],
    [(10**9) // (2**2), (10**4 - 5) // (2**2)],
    [(10**9) // (2**0), (10**4 - 5) // (2**1)]
]
final = {
    "cases":[]
}
for r in k:
    target = randint(-r[0], r[0])
    print("target:", target)
    nums = []
    while(True):
        t = randint(-r[0], r[0])
        nums.append(t)
        if any(a+t==target for a in nums):
            break
        if len(nums) >= r[1]:
            nums.insert(randint(0, len(nums)-1), target-nums[randint(0, len(nums)-1)])
            break
    def _eval():
        for i in range(1, len(nums)):
            for j in range(i):
                if(nums[i]+nums[j] == target): return [i, j, nums[i], nums[j]]
    print(_eval(), target)
    final["cases"].append([nums, target])
with open("a.json", "w") as f:
    json.dump(final, f)