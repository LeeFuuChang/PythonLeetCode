import codecs, os

lang = "TW"

constant_html_path = os.path.join(os.path.dirname(__file__), "templates", "constant_html")
with codecs.open(os.path.join(constant_html_path, f"__header_{lang}.html"), "r", "utf-8") as f:
    HTMLconstantHeader = f.read()
with codecs.open(os.path.join(constant_html_path, f"__float_{lang}.html"), "r", "utf-8") as f:
    HTMLconstantFloat = f.read()
