
# API REST de Productos Electrónicos 💻 🛍️

## Descripción

Esta API REST fue desarrollada con el stack **MERN** (enfocada en Backend) para gestionar un catálogo completo de productos electrónicos. El proyecto permite realizar operaciones CRUD, búsquedas inteligentes por nombre y filtrados avanzados por categorías y rangos de precio, integrando una base de datos **MongoDB Atlas** y documentación profesional con **Swagger**.

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución.
- **Express.js**: Framework para la creación de la API.
- **MongoDB & Mongoose**: Base de datos NoSQL y modelado de datos.
- **Swagger (OpenAPI 3.0)**: Documentación interactiva de endpoints.
- **dotenv**: Gestión de variables de entorno.
- **Cors**: Configuración de acceso compartido.

## Instalación

### Requisitos Previos

- **Node.js** (versión 18 o superior).
- **npm** (instalado por defecto con Node).
- **Git** para el control de versiones.

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/FF-TRABAJO-INTEGRADOR-BACKEND.git
   cd FF-TRABAJO-INTEGRADOR-BACKEND
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   Crea un archivo `.env` en la raíz del proyecto basándote en `.env.development`:
   ```env
   PORT=3000
   MONGODB_URI=tu_cadena_de_conexion_a_mongodb_atlas
   ```

4. **Poblar la base de datos**
   Una vez que el servidor esté corriendo, utiliza el endpoint de carga masiva:
   `POST /api/productos/masivo`
   Esto leerá el archivo electrónico dentro de la carpeta `/data` e insertará los 30 productos automáticamente.

5. **Iniciar el servidor**
   ```bash
   # Para desarrollo (usando nodemon)
   npm run dev

   # Para producción
   npm start
   ```

## Estructura del Proyecto

Basada en una arquitectura limpia y escalable:

```text
/
├── config/          # Configuración de conexión a MongoDB
├── controllers/     # Lógica de manejo de peticiones (Request/Response)
├── data/            # Archivo electronicos.json con los datos iniciales
├── models/          # Definición de Schemas de Mongoose (Product)
├── routes/          # Definición de rutas y endpoints
├── services/        # Lógica de negocio y comunicación con la DB
├── tests/           # Scripts de prueba (api.http)
├── app.js           # Configuración de Express y Middlewares
├── index.js         # Punto de entrada y arranque del servidor
├── swagger.config.js # Configuración principal de Swagger
└── README.md        # Documentación del proyecto
```

## Endpoints de la API

### CRUD Básico

- **`GET /api/productos`**: Obtiene la lista completa de electrónicos.
- **`GET /api/productos/:codigo`**: Busca un producto por su código numérico de negocio.
- **`POST /api/productos`**: Crea un producto de forma manual enviando un JSON en el Body.
- **`PUT /api/productos/:codigo`**: Actualiza los datos de un producto existente.
- **`DELETE /api/productos/:codigo`**: Elimina un producto por su código.

### Endpoints Adicionales

- **`GET /api/productos/buscar?q=Samsung`**: Buscador por términos en el nombre del producto.
- **`GET /api/productos/categoria/:nombre`**: Filtra productos por categoría (ej: Celulares).
- **`GET /api/productos/precio/:min-:max`**: Filtra por rango de precio (ej: `/precio/100-500`).
- **`POST /api/productos/masivo`**: Pobla la base de datos con los 30 productos electrónicos iniciales.

## Documentación con Swagger

La documentación interactiva está disponible en:

- **Local**: `http://localhost:3000/api-docs`
- **Producción**: [https://ff-trabajo-integrador-backend-production.up.railway.app/api-docs](https://ff-trabajo-integrador-backend-production.up.railway.app/api-docs)

## URL de Producción

🌐 **API en Producción**: [https://ff-trabajo-integrador-backend-production.up.railway.app/api](https://ff-trabajo-integrador-backend-production.up.railway.app/api)

## Decisiones de Diseño

- **Arquitectura en Capas**: Se separó la lógica en `Controllers`, `Services` y `Routes` para facilitar el testing y mantenimiento.
- **Identificador de Negocio**: Se utiliza el campo `codigo` (numérico) para las búsquedas del cliente, manteniendo el `_id` de MongoDB para integridad referencial interna.
- **Carga Masiva**: Se implementó un endpoint robusto para inicializar el catálogo de 30 productos rápidamente en cualquier entorno.

## Autor

- **Daniela Romero** - Web & App Developer - [GitHub](https://github.com/tu-usuario)

---



