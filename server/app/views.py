from app import app, api
from flask import jsonify
from flask import request
import json



@app.route('/process', methods=['POST'])
def process_data():
	data = request.form["data"].split()

	return (jsonify({"category":data[:-1][0],"amount":data[-1][1:],"currency":data[-1][0]}), 202)



@app.route("/save",methods=['POST'])
def save_date():
	data = request.form
	print(data)

	print(app.__db)
	app.__db.append((data["user"],data["category"],data["amount"],data["currency"]))
	return (jsonify(data), 200)


@app.route('/get', methods=['GET'])
def get_data():
	print(app.__db)
	user = request.args.get('user')
	data = json.dumps([x for x in app.__db if x[0]==user])
	response = app.response_class( \
		response=data, \
		status=200, \
		mimetype='application/json' \
	)
	return response
