import os
import psycopg2
from flask import Flask, render_template, request, session, url_for, redirect
import hashlib

app = Flask(__name__)

def get_db_connection():
    conn = psycopg2.connect(host='localhost',
                            database='finamile_db',
                            user="postgres",
                            password="admin")
    return conn


@app.route('/')
def index():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.close()
    conn.close()
    return render_template('index.html')


#Define route for login
@app.route('/login')
def login():
    return render_template('login.html')

#Define route for register
@app.route('/register')
def register():
    return render_template('register.html')

@app.route('/loginAuth', methods=['GET', 'POST'])
def loginAuth():
    conn = get_db_connection()
    #grabs information from the forms
    username = request.form['email']
    password = hashlib.md5(request.form['pw'].esncode()).hexdigest()

    #cursor used to send queries
    cursor = conn.cursor()
    #executes query
    query = 'SELECT * FROM user WHERE email = %s and password = %s'
    cursor.execute(query, (username, password))
    #stores the results in a variable
    data = cursor.fetchone()
    #use fetchall() if you are expecting more than 1 data row
    cursor.close()
    error = None
    if(data):
        #creates a session for the the user
        #session is a built in
        session['username'] = username
        return redirect(url_for('home'))
    else:
        #returns an error message to the html page
        error = 'Invalid login or email'
        return render_template('login.html', error=error)


#Authenticates the register
@app.route('/registerAuth', methods=['GET', 'POST'])
def registerAuth():
    #grabs information from the forms
    conn = get_db_connection()
    email = request.form['email']
    name = request.form['name']
    password = hashlib.md5(request.form['password'].encode()).hexdigest()
    building_number = request.form['building_number']
    street = request.form['street']
    city = request.form['city']
    state = request.form['state']
    phone_number = request.form['phone_number']
    
    #cursor used to send queries
    cursor = conn.cursor()
    #executes query
    query = 'SELECT * FROM user WHERE email = %s'
    cursor.execute(query, (email))
    #stores the results in a variable
    data = cursor.fetchone()
    #use fetchall() if you are expecting more than 1 data row
    error = None
    if(data):
        #If the previous query returns data, then user exists
        error = "This customer already exists"
        return render_template('register.html', error = error)
    else:
        ins = 'insert into customer values(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);'
        cursor.execute(ins, (email, name, password, building_number, street, city, state, phone_number))
        conn.commit() 
        cursor.close()
        return render_template('register.html', regPass = True)

#Add a user preference for a package
@app.route('/prefReq', methods=['GET', 'POST'])
def prefReq():
    conn = get_db_connection()
    #grabs information from the forms
    package_id = request.form['package_id']
    preference = request.form['preference']
    building_number = request.form['building_number']
    street = request.form['street']
    city = request.form['city']
    state = request.form['state']
    
    #cursor used to send queries
    cursor = conn.cursor()
    #executes query
   
    ins = 'insert into customer values(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);'
    cursor.execute(ins, (package_id, preference, building_number, street, city, state))
    conn.commit() 
    cursor.close()
    return render_template('register.html', regPass = True)

#Add a user preference for a package
@app.route('/packageHistory', methods=['GET', 'POST'])
def packageHistory():
    conn = get_db_connection()    
    #cursor used to send queries
    cursor = conn.cursor()
    #executes query
    query = 'SELECT * FROM package WHERE email = %s'
    cursor.execute(query, (email))
    #stores the results in a variable
    data = cursor.fetchone()
    #use fetchall() if you are expecting more than 1 data row
    cursor.close()
    error = None
    if(data):
        #creates a session for the the user
        #session is a built in
        session['username'] = username
        return redirect(url_for('history'))
    else:
        #returns an error message to the html page
        error = 'No package history found'
        return render_template('history.html', error=error)
