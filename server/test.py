import requests
from flask import jsonify

url = "http://127.0.0.1:5000/"

r = requests.post(url+"process", data={'user':'efrat','data': 'coffee 3$'})
d=r.json()
d["user"] = "efrat"
print(d)
r = requests.post(url+'save', data=d)

r = requests.get(url+"get?user=efrat")

print(r.text)
