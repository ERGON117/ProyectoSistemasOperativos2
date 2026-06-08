# Imagen base oficial de Node.js
FROM node:18

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos primero los archivos de dependencias
COPY package*.json ./

# Instalamos dependencias
RUN npm install

# Copiamos el resto del código (controllers, routes, index.js, etc.)
COPY . .

# Exponemos el puerto en el que corre tu backend
EXPOSE 3000

# Comando de inicio
CMD ["node", "index.js"]


