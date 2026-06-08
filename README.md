Despliegue Local

Requisitos Node.js v18+ PostgreSQL NPM

Clonar repositorio bash git clone https://github.com/tuusuario/tu-repo.git cd tu-repo

Configurar base de datos

sql CREATE DATABASE appdb;

CREATE TABLE users ( id SERIAL PRIMARY KEY, username VARCHAR(50) NOT NULL, email VARCHAR(100) UNIQUE NOT NULL, password_hash VARCHAR(255) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP );

CREATE TABLE products ( id SERIAL PRIMARY KEY, name VARCHAR(100) NOT NULL, price NUMERIC(10,2) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP );

Editar db.js con tus credenciales de PostgreSQL.

Instalar dependencias bash npm install

Levantar backend bash cd backend node server.js

Levantar frontend bash cd frontend npm start

Accede a: http://localhost:3000

Despliegue en Google Kubernetes Engine (GKE)

Requisitos Cuenta en Google Cloud Google Cloud SDK (gcloud) Plugin gke-gcloud-auth-plugin Docker

Configurar entorno bash gcloud auth login gcloud config set project <ID_DEL_PROYECTO>

Crear clúster bash gcloud container clusters create erivan-cluster
--num-nodes=2
--zone=us-central1-a

Conectar kubectl bash gcloud container clusters get-credentials erivan-cluster --zone us-central1-a kubectl get nodes

Construir y subir imágenes bash docker build -t erivanusuario/backend:latest ./backend docker build -t erivanusuario/frontend:latest ./frontend

docker push erivanusuario/backend:latest docker push erivanusuario/frontend:latest

Aplicar manifiestos YAML En carpeta k8s/: bash kubectl apply -f backend-deployment.yaml kubectl apply -f backend-service.yaml kubectl apply -f frontend-deployment.yaml kubectl apply -f frontend-service.yaml

Obtener IP pública bash kubectl get svc
