# frontend/Dockerfile
# 1. Usa una imagen base de Node.js
FROM node:18

# 2. Crea un directorio de trabajo
WORKDIR /app

# 3. Copia el archivo de dependencias y las instala
COPY package.json package-lock.json ./
RUN npm install

# 4. Copia el resto del código fuente
COPY . .

# 5. Expone el puerto
EXPOSE 3000

# 6. Ejecuta Next.js en modo desarrollo
CMD ["npm", "run", "dev"]
