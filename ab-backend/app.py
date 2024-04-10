from flask import Flask
from flask import request
import requests
import hashlib

from db import api
from db import headers
from db import users

app = Flask(__name__)

@app.route("/")
def index():
    return "<p>This is CommuneAi Audio Book Flask Server!</p>"

@app.route("/api/login", methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    # Add your login logic here

    return {"message": "Login function generated successfully"}

@app.route("/api/register", methods=['POST'])
def register():
    try:
        data = request.form
        email = data.get('email')
        password = data.get('password')
        pwdHex = hashlib.md5(password.encode())
        response = request_curl(api["url"]+"/action/insertOne", {
            "collection": users["collection"],
            "database": users["database"],
            "dataSource": users["dataSource"],
            "document": {
                "email": email,
                "password": pwdHex.hexdigest()
            }
        }, headers)
        
        if response_status(response.status_code):
            return {"success": True, "message": "Registered successfully"}
        else:
            return {"success": False, "message": "MongoDB API error"}
    except:
        return {"success": False, "message": "API error"}

def request_curl(url, data, headers):
    print(url)
    print(data)
    print(headers)
    response = requests.post(url, json=data, headers=headers)
    return response

def response_status(status_code):
    if status_code >= 200 and status_code < 300:
        return True
    
    return False