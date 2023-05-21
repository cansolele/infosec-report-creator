from flask import Blueprint, request, send_file
import subprocess
import os

cve_list_routes = Blueprint("cve_list", __name__)


@cve_list_routes.route("/make-cve-list", methods=["POST"])
def make_cve_list():
    if "file" not in request.files:
        return "No file uploaded", 400

    file = request.files["file"]
    if file.filename == "":
        return "No file selected", 400

    filename = "CveList"
    file_path = os.path.join(os.path.dirname(__file__), "uploads", filename + ".pdf")
    file.save(file_path)

    output_file = os.path.join(
        os.path.dirname(__file__), "output", "cve_list", "CveList.txt"
    )

    extract_cve_command = f"pdfgrep 'CVE-[0-9]{{4}}-[0-9]{{4,7}}' '{file_path}' | sed -r 's/^.*(CVE-[0-9]{{4}}-[0-9]{{4,7}}).*$/\\1/g' | sort | uniq > '{output_file}'"
    subprocess.run(extract_cve_command, shell=True)

    download_link = request.host_url + f"download/{filename}"
    return {"downloadLink": download_link}
