# API REST de Productos Electrónicos 💻 🛍️

## 📝 Descripción
Esta API REST fue desarrollada con el stack **MERN** (enfocada en Backend) para gestionar un catálogo completo de productos electrónicos. El proyecto permite realizar operaciones CRUD, búsquedas inteligentes y filtrados avanzados, integrando una base de datos **MongoDB Atlas** y documentación profesional con **Swagger**.

---

## 🚀 Demo en Vivo
* 🌐 **API en Producción**: [https://ff-trabajo-integrador-backend-production.up.railway.app/api](https://ff-trabajo-integrador-backend-production.up.railway.app/api)
* 📖 **Documentación Interactiva (Swagger)**: [https://ff-trabajo-integrador-backend-production.up.railway.app/api-docs](https://ff-trabajo-integrador-backend-production.up.railway.app/api-docs)

---

## 🛠️ Tecnologías Utilizadas
<div align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js">
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
  <img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black" alt="Swagger">
  <img src="https://img.shields.io/badge/Railway-0B0D0E?style=for-the-badge&logo=railway&logoColor=white" alt="Railway">
</div>

---

## ⚙️ Configuración de Entornos y Conexión Dinámica
El proyecto implementa una lógica de conexión inteligente que detecta el entorno de ejecución automáticamente:

* **Desarrollo (`npm run dev`)**: Carga las variables desde `.env.development` para conectar a **MongoDB Atlas**.
* **Producción (`npm start`)**: Configurado para la **Red Interna de Railway**, optimizando la latencia mediante comunicación por DNS interno (`.internal`).



## 📥 Instalación y Uso Local

1. **Clonar e Instalar**
   ```bash
   git clone [https://github.com/tu-usuario/FF-TRABAJO-INTEGRADOR-BACKEND.git](https://github.com/tu-usuario/FF-TRABAJO-INTEGRADOR-BACKEND.git)
   cd FF-TRABAJO-INTEGRADOR-BACKEND
   npm install
   ```

2. **Ejecutar en Desarrollo**
   ```bash
   npm run dev
   ```
   *El servidor iniciará en: `http://localhost:3000`*

3. **Ejecutar en Produccion**
   ```bash
   npm start
   ```
   *El servidor iniciará en: `https://ff-trabajo-integrador-backend-production.up.railway.app/api/productos`*

4. **Poblar la Base de Datos**
   Para inicializar el catálogo de 30 productos, utiliza el endpoint masivo:
   `POST /api/productos/masivo`

---

## 📑 Endpoints Principales

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| **GET** | `/api/productos` | Obtiene el catálogo completo. |
| **GET** | `/api/productos/:codigo` | Búsqueda por código de producto. |
| **POST** | `/api/productos` | Creación manual de producto (JSON). |
| **PUT** | `/api/productos/:codigo` | Actualización de datos existentes. |
| **DELETE** | `/api/productos/:codigo` | Eliminación lógica/física de producto. |
| **POST** | `/api/productos/masivo` | **Carga automática de 30 productos.** |

> **Filtros Avanzados:**
> * `GET /api/productos/buscar?q=Nombre` -> Búsqueda por texto.
> * `GET /api/productos/categoria/:nombre` -> Filtrado por categoría.
> * `GET /api/productos/precio/:min-:max` -> Filtrado por rango de precio.

---

---

## 🏗️ Estructura del Proyecto

```plaintext
/
├── config/           # Conexión dinámica a DB (Atlas/Internal)
│   └── database.js
├── controllers/      # Lógica de peticiones y respuestas
│   ├── delete.js
│   ├── get_Categoria_Nombre.js
│   ├── get_Code.js
│   ├── get_Precio_max_min.js
│   ├── get_terminos.js
│   ├── post.js
│   ├── productControler.js
│   └── put.js
├── data/             # Archivo JSON fuente
│   └── electronicos.json
├── models/           # Schemas de Mongoose
│   └── product.js
├── routes/           # Definición de rutas Express
│   ├── index.js
│   └── productRoutes.js
├── index.js          # Punto de entrada y configuración de dotenv
└── swagger.config.js # Configuración de OpenAPI
```
---


## 👩‍💻 Autora
**Daniela Romero** - Web & App Developer  
* [GitHub](https://github.com/Dani9876570)

