import shutil
import os

assets = os.path.join(os.path.dirname(__file__), "website", "static", "assets")
template = os.path.join(os.path.dirname(__file__), "website", "templates", "output.html")

if os.path.exists(assets):
    shutil.rmtree(assets)
if os.path.exists(template):
    os.remove(template)

shutil.copytree(
    os.path.join(os.path.dirname(__file__), "assets"), 
    assets
)

os.system("python .\makeTemplate.py .\questionTemplate.html")

shutil.move(
    os.path.join(os.path.dirname(__file__), "output.html"), 
    template
)

import main
