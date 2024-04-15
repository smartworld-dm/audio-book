from flask import Flask
from flask import request
from flask_cors import CORS
import hashlib
import user
import elevenlab
import book

app = Flask(__name__)

# CORS(app)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.route("/")
def index():
    return "<p>This is CommuneAi Audio Book Flask Server!</p>"

@app.route("/api/login", methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    pwdHex = hashlib.md5(password.encode())
    return user.login(email, pwdHex)

@app.route("/api/register", methods=['POST'])
def register():
    try:
        data = request.json
        email = data.get('email')
        password = data.get('password')
        pwdHex = hashlib.md5(password.encode())
        
        return user.register(email, pwdHex)
            
    except Exception as e:
        return {"success": False, "message": f'API error {str(e)}'}

@app.route("/api/voices", methods=['GET'])
def voices():
    voices = elevenlab.getVoices()
    return {"success": True, "voices": voices}

@app.route("/api/create_book", methods=['POST'])
def create_book():
    try:
        return book.create_book()
    except Exception as e:
        return {"success": False, "message": f'API error {str(e)}'}