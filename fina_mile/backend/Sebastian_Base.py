import json

from flask import Flask, request, jsonify, abort


from route.py import Graph,init_cost_arr,combine_arr,generate_blocks,get_availability,generate_edges,

import random
# db = SQLAlchemy(Flask(__name__))
#
# class User(db.Model):
#
#

api = Flask(__name__)
@api.route('/profile')
def my_profile():
    response_body = {
        "name": "Zhuo Wang",
        "about": "Hello! I'm a full stack developer that loves python and javascript"
    }

    return response_body

@api.route('/login', methods=['POST'])
def new_user():
    username = request.json.get('username')
    password = request.json.get('password')
    if not username or not password:
        abort(400)
    return {"status": "success"}


# this api asked the user input and returns back a jsonify string with {"cost":int,"route":list}
@api.route('/route', methods=['POST'])
def cost_and_route():
    preference = request.json.get('priority')
    if not(preference==0 or preference==1):
        abort(400)
    else:
        # we assume to be a square first
        row=random.randint(1,15)
        BLOCK_NUM=5
        column=row
        # 0 means time first
        # 1 means cost first
        m_arr, t_arr = init_cost_arr(row, column)
        c_arr = combine_arr(m_arr, t_arr)
        generate_blocks(BLOCK_NUM, c_arr)
        ttl_vertex, availability = get_availability(c_arr, row, column)
        graph = Graph(ROW * COL)
        generate_edges(availability, graph, c_arr, preference, row)
        length=graph.V
        start=random.randint(1,len(length))
        end=random.randint(1,len(length))
        route_cost=graph.BellmanFord(start,end)[0]
        route=graph.BellmanFord(start,end)[1]  
        return jsonify(
        cost=route_cost,
        route=route)
        
        
        
        
                                  
    
    

# @api.route('/route')
# def get_route(params_json):
#     params = json.JSONDecoder()
#     return params
