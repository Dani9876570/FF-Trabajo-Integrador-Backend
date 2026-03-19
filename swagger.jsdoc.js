/**
 * @swagger
 * components:
 * schemas:
 * # Esquema principal: Define cómo se ve un producto al salir de la base de datos
 * Product:
 * type: object
 * required:
 * - codigo
 * - nombre
 * - precio
 * - categoria
 * properties:
 * _id:
 * type: string
 * description: ID único generado automáticamente por MongoDB
 * example: 60d21b4667d0d8992e610c85
 * codigo:
 * type: number
 * description: Código numérico único para identificación de negocio
 * example: 101
 * nombre:
 * type: string
 * description: Nombre comercial del producto
 * example: Smartphone Samsung Galaxy S23
 * precio:
 * type: number
 * description: Valor monetario del producto
 * example: 850.50
 * categoria:
 * type: array
 * description: Lista de etiquetas o categorías asociadas
 * items:
 * type: string
 * example: ["Celulares", "Tecnología"]
 * imagen:
 * type: string
 * description: URL externa de la fotografía del producto
 * example: https://ejemplo.com/foto.jpg
 * descripcion:
 * type: string
 * description: Especificaciones técnicas o detalle comercial
 * example: 128GB de almacenamiento, 8GB RAM.
 *
 * # Esquema de Entrada: Se usa para crear o actualizar (no incluye el _id)
 * ProductInput:
 * type: object
 * required:
 * - codigo
 * - nombre
 * - precio
 * - categoria
 * properties:
 * codigo:
 * type: number
 * example: 102
 * nombre:
 * type: string
 * example: Auriculares Sony WH-1000XM5
 * precio:
 * type: number
 * example: 350.00
 * categoria:
 * type: array
 * items:
 * type: string
 * example: ["Audio", "Periféricos"]
 * imagen:
 * type: string
 * descripcion:
 * type: string
 *
 * # Esquema de Error: Estructura estándar para respuestas fallidas
 * Error:
 * type: object
 * properties:
 * message:
 * type: string
 * example: Producto no encontrado
 */

/**
 * @swagger
 * /api/productos:
 * # Listado general
 * get:
 * tags:
 * - Productos
 * summary: Obtener todo el catálogo
 * description: Retorna la lista completa de productos electrónicos almacenados.
 * responses:
 * 200:
 * description: Lista obtenida exitosamente
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * $ref: '#/components/schemas/Product'
 *
 * # Creación manual
 * post:
 * tags:
 * - Productos
 * summary: Crear un producto manual
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/ProductInput'
 * responses:
 * 201:
 * description: Producto creado con éxito
 *
 * /api/productos/masivo:
 * # Utilidad de sistema
 * post:
 * tags:
 * - Sistema
 * summary: Carga masiva desde JSON
 * description: Lee el archivo interno 'electronicos.json' e impacta los 30 productos en la DB.
 * responses:
 * 201:
 * description: Carga masiva exitosa
 *
 * /api/productos/{codigo}:
 * # Búsqueda por parámetro de ruta (Path Parameter)
 * get:
 * tags:
 * - Productos
 * summary: Buscar por código
 * parameters:
 * - name: codigo
 * in: path
 * required: true
 * schema:
 * type: number
 * responses:
 * 200:
 * description: Producto encontrado
 * 404:
 * description: No se encontró el código solicitado
 *
 * # Actualización total o parcial
 * put:
 * tags:
 * - Productos
 * summary: Actualizar producto
 * parameters:
 * - name: codigo
 * in: path
 * required: true
 * schema:
 * type: number
 * requestBody:
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/ProductInput'
 * responses:
 * 200:
 * description: Datos actualizados correctamente
 *
 * # Eliminación física
 * delete:
 * tags:
 * - Productos
 * summary: Eliminar producto
 * parameters:
 * - name: codigo
 * in: path
 * required: true
 * schema:
 * type: number
 * responses:
 * 200:
 * description: Registro eliminado con éxito
 *
 * /api/productos/buscar:
 * # Búsqueda por Query Parameter (?q=...)
 * get:
 * tags:
 * - Productos
 * summary: Buscador inteligente
 * description: Realiza una búsqueda por coincidencia de texto en el nombre del producto.
 * parameters:
 * - name: q
 * in: query
 * required: true
 * description: Término de búsqueda (ej. "Samsung")
 * schema:
 * type: string
 * responses:
 * 200:
 * description: Resultados de búsqueda entregados
 *
 * /api/productos/categoria/{nombre}:
 * # Filtro por categoría en la ruta
 * get:
 * tags:
 * - Productos
 * summary: Filtrar por categoría
 * parameters:
 * - name: nombre
 * in: path
 * required: true
 * schema:
 * type: string
 * responses:
 * 200:
 * description: Listado de productos pertenecientes a la categoría
 */