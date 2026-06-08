#!/bin/bash

# Variables de proyecto
PROJECT_ID="erivan-proyectofinal"
FRONTEND_IMAGE="gcr.io/$PROJECT_ID/frontend:latest"
BACKEND_IMAGE="gcr.io/$PROJECT_ID/backend:latest"

echo "Construyendo y desplegando imágenes..."

# Frontend
echo "Actualizando frontend..."
docker build -t $FRONTEND_IMAGE ./frontend
docker push $FRONTEND_IMAGE
kubectl set image deployment/frontend-deployment frontend=$FRONTEND_IMAGE
kubectl rollout restart deployment frontend-deployment

# Backend
echo "Actualizando backend..."
docker build -t $BACKEND_IMAGE ./backend
docker push $BACKEND_IMAGE
kubectl set image deployment/backend-deployment backend=$BACKEND_IMAGE
kubectl rollout restart deployment backend-deployment

echo "Deploy completado. Verifica con: kubectl get pods"
