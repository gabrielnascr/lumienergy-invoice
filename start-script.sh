#!/bin/bash

echo "Starting Docker services in development mode..."
docker-compose -f docker-compose.yml up --build -d