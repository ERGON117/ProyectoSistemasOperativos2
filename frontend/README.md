Despliegue Local

Requisitos
Node.js v18+
PostgreSQL
NPM

1. Clonar repositorio
bash
git clone https://github.com/tuusuario/tu-repo.git
cd tu-repo

2. Configurar base de datos

sql
CREATE DATABASE appdb;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

Editar db.js con tus credenciales de PostgreSQL.

3. Instalar dependencias
bash
npm install

4. Levantar backend
bash
cd backend
node server.js

5. Levantar frontend
bash
cd frontend
npm start

Accede a: http://localhost:3000


Despliegue en Google Kubernetes Engine (GKE)

Requisitos
Cuenta en Google Cloud
Google Cloud SDK (gcloud)
Plugin gke-gcloud-auth-plugin
Docker

1. Configurar entorno
bash
gcloud auth login
gcloud config set project <ID_DEL_PROYECTO>

2. Crear clúster
bash
gcloud container clusters create erivan-cluster \
  --num-nodes=2 \
  --zone=us-central1-a

3. Conectar kubectl
bash
gcloud container clusters get-credentials erivan-cluster --zone us-central1-a
kubectl get nodes

4. Construir y subir imágenes
bash
docker build -t erivanusuario/backend:latest ./backend
docker build -t erivanusuario/frontend:latest ./frontend

docker push erivanusuario/backend:latest
docker push erivanusuario/frontend:latest

5. Aplicar manifiestos YAML
En carpeta k8s/:
bash
kubectl apply -f backend-deployment.yaml
kubectl apply -f backend-service.yaml
kubectl apply -f frontend-deployment.yaml
kubectl apply -f frontend-service.yaml

6. Obtener IP pública
bash
kubectl get svc
