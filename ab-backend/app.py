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
        data = request.json
        email = data.get('email')
        return book.create_book(email)
    except Exception as e:
        return {"success": False, "message": f'API error {str(e)}'}
    
@app.route("/api/save_book", methods=['POST'])
def save_book():
    try:
        data = request.json
        _id = data.get("id")
        title = data.get("title")
        email = data.get('email')
        sections = data.get('sections')
        characters = data.get('characters')
        return book.save_book(_id, title, email, sections, characters)
    except Exception as e:
        return {"success": False, "message": f'API error {str(e)}'}
    
@app.route("/api/books", methods=['GET'])
def get_books():
    try:
        user_email = request.args.get('user')
        return book.get_books(user_email)
    except Exception as e:
        return {"success": False, "message": f'API error {str(e)}'}
    
@app.route("/api/book", methods=['GET'])
def get_book():
    try:
        user_email = request.args.get('user')
        _id = request.args.get('id');
        return book.get_book(_id, user_email)
    except Exception as e:
        return {"success": False, "message": f'API error {str(e)}'}