import json, time

with open("problem_2.json", "r") as f:
    d = json.load(f)

def sol(l1, l2):
    n1, n2 = [str(_) for _ in l1[::-1]], [str(_) for _ in l2[::-1]]
    return [int(_) for _ in str(int("".join(n1)) + int("".join(n2)))[::-1]]

for case in d["cases"]:
    a = time.time()
    print(*case)
    print(sol(
[3, 4, 7, 4, 0, 9, 1, 1, 2, 6, 8, 0, 2, 7],
[7, 5, 5, 9, 4, 5, 0, 0, 7, 9, 2, 1, 5, 5]), time.time()-a)
    print("\n\n\n")