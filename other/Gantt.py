import matplotlib.pyplot as plt
import json
import os

data_path = os.path.join(os.path.dirname(__file__), "progress.json")
with open(data_path, "r") as f:
    data = json.load(f)

def Convert_time(s):
    s = [int(_) for _ in s.split("/")]
    s = s[0]*12*30 + s[1]*30 + s[2]
    return s



datas = [ [d[0], d[1]] for d in data.values() ]

starts, ends = list(zip(*datas))

labels = list(data.keys())
starts = [Convert_time(s) for s in starts]
ends = [Convert_time(s)+1 for s in ends]

time_min = min(starts)
time_sft = [t-time_min for t in starts]
time_len = [t[1]-t[0] for t in zip(starts, ends)]

mixed = list(zip(labels, time_len, time_sft, ends))
mixed.sort(key=lambda l:l[3], reverse=True)

labels = [ l[0] for l in mixed ]
time_len = [ l[1] for l in mixed ]
time_sft = [ l[2] for l in mixed ]

fig, ax = plt.subplots(1, figsize=(16,6))
ax.barh(labels, time_len, left=time_sft)
plt.show()