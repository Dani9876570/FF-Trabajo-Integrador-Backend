# [TÍTULO DEL PROYECTO] 🛍️

<!-- TODO: Reemplaza el título con el nombre de tu proyecto. Ejemplo: "API REST de Productos - Catálogo de Computación" -->

## Descripción

<!-- TODO: Escribe una descripción clara y concisa de qué hace tu API. 
Ejemplo: "API REST desarrollada con Express.js y MongoDB para gestionar un catálogo de productos de computación. 
Permite realizar operaciones CRUD completas y búsquedas avanzadas por categoría, precio y términos de búsqueda." -->

## Tecnologías Utilizadas

<!-- TODO: Lista todas las tecnologías, frameworks y librerías que utilizaste en el proyecto.
Ejemplo:
- Node.js
- Express.js
- MongoDB
- Mongoose
- Swagger/OpenAPI (swagger-ui-express, swagger-jsdoc)
- dotenv
- etc. -->

## Instalación

### Requisitos Previos

<!-- TODO: Lista los requisitos previos necesarios para ejecutar el proyecto.
Ejemplo:
- Node.js (versión 14 o superior)
- MongoDB (local o cuenta en MongoDB Atlas)
- npm o yarn
- Git -->

### Pasos de Instalación

<!-- TODO: Proporciona instrucciones paso a paso para instalar y ejecutar el proyecto localmente. -->

1. **Clonar el repositorio**
   ```bash
   git clone [URL_DE_TU_REPOSITORIO]
   cd [NOMBRE_DEL_DIRECTORIO]
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   
   <!-- TODO: Crea un archivo .env en la raíz del proyecto con las siguientes variables: -->
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/nombre_de_tu_base_de_datos
   # O si usas MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/nombre_bd
   ```

4. **Poblar la base de datos**
   
   <!-- TODO: Explica cómo poblar la base de datos con los datos iniciales.
   Ejemplo: "Ejecuta el script de población de datos..." o "Usa el endpoint POST /productos/masivo con el archivo JSON seleccionado" -->

5. **Iniciar el servidor**
   ```bash
   npm start
   # O para desarrollo con nodemon:
   npm run dev
   ```

   <!-- TODO: Asegúrate de que tu package.json tenga los scripts correctos configurados -->

## Estructura del Proyecto

<!-- TODO: Describe la estructura de tu proyecto y explica qué contiene cada directorio y archivo importante.
Ejemplo:
```
/
├── config/
│   └── database.js          # Configuración de conexión a MongoDB
├── controllers/
│   └── productController.js # Lógica de negocio y manejo de requests
├── data/
│   └── [archivo].json       # Archivo JSON seleccionado con los datos iniciales
├── models/
│   └── product.js           # Modelo de Mongoose para Producto
├── routes/
│   └── productRoutes.js     # Definición de rutas de la API
├── app.js                   # Configuración principal de Express
├── .env                     # Variables de entorno (NO subir a Git)
└── README.md                # Este archivo
``` -->

## Endpoints de la API

<!-- TODO: Lista todos los endpoints disponibles con una breve descripción y ejemplos de uso.
Puedes organizarlos por categorías (CRUD Básico y Endpoints Adicionales). -->

### CRUD Básico

#### `GET /productos`
<!-- TODO: Describe qué hace este endpoint -->
- **Descripción**: Obtiene la lista completa de productos
- **Ejemplo de respuesta**:
  ```json
  [
    {
      "codigo": 8101,
      "nombre": "Desktop Gaming",
      "precio": 999.99,
      "categoria": ["Computación", "Gaming"]
    }
  ]
  ```

#### `GET /productos/:codigo`
<!-- TODO: Describe qué hace este endpoint -->
- **Descripción**: Obtiene un producto específico por su código
- **Parámetros**: `codigo` (numérico)
- **Ejemplo**: `GET /productos/8101`

#### `POST /productos`
<!-- TODO: Describe qué hace este endpoint -->
- **Descripción**: Crea un nuevo producto
- **Body**: Objeto JSON con la estructura del producto
- **Ejemplo de body**:
  ```json
  {
    "codigo": 9999,
    "nombre": "Nuevo Producto",
    "precio": 199.99,
    "categoria": ["Categoría1", "Categoría2"]
  }
  ```

