# Etapa 1: Construcción
FROM node:18 AS build

WORKDIR /app

# Copiamos dependencias
COPY package*.json ./
RUN npm install

# Copiamos el resto del código
COPY . .

# Construimos la aplicación
RUN npm run build

# Etapa 2: Servir con Nginx
FROM nginx:alpine

# Copiamos el build al directorio que Nginx sirve
COPY --from=build /app/build /usr/share/nginx/html

# Exponemos el puerto
EXPOSE 80

# Nginx arranca automáticamente con la imagen base

# Imagen base de Nginx
FROM nginx:1.25-alpine

# Copiar archivos del build del frontend
COPY build/ /usr/share/nginx/html

# Copiar configuración personalizada de Nginx
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Exponer puerto 80
EXPOSE 80

# Comando de inicio
CMD ["nginx", "-g", "daemon off;"]

