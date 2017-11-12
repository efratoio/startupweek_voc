#!/bin/sh

curl --data "user=test&category=insurance&amount=12&currency=$" http://localhost:5000/save
curl --data "user=test&category=coffee&amount=3.45&currency=$" http://localhost:5000/save
curl --data "user=test&category=coffee&amount=4&currency=$" http://localhost:5000/save
curl --data "user=test&category=clothes&amount=125&currency=$" http://localhost:5000/save
