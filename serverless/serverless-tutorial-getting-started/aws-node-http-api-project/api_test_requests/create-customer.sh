#!/bin/sh
curl -X 'POST' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{"name": "customer1","email": "customer1@example.com"}' \
   https://vb8va5j018.execute-api.us-east-1.amazonaws.com/customers | json_pp
