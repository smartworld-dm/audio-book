from db import api
from db import headers
from db import users
from db import sessions
from util import request_curl
from util import response_status
import binascii
import os

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
    if response_status(response.status_code):
        data = response.json()
        documents = data.get('documents')
        
        if len(documents) == 0:
            return False
        else:
            return True
    else:
        return False
    
def generate_access_token(email):
    # Generate a secure random token
    token = binascii.hexlify(os.urandom(24)).decode()

    return token

def check_user_session(email):
    response = request_curl(api["url"]+"/action/find", {
        "collection": sessions["collection"],
        "database": sessions["database"],
        "dataSource": sessions["dataSource"],
        "filter": {
            "email": email,
        }
    }, headers)
    if response_status(response.status_code):
        data = response.json()
        documents = data.get('documents')
        token = generate_access_token(email)
        if len(documents) == 0:
            
            response = request_curl(api["url"]+"/action/insertOne", {
                "collection": sessions["collection"],
                "database": sessions["database"],
                "dataSource": sessions["dataSource"],
                "document": {
                    "email": email,
                    "access_token": token
                }
            }, headers)
            if response_status(response.status_code):
                return token
            else:
                return False
        else:
            filter = {
                "email": email
            }
            response = request_curl(api["url"]+"/action/updateOne", {
                "collection": sessions["collection"],
                "database": sessions["database"],
                "dataSource": sessions["dataSource"],
                "filter": filter,
                "update": {
                    "$set": {
                        "access_token": token
                    }
                }
            }, headers)
            if response_status(response.status_code):
                return token
            else:
                return False
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
        return {"success": False, "message": "Invalid user credentials"}
    
    token = check_user_session(email)
    print(token)
    
    return {"success": True, "message": "Logged in successfully", "token": token}