import json

from flask import Flask, request, jsonify, abort

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

# @api.route('/route')
# def get_route(params_json):
#     params = json.JSONDecoder()
#     return params