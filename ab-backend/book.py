from db import api
from db import headers
from db import books
from util import request_curl
from util import response_status

def create_book(email):
    response = request_curl(api["url"]+"/action/insertOne", {
        "collection": books["collection"],
        "database": books["database"],
        "dataSource": books["dataSource"],
        "document": {
            "title": "Untitled",
            "email": email
        }
    }, headers)
    
    if response_status(response.status_code):
        data = response.json()
        insertedId = data.get('insertedId')
        return {"success": True, "message": "Created a book successfully", "data": insertedId}
    else:
        return {"success": False, "message": "MongoDB API error"}
    
def save_book(_id, title, email, sections):
    filter = {
        "_id": {"$oid": _id},
        "email": email
    }
    response = request_curl(api["url"]+"/action/updateOne", {
        "collection": books["collection"],
        "database": books["database"],
        "dataSource": books["dataSource"],
        "filter": filter,
        "update": {
            "$set": {
                "sections": sections,
                "title": title,
            }
        }
    }, headers)
    if response_status(response.status_code):
        data = response.json()
        return {"success": True, "message": "Updated the book successfully"}
    else:
        return {"success": False, "message": "MongoDB API error"}
    
def get_books(email):
    filter = {
        "email": email
    }
    projection = {
        "_id": 1,
        "title": 1
    }
    response = request_curl(api["url"]+"/action/find", {
        "collection": books["collection"],
        "database": books["database"],
        "dataSource": books["dataSource"],
        "filter": filter,
        "projection": projection
    }, headers)
    
    if response_status(response.status_code):
        data = response.json()
        return {"success": True, "message": "Get books successfully", "data": data}
    else:
        return {"success": False, "message": "MongoDB API error"}


def get_book(_id, email):
    filter = {
        "_id": {"$oid": _id},
        "email": email
    }
    response = request_curl(api["url"]+"/action/findOne", {
        "collection": books["collection"],
        "database": books["database"],
        "dataSource": books["dataSource"],
        "filter": filter,
    }, headers)
    if response_status(response.status_code):
        data = response.json()
        return {"success": True, "message": "Get this book successfully", "data": data["document"]}
    else:
        return {"success": False, "message": "MongoDB API error"}

