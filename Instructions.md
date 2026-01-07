# Trabajo Integrador: API REST de Productos 🛍️

¡Hola a todos!

Bienvenidos al trabajo integrador del curso de Backend. En esta oportunidad, dejaremos de lado los trailers para sumergirnos en un desafío más representativo del mundo real: la construcción de una **API RESTful** para gestionar un catálogo de productos.

## Descripción del Proyecto 📋

El objetivo es desarrollar una API utilizando **Express.js** que permita administrar una colección de productos. A diferencia de un sistema con una base de datos predefinida, aquí tendrán la libertad de elegir su propio conjunto de datos, lo que les permitirá adaptar la API a diferentes tipos de productos.

La API deberá implementar un **CRUD básico** y, además, incluir una serie de **endpoints especializados** diseñados para que pongan en práctica los conceptos fundamentales de las API REST.

### ¡Tu Misión, si decides aceptarla! 🚀

Dentro del directorio `/data` encontrarán varios archivos `.json`, cada uno con una lista de productos de una categoría diferente (supermercado, electrónica, mobiliario, etc.).

**Su primera tarea es elegir UNO de estos archivos.** Ese será el "catálogo" que gestionará su API. Deberán adaptar su código (especialmente el modelo) para que funcione correctamente con la estructura de datos del archivo que hayan seleccionado.

## Modelo de Datos 📊

Los datos de los productos tienen una estructura base que incluye `codigo`, `nombre`, `precio` y `categoria`. Notarán que, para hacerlo más realista, **el campo `categoria` es un array de strings**.

Deberán definir un **modelo de Mongoose** que sea lo suficientemente flexible para manejar los productos del archivo JSON que elijan. Esto implica:
1.  Conectar su aplicación a una base de datos de **MongoDB**.
2.  Crear un `Schema` de Mongoose que se corresponda con la estructura de los datos.
3.  Implementar una lógica (puede ser un script aparte o una ruta protegida) para **poblar la base de datos** una única vez con los datos del archivo `.json` seleccionado.

> **¡IMPORTANTE!** 🔐 Para gestionar la cadena de conexión de MongoDB y otros datos sensibles, es fundamental que utilicen un archivo `.env`. **Nunca suban datos sensibles a un repositorio de Git**. Asegúrense de incluir el archivo `.env` y `node_modules` en su `.gitignore`.

## Endpoints Requeridos 🔍

La API debe contar con los siguientes endpoints:

### CRUD Básico

<details>
  <summary><code>GET /productos</code></summary>

  - **Descripción**: Devuelve la lista completa de productos del catálogo elegido.
  - **Respuesta Exitosa (200 OK)**: Un array con todos los objetos de producto.
</details>

<details>
  <summary><code>GET /productos/:codigo</code></summary>

  - **Descripción**: Busca y devuelve un producto específico por su `código`.
  - **Parámetros de Ruta**: `:codigo` (numérico).
  *   **Respuesta Exitosa (200 OK)**: El objeto del producto encontrado.
  *   **Respuesta de Error (404 Not Found)**: Si no existe un producto con ese código.
</details>

<details>
  <summary><code>POST /productos</code></summary>

  - **Descripción**: Agrega un nuevo producto al catálogo.
  - **Cuerpo de la Solicitud (Body)**: Un objeto JSON con la estructura de un producto. El `codigo` debe ser único.
  - **Respuesta Exitosa (201 Created)**: El objeto del producto recién creado.
  - **Respuesta de Error (400 Bad Request)**: Si el cuerpo de la solicitud es inválido o el código ya existe.
</details>

<details>
  <summary><code>PUT /productos/:codigo</code></summary>

  - **Descripción**: Modifica un producto existente.
  - **Parámetros de Ruta**: `:codigo` (numérico).
  - **Cuerpo de la Solicitud (Body)**: Un objeto JSON con los campos a modificar.
  - **Respuesta Exitosa (200 OK)**: El objeto del producto actualizado.
  - **Respuesta de Error (404 Not Found)**: Si el producto no se encuentra.
</details>

<details>
  <summary><code>DELETE /productos/:codigo</code></summary>

  - **Descripción**: Elimina un producto del catálogo.
  - **Parámetros de Ruta**: `:codigo` (numérico).
  - **Respuesta Exitosa (200 OK)**: Un mensaje de confirmación.
  - **Respuesta de Error (404 Not Found)**: Si el producto no se encuentra.
</details>

### Endpoints Adicionales (¡El verdadero desafío!)

Para profundizar en los conceptos de API REST, deberán implementar los siguientes 4 endpoints:

<details>
  <summary><code>GET /productos/buscar</code></summary>

  - **Descripción**: Permite buscar productos cuyo nombre o descripción contenga un término específico.
  - **Query Params**: `q={termino_de_busqueda}`.
  - **Ejemplo**: `/productos/buscar?q=notebook` debería devolver todos los productos que incluyan "notebook" en su nombre.
  - **Respuesta Exitosa (200 OK)**: Un array con los productos que coincidan con la búsqueda.
</details>

