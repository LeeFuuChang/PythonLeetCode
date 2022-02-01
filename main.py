from flask import Flask, render_template, request
import time
app = Flask(__name__)

def oka():
    return render_template("test.html")
def ok():
    time.sleep(60)
    return "ok"

    a = request.form
    print(a)
    n1, n2 = 10, 30
    try:
        resultVar = {}
        exec(a["code"], resultVar)
        return str(resultVar["Solution"]().add(n1, n2) == n1+n2)
    except Exception as e:
        return str(e)

app.route("/a", methods=["GET", "POST"])(ok)
app.route("/", methods=["GET", "POST"])(oka)

app.run()