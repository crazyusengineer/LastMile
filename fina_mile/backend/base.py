import hashlib
import random
import json

import psycopg2
from flask import Flask, request, jsonify, abort, render_template
from flask_cors import CORS

from route import Graph, init_cost_arr, combine_arr, generate_blocks, get_availability, generate_edges

# db = SQLAlchemy(Flask(__name__))
#
# class User(db.Model):
#
#
app = Flask(__name__)
ROW = 10
COL = 10
conn = psycopg2.connect(host='localhost',
                        database='fina_mile',
                        user="postgres",
                        password="admin")

cors = CORS(app, resources={r"/*": {"origins": "*"}})

def get_md5(s):
    md = hashlib.md5()
    md.update(s.encode('utf-8'))
    return md.hexdigest()


# conn =


# @api.route('/profile')
# def my_profile():
#     response_body = {
#         "name": "Zhuo Wang",
#         "about": "Hello! I'm a full stack developer that loves python and javascript"
#     }
#
#     return response_body

@app.route('/', methods=['GET', 'POST'])
def index():
    cursor = conn.cursor()
    query = "SELECT * FROM users"
    cursor.execute(query)
    data = cursor.fetchall()
    return data

# @app.route('/sign_up')
# def register():
#     return render_template('sign_up.html')


def login():
    # email = request.form['email']
    # username = request.form['username']
    # password = request.form['pwd']
    # password = hashlib.md5(request.form['pwd'].esncode()).hexdigest()
    username = "xijinping"
    password = "xijinpingwansui"
    # TODO: MD5 Function
    # password = get_md5(password)
    #

    cursor = conn.cursor()
    # executes query
    query = "SELECT * FROM users WHERE username = '{}' and pwd = '{}'"
    query = 'SELECT * FROM user WHERE email = %s and password = %s'
    cursor.execute(query.format(username, password))
    data = cursor.fetchone()
    # use fetchall() if you are expecting more than 1 data row
    cursor.close()
    error = None
    if data:
        # creates a session for the the user
        # session is a built in
        # TODO: Session
        # session.permanent = False
        # session['username'] = username
        return jsonify(data=data)
    else:
        # returns an error message to the html page
        error = 'Invalid login or username'
        abort(403)


# Authenticates the register
@app.route('/registerAuth', methods=['GET', 'POST'])
def registerAuth():
    #grabs information from the forms
    email = request.form['email']
    name = request.form['name']
    password = hashlib.md5(request.form['pwd'].encode()).hexdigest()
    building_number = request.form['building_number']
    street = request.form['street']
    city = request.form['city']
    state = request.form['state']
    
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
        cursor.execute(ins, (email, name, password, building_number, street, city, state))
        conn.commit() 
        cursor.close()
        return render_template('register.html', regPass = True)


# @api.route('/route')
# def get_route(params_json):
#     params = json.JSONDecoder()
#     return params

# this api asked the user input and returns back a jsonify string with {"cost":int,"route":list}
@app.route('/profile', methods=['POST', 'GET'])
def cost_and_route():
    # print(request.data.priority)
    print(json.loads(request.data))
    preference = json.loads(request.data)['priority']
    if not (preference == 0 or preference == 1):
        abort(400)
    else:
        # we assume to be a square first
        # row = random.randint(1, 15)
        BLOCK_NUM = 5
        # column = row
        # 0 means time first
        # 1 means cost first
        m_arr, t_arr = init_cost_arr(ROW, COL)
        c_arr = combine_arr(m_arr, t_arr)
        generate_blocks(BLOCK_NUM, c_arr)
        ttl_vertex, availability, block_lst = get_availability(c_arr, ROW, COL)
        graph = Graph(ROW * COL)
        generate_edges(availability, graph, c_arr, preference, ROW)
        length = graph.V
        start = random.randint(1, length)
        end = random.randint(1, length)
        route_cost = graph.BellmanFord(start, end)[0]
        route = graph.BellmanFord(start, end)[1]
        return jsonify(
            cost=str(route_cost),
            route=route,
            block=block_lst)
        # return('test-debug')

if __name__ == "__main__":
    app.run(host="127.0.0.1", debug=True)
