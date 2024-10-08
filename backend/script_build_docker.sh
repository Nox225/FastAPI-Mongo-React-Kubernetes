#!/bin/bash

docker build -t localhost:5000/fastapi-backend:0.1 .

docker push localhost:5000/fastapi-backend:0.1
