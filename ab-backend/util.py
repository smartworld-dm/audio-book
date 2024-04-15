import requests

def request_curl(url, data, headers):
    response = requests.post(url, json=data, headers=headers)
    return response

def response_status(status_code):
    if status_code >= 200 and status_code < 300:
        return True
    
    return False