# Utilizar una imagen de Node.js
FROM node:14

# Crear el directorio de la aplicación en el contenedor
WORKDIR /usr/src/app

# Copiar los archivos del paquete
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos de la aplicación
COPY . .

# Exponer el puerto en el que se ejecutará la aplicación
EXPOSE 3000

# Definir el comando para ejecutar la aplicación
CMD [ "node", "api.js" ]
