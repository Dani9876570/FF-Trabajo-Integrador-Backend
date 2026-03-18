/**
 * @swagger
 * components:
 * schemas:
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
 * description: ID único generado por MongoDB
 * example: 60d21b4667d0d8992e610c85
 * codigo:
 * type: number
 * description: Código numérico único del producto
 * example: 101
 * nombre:
 * type: string
 * description: Nombre del producto electrónico
 * example: Smartphone Samsung Galaxy S23
 * precio:
 * type: number
 * description: Precio del producto
 * example: 850.50
 * categoria:
 * type: array
 * description: Categorías a las que pertenece el producto
 * items:
 * type: string
 * example: ["Celulares", "Tecnología"]
 * imagen:
 * type: string
 * description: URL de la imagen del producto
 * example: https://ejemplo.com/foto.jpg
 * descripcion:
 * type: string
 * description: Detalle del producto
 * example: 128GB de almacenamiento, 8GB RAM.
 *
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
 * get:
 * tags:
 * - Productos
 * summary: Obtener todo el catálogo
 * description: Retorna la lista completa de productos electrónicos.
 * responses:
 * 200:
 * description: Lista obtenida exitosamente
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * $ref: '#/components/schemas/Product'
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
 * post:
 * tags:
 * - Sistema
 * summary: Carga masiva desde JSON
 * description: Inserta todos los productos del archivo electronicos.json en la base de datos.
 * responses:
 * 201:
 * description: Carga masiva exitosa
 *
 * /api/productos/{codigo}:
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
 * description: No se encontró el código
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
 * description: Actualizado correctamente
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
 * description: Eliminado con éxito
 *
 * /api/productos/buscar:
 * get:
 * tags:
 * - Productos
 * summary: Buscador inteligente
 * description: Busca productos que contengan el término en su nombre.
 * parameters:
 * - name: q
 * in: query
 * required: true
 * description: Término de búsqueda (ej. "Samsung")
 * schema:
 * type: string
 * responses:
 * 200:
 * description: Resultados encontrados
 *
 * /api/productos/categoria/{nombre}:
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
 * description: Productos de la categoría
 */