<details>
  <summary><code>GET /productos/categoria/:nombre</code></summary>

  - **Descripción**: Filtra los productos que pertenezcan a una categoría específica.
  - **Parámetros de Ruta**: `:nombre` (string).
  - **Ejemplo**: `/productos/categoria/Hogar` debería devolver todos los productos que tengan "Hogar" en su array de categorías.
  - **Respuesta Exitosa (200 OK)**: Un array con los productos de esa categoría.
</details>

<details>
  <summary><code>GET /productos/precio/:min-:max</code></summary>

  - **Descripción**: Devuelve los productos cuyo precio se encuentre dentro de un rango específico (ambos valores incluidos).
  - **Parámetros de Ruta**: `:min` (numérico) y `:max` (numérico), separados por un guion.
  - **Ejemplo**: `/productos/precio/100-500` debería devolver productos con precio entre 100 y 500.
  - **Respuesta Exitosa (200 OK)**: Un array con los productos que cumplan con el rango de precios.
</details>

<details>
  <summary><code>POST /productos/masivo</code></summary>

  - **Descripción**: Permite agregar múltiples productos en una sola solicitud.
  - **Cuerpo de la Solicitud (Body)**: Un array de objetos JSON, donde cada objeto representa un nuevo producto.
  - **Respuesta Exitosa (201 Created)**: Un array con todos los productos que se crearon exitosamente.
  - **Pista**: El endpoint debe validar cada producto individualmente y solo agregar los que sean válidos.
</details>

## Probando la API con `api.http` 🧪

Para facilitar la prueba de los endpoints, se ha incluido un archivo `api.http` en la raíz del proyecto. Este archivo contiene ejemplos de solicitudes para cada una de las funcionalidades requeridas.

Para utilizarlo, te recomendamos instalar la extensión **[REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)** para Visual Studio Code.

Una vez instalada, simplemente abre el archivo `api.http` y verás un botón `Send Request` encima de cada solicitud. Al hacer clic, la extensión ejecutará la petición y te mostrará la respuesta del servidor en una nueva pestaña.

> **Nota**: Recuerda que los `códigos` de los productos en los ejemplos pueden no coincidir con los de tu base de datos. ¡Asegúrate de ajustarlos para que tus pruebas funcionen correctamente!

## Documentación de la API con Swagger 📚

Una API bien documentada es fundamental para que otros desarrolladores (y tú mismo en el futuro) puedan entender y utilizar tu API de manera efectiva. Para lograr esto, deberán implementar **documentación con Swagger/OpenAPI**.

### Requisitos de Documentación

1. **Instalación de Swagger**: Deberán instalar y configurar `swagger-ui-express` y `swagger-jsdoc` en su proyecto.

2. **Configuración**: Crear un archivo de configuración de Swagger que incluya:
   - Información básica de la API (título, descripción, versión)
   - Servidor y URL base
   - Esquemas de datos (definiciones de los modelos de productos)

3. **Documentación de Endpoints**: Cada endpoint debe estar documentado con:
   - Descripción clara de su funcionalidad
   - Parámetros (de ruta, query, body)
   - Respuestas posibles (códigos de estado y ejemplos)
   - Ejemplos de solicitudes y respuestas

4. **Ruta de Documentación**: La documentación debe estar accesible en una ruta dedicada (por ejemplo: `/api-docs`).

