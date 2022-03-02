import os

assets = os.path.dirname(__file__)

compressing = ["css", "js"]

for _type in compressing:
    for root, folders, files in os.walk(os.path.join(assets, _type)):
        for file in files:
            with open(os.path.join(root, file), "r") as f:
                content = []
                for line in f.readlines():
                    if not "//" in line: content.append(line)
                content = "".join(content)
            content = content.replace("  ", "").replace("\n", "")
            with open(os.path.join(root, file), "w") as f:
                f.write(content)

