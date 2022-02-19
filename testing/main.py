from flask import Flask, request
import os

app = Flask(__name__)
@app.route("/upload", methods=["GET", "POST"])
def upload():
    print(request.files.to_dict()["myFile"])
    request.files.to_dict()["myFile"].save(".\kind.png")
    return "OK";

app.run()