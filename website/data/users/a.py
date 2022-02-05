from io import StringIO
import pandas as pd

with open("users.csv", "r") as f:
    z = pd.read_csv(StringIO(f.read().replace(" ", "")))

print(z["username"])
print("leefuuchang" in z["username"])