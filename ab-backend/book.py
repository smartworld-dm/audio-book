from db import api
from db import headers
from db import books
from util import request_curl
from util import response_status

def create_book():
    response = request_curl(api["url"]+"/action/insertOne", {
        "collection": books["collection"],
        "database": books["database"],
        "dataSource": books["dataSource"],
        "document": {
            "title": "Untitled"
            
        }
    }, headers)
    
    if response_status(response.status_code):
        data = response.json()
        insertedId = data.get('insertedId')
        return {"success": True, "message": "Created a book successfully", "data": insertedId}
    else:
        return {"success": False, "message": "MongoDB API error"}
    