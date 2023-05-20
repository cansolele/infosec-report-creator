from flask import Flask, request, send_file
from flask_cors import CORS as flask_cors
import subprocess
import os
from cve_list import cve_list_routes
from exploits_list import exploits_list_routes

app = Flask(__name__)
flask_cors(app)

os.makedirs(os.path.join(os.path.dirname(__file__), "uploads"), exist_ok=True)
os.makedirs(os.path.join(os.path.dirname(__file__), "output", "cve_list"), exist_ok=True)
os.makedirs(os.path.join(os.path.dirname(__file__), "output", "exploits_list"), exist_ok=True)

app.register_blueprint(cve_list_routes)
app.register_blueprint(exploits_list_routes)

@app.route("/download/<filename>", methods=["GET"])
def download_file(filename):
    output_dir = os.path.join(os.path.dirname(__file__), "output")

    if filename == "CveList":
        output_file = os.path.join(output_dir, "cve_list", "CveList.txt")
    elif filename == "ExploitsList":
        output_file = os.path.join(output_dir, "exploits_list", "ExploitsList.txt")
    else:
        return "Invalid filename", 400

    if not os.path.exists(output_file):
        return "File not found", 404

    return send_file(output_file, as_attachment=True)

if __name__ == "__main__":
    app.run(host="0.0.0.0")
