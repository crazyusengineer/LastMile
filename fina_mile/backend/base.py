import hashlib
import random
import json
import time

import psycopg2
from flask import Flask, request, jsonify, abort, render_template, session
from flask_cors import CORS

from route import Graph, init_cost_arr, combine_arr, generate_blocks, get_availability, generate_edges

# db = SQLAlchemy(Flask(__name__))
#
# class User(db.Model):
#
#
app = Flask(__name__)
app.config['CACHE_TYPE'] = 'null'
app.config['CORS_HEADERS'] = 'Content-Type'
app.config["SECRET_KEY"] = 'TPmi4aLWRbyVq8zu7hn6dWYW1'
ROW = 10
COL = 10
conn = psycopg2.connect(host='localhost',
                        database='fina_mile',
                        user="postgres",
                        password="admin")
if conn:
    print("Connection success")
cors = CORS(app, supports_credentials=True)

sign_in = False

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


@app.route('/loginAuth', methods=['POST', 'GET'])
def login():
    global sign_in
    sign_in = False
    request_data = json.loads(request.data)
    email = request_data["email"]
    password = request_data["password"]
    password = get_md5(password)
    # username = request_data["username"]
    # address = request_data["address"]
    print(email, password)
    cursor = conn.cursor()
    # executes query
    query = "SELECT * FROM users WHERE email = '{}' and pwd = '{}'"
    cursor.execute(query.format(email, password))
    data = cursor.fetchone()
    # use fetchall() if you are expecting more than 1 data row
    cursor.close()
    error = None
    if data:
        print("User Found!")
        print(data[0], data[1])
        print(jsonify(email=data[0], username=data[1]))
        sign_in = True
        # global sign_in
        if sign_in:
            print("YOU ARE SIGNING IN")
        return jsonify(email=data[0], username=data[1])
    else:
        # returns an error message to the html page
        error = 'Invalid login or username'
        print(error)
        abort(403)


# Authenticates the register
@app.route('/registerAuth', methods=['GET', 'POST'])
def registerAuth():
    global sign_in
    sign_in = False
    request_data = json.loads(request.data)
    print(request_data)
    email = request_data["email"]
    password = request_data["password"]
    password = get_md5(password)
    username = request_data["username"]
    building = request_data["building"]
    state = request_data["states"]
    street = request_data["street"]
    city = request_data["city"]

    # cursor used to send queries
    cursor = conn.cursor()
    # executes query
    query = "SELECT * FROM users WHERE email = '{}'"
    cursor.execute(query.format(email))
    # stores the results in a variable
    data = cursor.fetchone()
    # use fetchall() if you are expecting more than 1 data row
    error = None
    if data:
        # If the previous query returns data, then user exists
        error = "This customer already exists"
        print(error)
        abort(403)
    else:
        # userid = get_md5(email)[:15]
        ins = "insert into users values('{}', '{}', '{}', '{}', '{}', '{}', '{}');"
        cursor.execute(ins.format(email, username, password, building, street, city, state))
        conn.commit()
        cursor.close()
        sign_in = True
        return jsonify(email=email, username=username)


@app.route('/session', methods=['POST', 'GET'])
def check_session():
    time.sleep(1)
    print("When checking, sign_in is:", sign_in)
    if not sign_in:
        abort(500)
    else:
        print("SUCCESS")
        return jsonify(login=True)

# this api asked the user input and returns back a jsonify string with {"cost":int,"route":list}
@app.route('/mapper', methods=['POST', 'GET'])
def cost_and_route():
    # print(request.data.priority)
    print(json.loads(request.data))
    preference = json.loads(request.data)
    if not (preference == 0 or preference == 1):
        abort(400)
    else:
        # we assume to be a square first
        # row = random.randint(1, 15)
        BLOCK_NUM = 8
        m_arr, t_arr = init_cost_arr(ROW, COL)
        c_arr = combine_arr(m_arr, t_arr)
        generate_blocks(BLOCK_NUM, c_arr)
        ttl_vertex, availability, block_lst = get_availability(c_arr, ROW, COL)
        graph = Graph(ROW * COL)
        generate_edges(availability, graph, c_arr, preference, ROW)
        length = graph.V
        start = random.randint(0, length-1)
        end = random.randint(1, length)
        route_cost = graph.BellmanFord(start, end)[0]
        while route_cost == float("Inf") or end == start:
            end = random.randint(1, length)
            route_cost = graph.BellmanFord(start, end)[0]
        route = graph.BellmanFord(start, end)[1]
        # for i in range(len(route)):
        #     route[i] -= 1
        # for j in range(len(block_lst)):
        #     block_lst[j] -= 1
        print(route_cost, route, block_lst)
        return jsonify(
            cost=str(route_cost),
            route=route,
            block=block_lst)
        # return('test-debug')

@app.route('/logout')
def logout():
    global sign_in
    sign_in = False
    time.sleep(1)
    return

if __name__ == "__main__":
    app.run(host="127.0.0.1", debug=True)