#### `PUT /productos/:codigo`
<!-- TODO: Describe qué hace este endpoint -->
- **Descripción**: Actualiza un producto existente
- **Parámetros**: `codigo` (numérico)
- **Body**: Objeto JSON con los campos a actualizar

#### `DELETE /productos/:codigo`
<!-- TODO: Describe qué hace este endpoint -->
- **Descripción**: Elimina un producto del catálogo
- **Parámetros**: `codigo` (numérico)

### Endpoints Adicionales

#### `GET /productos/buscar?q={termino}`
<!-- TODO: Describe qué hace este endpoint -->
- **Descripción**: Busca productos por término de búsqueda
- **Query Params**: `q` (string)
- **Ejemplo**: `GET /productos/buscar?q=notebook`

#### `GET /productos/categoria/:nombre`
<!-- TODO: Describe qué hace este endpoint -->
- **Descripción**: Filtra productos por categoría
- **Parámetros**: `nombre` (string)
- **Ejemplo**: `GET /productos/categoria/Hogar`

#### `GET /productos/precio/:min-:max`
<!-- TODO: Describe qué hace este endpoint -->
- **Descripción**: Filtra productos por rango de precios
- **Parámetros**: `min` y `max` (numéricos)
- **Ejemplo**: `GET /productos/precio/100-500`

#### `POST /productos/masivo`
<!-- TODO: Describe qué hace este endpoint -->
- **Descripción**: Crea múltiples productos en una sola solicitud
- **Body**: Array de objetos JSON con productos

## Documentación con Swagger

<!-- TODO: Proporciona el enlace o las instrucciones para acceder a la documentación interactiva de Swagger.
Si está desplegada en producción, incluye ambas URLs (local y producción). -->

La documentación completa e interactiva de la API está disponible en Swagger:

- **Local**: `http://localhost:3000/api-docs` (o el puerto que hayas configurado)
- **Producción**: [TU_URL_DE_PRODUCCION]/api-docs

<!-- TODO: Reemplaza [TU_URL_DE_PRODUCCION] con la URL real de tu API desplegada -->

## URL de Producción

<!-- TODO: Proporciona el enlace a la versión desplegada de tu API en Render o Railway -->

🌐 **API en Producción**: [TU_URL_DE_PRODUCCION]

<!-- TODO: Reemplaza [TU_URL_DE_PRODUCCION] con la URL real, por ejemplo:
- https://tu-api.onrender.com
- https://tu-api.up.railway.app
-->

## Variables de Entorno

<!-- TODO: Lista todas las variables de entorno necesarias con una descripción de cada una.
IMPORTANTE: NO incluyas valores reales por seguridad. -->

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `PORT` | Puerto en el que se ejecutará el servidor | `3000` |
| `MONGODB_URI` | Cadena de conexión a MongoDB | `mongodb://localhost:27017/nombre_bd` |

<!-- TODO: Agrega cualquier otra variable de entorno que uses en tu proyecto -->

## Archivo JSON Seleccionado

<!-- TODO: Indica qué archivo JSON del directorio /data elegiste para tu catálogo.
Ejemplo: "Se seleccionó el archivo computacion.json que contiene productos de computación y gaming." -->

## Decisiones de Diseño

<!-- TODO: Documenta cualquier decisión importante que hayas tomado durante el desarrollo.
Ejemplo:
- "Se decidió usar código numérico como identificador único en lugar de _id de MongoDB para mantener compatibilidad con los datos JSON proporcionados."
- "Se implementó validación personalizada para asegurar que el código sea único."
- "Se agregó middleware de manejo de errores para respuestas consistentes."
-->

## Autor/es

<!-- TODO: Agrega tu nombre y cualquier información de contacto que desees compartir (GitHub, email, etc.) -->

- **[Tu Nombre]** - [Tu GitHub](https://github.com/tu-usuario)

## Licencia

<!-- TODO: Si deseas incluir una licencia, especifícala aquí. Si no, puedes dejar este campo vacío o eliminarlo. -->

---

<!-- TODO: Puedes agregar cualquier información adicional que consideres relevante, como:
- Agradecimientos
- Próximas mejoras
- Problemas conocidos
- etc.
-->

