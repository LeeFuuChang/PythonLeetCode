from flask import Blueprint

views = Blueprint("views", __name__)

@views.route("/problems/<int:problem_id>/<path:subpath>")
def p(problem_id, subpath):
    paths = subpath.split("/")
    print(problem_id, paths)
    return f"{subpath}"


