<div align="center">
  <img src="https://github.com/raulrod16124/restaurant-project/blob/main/frontend/src/assets/tinyLogo.png" alt="restaurante logo" style="width: 150px;"/>
  <h1>Restaurant Project</h1>
</div>

Este es el repositorio del proyecto **Restaurant Project**, una aplicación para la gestión y visualización de menús y mesas en un restaurante. El proyecto consta de dos partes:

- **API Backend**: Construida con Node.js, GraphQL y Docker.
- **Frontend**: Desarrollado con Next.js, React y Typescript.

## Stack Tecnológico

### API Backend

- **Node.js**: Plataforma de servidor en JavaScript.
- **GraphQL**: Para manejar las solicitudes y respuestas de datos.
- **Docker**: Para crear un entorno de desarrollo y despliegue consistente y portátil.

### Frontend

- **Next.js**: Framework para el desarrollo de aplicaciones React con soporte para SSR (Server-Side Rendering) y optimización de recursos.
- **React**: Librería de JavaScript para la construcción de interfaces de usuario.
- **Axios**: Cliente HTTP para realizar peticiones a la API.
- **Jest** y **Testing Library**: Para pruebas unitarias.
- **TypeScript**: Para mejorar la tipificación y robustez del código.

## Requisitos Previos

Asegúrate de tener instalado:

- **Node.js** (versión recomendada: >= 16)
- **Docker** y **Docker Compose**

## Estructura del Proyecto

```plaintext
.
├── api/                   # Código del backend
└── frontend/              # Código del frontend

```

## Configuración y Ejecución

1. **Clona el repositorio**:

```bash
git clone https://github.com/tu_usuario/restaurante-app.git
cd restaurante-app
```

2. **Configuración de la API (Backend)**

```bash
cd api/
```

Crea un archivo .env en la carpeta api con las siguientes variables de entorno:

```bash
DATABASE_URL=mongodb://restaurant_db:27017/restaurant
CLIENT_ENTRY_RATIO=5
CLIENT_TIMER=5000
WAITER_TIMER=5000
EATING_TIMER=5000
```

Construye y ejecuta la API en un contenedor Docker usando Docker Compose:

```bash
docker-compose up --build
```

La API estará disponible en http://localhost:4000

3. **Configuración del Frontend**

```bash
cd ../frontend
```

Instala las dependencias:

```bash
npm install
```

Crea un archivo .env en la carpeta frontend con las variable de entorno:

```bash
NEXT_PUBLIC_API_URL=http://restaurant_api:4000
```

Ejecuta el servidor de desarrollo de Next.js:

```bash
npm run dev
```

El frontend estará disponible en http://localhost:3000

También puedes ejecutar ambos proyectos ubicandote en la carpeta raíz del repositorio y ejecutando el script:

```bash
docker-compose up --build
```

El documento compose.yml se encargará de levantar tanto la API como el Frontend.

## Ejecución de Tests

Para ejecutar los tests dirigete a la carpeta frontend y ejecuta el siguiente comando:

```bash
npm run test
```
