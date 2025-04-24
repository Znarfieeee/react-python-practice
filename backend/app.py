from flask import Flask, jsonify, request
from flask_cors import CORS
from dbhelper import *

app = Flask(__name__)
CORS(app)

@app.route('/users', methods=["GET"])
def get_users():
    users = getallprocess("SELECT * FROM users")
    return jsonify(to_json(users))

@app.route('/users', methods=['POST'])
def add_users():
    try:
        data = request.json
        
        name = data.get('name')
        email = data.get('email')
        hobby = data.get('hobby')
        
        success = addprocess('users', name = name, email = email, 
                    hobby = hobby)
        
        if success:
            return jsonify({'msg': 'Student added successfully!'}), 302
        return jsonify({'msg': 'Failed to add student', 'status': 'error'}), 400
        
    except Exception as e:
        return jsonify({'error': str(e), 'status':'error'}), 500

@app.route('/users/<int:id>', methods=['DELETE'])
def delete_user(id):
    try: 
        data = request.json
        
        id = data.get('id')
        success = deleteprocess('users', id = id)
        
        if success:
            return jsonify({'msg': 'Student deleted successfully!', 'status': 'success'}), 302
        return jsonify({'msg': 'Failed to delete student!', 'status': 'error'}), 400

    except Exception as e:
        return jsonify({'error': str(e), 'status':'error'}), 500

@app.route('/users/<int:id>', methods=['PATCH'])
def update_user(id):
    try:
        user = findprocess('users', id)
        if not user:
            return jsonify({'msg': 'User not found', 'status': 'error'}), 404
        
        data = request.json
        
        update_fields = {key: value for key, value in data.items() 
                         if key in ['name', 'email', 'hobby'] and value is not None}
        
        if not update_fields:
            return jsonify({'msg': 'No valid fields to update', 'status': 'error'}), 400
        
        success = updateprocess('users', id=id, **update_fields)
        
        if success:
            return jsonify({'msg': 'Student updated successfully!', 'status': 'success'}), 302
        return jsonify({'msg': 'Failed to update student', 'status': 'error'}), 400
    
    except Exception as e:
        return jsonify({'error': str(e), 'status':'error'}), 500

@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.json
        email = data.get('email')
        password = data.get('password')
        
        sql = f"SELECT * from accounts WHERE email = ? AND password = ?"
        result = getuser(sql, (email, password,))
        if result:
            return jsonify({'msg': 'Login successful!', 'status': 'success', 'user': result}), 200
        return jsonify({'msg': 'Invalid credentials', 'status': 'error'}), 401
        
    except Exception as e:
        return jsonify({'msg': 'Error Rendering the page!', 'status': 'error'}), 500

@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.json
        name = data.get('name')
        email = data.get('email')
        hobby = data.get('hobby')
        password = data.get('password')
        
        if not all([name, email, hobby,password]):
            return jsonify({'msg': 'Missing required fields', 'status': 'error'}), 400
        
        # Check if the user already exists
        existing_user = getuser("SELECT * FROM users WHERE email = ?", (email,))
        if existing_user:
            return jsonify({'msg': 'User already exists', 'status': 'error'}), 409
        
        # Add the new user to the database
        success = addprocess('accounts', name=name, email=email, hobby=hobby,password=password)
        if success:
            return jsonify({'msg': 'User registered successfully!', 'status': 'success'}), 201
        return jsonify({'msg': 'Failed to register user', 'status': 'error'}), 400
    
    except Exception as e:
        return jsonify({'error': str(e), 'status': 'error'}), 500

if __name__ == '__main__':
    app.run(debug = True)