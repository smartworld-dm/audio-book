from db import api
from db import headers
from db import users
import requests

def check_user_exists(email):
    response = request_curl(api["url"]+"/action/find", {
        "collection": users["collection"],
        "database": users["database"],
        "dataSource": users["dataSource"],
        "filter": {
            "email": email
        }
    }, headers)
    
    if response_status(response.status_code):
        data = response.json()
        documents = data.get('documents')
        
        if len(documents) == 0:
            return False
        else:
            return True
    else:
        return True
    
def check_user_auth(email, pwdHex):
    response = request_curl(api["url"]+"/action/find", {
        "collection": users["collection"],
        "database": users["database"],
        "dataSource": users["dataSource"],
        "filter": {
            "email": email,
            "password": pwdHex.hexdigest()
        }
    }, headers)
    print(response.text)
    if response_status(response.status_code):
        data = response.json()
        documents = data.get('documents')
        
        if len(documents) == 0:
            return False
        else:
            return True
    else:
        return False
    
    
def register(email, pwdHex):
    if check_user_exists(email):
        return {"success": False, "message": "User already exists"}
    
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

def login(email, pwdHex):
    
    if check_user_auth(email, pwdHex) == False:
        return {"success": False, "message": "Invalid user information"}
    
    return {"success": True, "message": "Logged in successfully"}
    

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