> **Recursos útiles**: Pueden consultar la documentación oficial de [Swagger JSDoc](https://github.com/SuryaSwagger/swagger-jsdoc) y [Swagger UI Express](https://github.com/scottie1984/swagger-ui-express) para implementar la documentación.

## Despliegue en Producción 🚀

Para que su API sea accesible públicamente y demuestre sus habilidades de DevOps, deberán desplegar su aplicación en un servicio de hosting en la nube. Tienen dos opciones recomendadas:

### Opción 1: Render

[Render](https://render.com/) es una plataforma moderna que facilita el despliegue de aplicaciones Node.js.

**Pasos básicos**:
1. Crear una cuenta en Render (pueden usar su cuenta de GitHub).
2. Crear un nuevo "Web Service" conectando su repositorio de GitHub.
3. Configurar las variables de entorno (especialmente la cadena de conexión de MongoDB).
4. Render detectará automáticamente que es una aplicación Node.js y la desplegará.

### Opción 2: Railway

[Railway](https://railway.app/) es otra excelente opción para desplegar aplicaciones backend.

**Pasos básicos**:
1. Crear una cuenta en Railway (pueden usar su cuenta de GitHub).
2. Crear un nuevo proyecto e importar su repositorio de GitHub.
3. Configurar las variables de entorno necesarias.
4. Railway detectará automáticamente el proyecto y lo desplegará.

### Consideraciones Importantes para el Despliegue

- **Base de Datos**: Deberán crear una base de datos MongoDB en la nube. Pueden usar [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (gratuito) y configurar la cadena de conexión en las variables de entorno de su servicio de hosting.

- **Variables de Entorno**: Asegúrense de configurar todas las variables de entorno necesarias en la plataforma de hosting (no solo en su `.env` local).

- **Puerto**: Su aplicación debe usar el puerto proporcionado por la plataforma (generalmente a través de `process.env.PORT`).

- **Scripts de Inicio**: Verifiquen que su `package.json` tenga un script `start` que inicie su aplicación correctamente.

- **URL de Producción**: Una vez desplegada, deberán actualizar la URL del servidor en su documentación de Swagger para que apunte a la URL de producción.

## Creación del README.md 📝

Un buen README es la carta de presentación de tu proyecto. Deberán crear un archivo `README.md` en la raíz del proyecto que incluya:

### Contenido Mínimo Requerido

1. **Título y Descripción**: Nombre del proyecto y una breve descripción de qué hace la API.

2. **Tecnologías Utilizadas**: Lista de las tecnologías, frameworks y librerías que utilizaron (Express.js, MongoDB, Mongoose, Swagger, etc.).

3. **Instalación**: Instrucciones paso a paso para instalar y ejecutar el proyecto localmente, incluyendo:
   - Requisitos previos (Node.js, MongoDB, etc.)
   - Instalación de dependencias
   - Configuración de variables de entorno
   - Comandos para ejecutar la aplicación

4. **Estructura del Proyecto**: Descripción de la organización de carpetas y archivos principales.

5. **Endpoints de la API**: Lista de todos los endpoints disponibles con una breve descripción de cada uno. Pueden incluir ejemplos de uso.

6. **Documentación de Swagger**: Enlace o instrucciones para acceder a la documentación interactiva de Swagger.

7. **URL de Producción**: Enlace a la versión desplegada de la API (Render o Railway).

8. **Variables de Entorno**: Lista de las variables de entorno necesarias con una breve descripción de cada una (sin incluir valores reales por seguridad).

9. **Autor/es**: Información sobre quién desarrolló el proyecto.

10. **Licencia** (opcional): Si desean incluir una licencia.

> **Nota**: En la raíz del proyecto encontrarán un archivo `README.md` con un boilerplate que pueden usar como punto de partida. Deberán completarlo con la información específica de su proyecto.

## Fechas Clave y Evaluación 🗓️

Para organizar nuestro cronograma, tengan en cuenta las siguientes fechas:

-   **6 de Enero**: Fecha de inicio del trabajo integrador. Durante la clase, se presentará el proyecto y podrán resolver dudas iniciales.
-   **Miércoles 18 de Febrero**: Fecha límite de entrega del trabajo para obtener correcciones sobre el mismo.

## Estructura del Repositorio Sugerida 🗂️

Pueden mantener la estructura que venían utilizando, asegurándose de incluir la configuración de la base de datos:

```plaintext
/controllers
  - productoController.js
/config
  - database.js
/data
  - (varios archivos .json)
/models
  - producto.js
/routes
  - productoRoutes.js
/app.js
/README.md
```

## Buenas Prácticas de Git y Commits 📝

Para mantener un historial de cambios limpio y profesional, es fundamental que sigan estas buenas prácticas al trabajar con Git:

-   **Realicen Commits Pequeños y Frecuentes**: En lugar de hacer un solo commit gigante al final, hagan commits pequeños cada vez que completen una unidad de trabajo lógica (por ejemplo, al terminar la implementación de un endpoint, al corregir un bug, o al actualizar la documentación). Esto facilita la revisión del código y la identificación de errores.

-   **Escriban Mensajes de Commit Descriptivos**: Un buen mensaje de commit debe ser claro y conciso. Sigan una convención para que sea aún más legible. Les sugerimos el formato de *Commits Convencionales*:
    -   `feat:` para nuevas funcionalidades (ej. `feat: Implementa endpoint GET /productos/:codigo`).
    -   `fix:` para correcciones de errores (ej. `fix: Corrige error 404 en la búsqueda por categoría`).
    -   `docs:` para cambios en la documentación (ej. `docs: Actualiza README con ejemplos de uso`).
    -   `refactor:` para cambios en el código que no añaden funcionalidades ni corrigen errores.
    -   `test:` para añadir o modificar pruebas.

Un buen historial de commits no solo demuestra profesionalismo, sino que también es una herramienta invaluable para ustedes y para cualquier persona que trabaje en el proyecto en el futuro.

## Instrucciones de Entrega 🚀

1.  **Asegúrense de estar trabajando sobre su propio fork** del repositorio del proyecto.
2.  **Añádanos como colaboradores** en su repositorio de GitHub para que podamos revisar su progreso. Nuestros usuarios son:
    *   `FabioDrizZt`
3.  Desarrollen las funcionalidades requeridas. **No olviden elegir su archivo JSON de datos**.
4.  **Implementen la documentación con Swagger** para todos los endpoints de la API.
5.  **Desplieguen la API** en Render o Railway y asegúrense de que esté funcionando correctamente.
6.  **Creen y completen el README.md** con toda la información requerida (pueden usar el boilerplate proporcionado como punto de partida).
7.  **Documenten** cualquier decisión importante o cambio que hayan realizado en el `README.md`.
8.  **Suban sus cambios** a su repositorio de GitHub.

---

Este trabajo es una excelente oportunidad para consolidar lo aprendido. ¡No teman experimentar y, sobre todo, consulten cualquier duda que tengan!

¡Mucho éxito!