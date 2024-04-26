from flask import Flask, request, jsonify
from flask_bcrypt import Bcrypt
from flask_cors import CORS 
import mysql.connector
import pdfplumber
import traceback  
import base64
import pandas as pd
import csv
app = Flask(__name__)
bcrypt = Bcrypt(app)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

db_config = {
    'user': 'root',
    'password': 'rahim123456',
    'database': 'PFE'
}

conn = mysql.connector.connect(**db_config)
def execute_query(query, params=None, fetch_results=False):
    cursor = conn.cursor()
    try:
        if params:
            cursor.execute(query, params)
        else:
            cursor.execute(query)

        if fetch_results:
            return cursor.fetchall()
        else:
            conn.commit()
            return None
    except Exception as e:
        conn.rollback()
        print(f"Error executing query: {str(e)}")
        return None
    finally:
        cursor.close()
@app.route('/')
def home():
    return 'Home Page'


@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM user WHERE email = %s", (email,))
    user = cursor.fetchone()
    print(user[2], password)
    if user:
        if bcrypt.check_password_hash(user[2], password):
            return jsonify({'data': {'id': user[0], 'name': user[1], 'email': user[3],"password":password}}), 200
        else:
            return jsonify({'message': 'Invalid email or password'}), 401
    else:
        return jsonify({'message': 'User not found'}), 404




@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')
    print(data)
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    query = "SELECT email FROM user WHERE email=%s"
    existing_email = execute_query(query, (email,), fetch_results=True)

    if existing_email:
        return jsonify({'message': 'Registration failed. Email already exists.'}), 400
    else:
        query = "INSERT INTO user (name, password, email) VALUES (%s, %s, %s)"
        execute_query(query, (username, hashed_password, email))
        return jsonify({'message': 'Registration successful. You can now log in'}), 201

@app.route('/api/GetAllUsers', methods=['GET'])
def get_all_users():
    try:
        query = "SELECT * FROM USERS WHERE checkC = 1"
        result = execute_query(query, fetch_results=True)

        if result:
            users = [
                {
                    'id': user[0],
                    'username': user[1],
                    'email': user[4],
                }
                for user in result
            ]
            return jsonify({'users': users}), 200
        else:
            return jsonify({'users': []}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/events', methods=['GET'])
def get_events():
    try:
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM Events")
        events = cursor.fetchall()
        return jsonify({'events': events}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/events', methods=['POST'])
def add_event():
    try:
        data = request.get_json()
        userId = data.get('userId')
        title = data.get('title')
        startDate = data.get('startDate')
        endDate = data.get('endDate')
        print(data)
        cursor = conn.cursor()
        cursor.execute("INSERT INTO Events (userId, title, startDate, endDate) VALUES (%s, %s, %s, %s)",
                       ('1', title, startDate, endDate))
        conn.commit()

        return jsonify({'message': 'Event added successfully'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500
@app.route('/api/upload-pdf', methods=['POST'])
def upload_pdf():
    try:
        # Get the uploaded file
        file = request.files['file']

        # Read the file content
        content = file.read()

        # Save the file in the database
        cursor = conn.cursor()
        cursor.execute("INSERT INTO pdf_lessons (name, content) VALUES (%s, %s)", (file.filename, content))
        conn.commit()

        return jsonify({'message': 'PDF uploaded successfully'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/get-pdf-lessons', methods=['GET'])
def get_pdf_lessons():
    try:
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM pdf_lessons")
        pdf_lessons = cursor.fetchall()
        pdf_lessons_serializable = [
            {'id': lesson['id'], 'name': lesson['name'], 'content': base64.b64encode(lesson['content']).decode('utf-8')}
            for lesson in pdf_lessons
        ]

        return jsonify({'pdfLessons': pdf_lessons_serializable}), 200
    except Exception as e:
        error_message = str(e)
        print(f"An error occurred while fetching PDF lessons: {error_message}")
        traceback.print_exc()  # Print the full traceback
        return jsonify({'error': error_message}), 500            

@app.route('/api/upload-csv', methods=['POST'])
def upload_csv():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'})

        file = request.files['file']

        if file.filename == '':
            return jsonify({'error': 'No selected file'})
        
        cursor = conn.cursor()

        if file:
            # Read the uploaded Excel file into a DataFrame
            df = pd.read_excel(file)

            # Remove extra spaces and double quotes from column names
            df.columns = df.columns.str.strip().str.replace('"', '')

            # Iterate over each row in the DataFrame
            for index, row in df.iterrows():
                print(row)
                # Extract data from the row
                last_name = row["Last name"]
                first_name = row['First name']
                ssn = row['SSN']
                test1 = row['Test1']
                test2 = row['Test2']
                test3 = row['Test3']
                test4 = row['Test4']
                final = row['Final']
                grade = row['Grade']

                # Insert data into the database
                cursor.execute('''INSERT INTO Notes (last_name, first_name, ssn, test1, test2, test3, test4, final, grade)
                                  VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)''',
                               (last_name, first_name, ssn, test1, test2, test3, test4, final, grade))

            conn.commit()  

            return jsonify({'message': 'Excel file uploaded successfully'})
    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/api/fillieres', methods=['GET'])
def get_fillieres():
    try:
        query = "SELECT DISTINCT filliere_name FROM filliere"
        fillieres = execute_query(query, fetch_results=True)
        filliere_list = [filliere[0] for filliere in fillieres]
        return jsonify({'fillieres': filliere_list}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/classes', methods=['GET'])
def get_classes():
    try:
        filliere = request.args.get('filliere')
        query = "SELECT class_name FROM class WHERE filliere_name = %s"
        classes = execute_query(query, (filliere,), fetch_results=True)
        class_list = [cls[0] for cls in classes]
        return jsonify({'classes': class_list}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)
