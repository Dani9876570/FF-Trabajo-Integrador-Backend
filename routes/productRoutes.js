const express = require('express');
const router = express.Router();

/**
 * IMPORTACIÓN DE LOS CONTROLADORES
 * Traemos cada función desde su archivo individual en la carpeta controllers.
 */
const getAll = require('../controllers/productController');
const getByCode = require('../controllers/get_Code');
const getByCategory = require('../controllers/get_Categoria_Nombre');
const getByPrice = require('../controllers/get_Precio_max_min');
const getByTerm = require('../controllers/get_Terminos');
const postProduct = require('../controllers/post');
const postMasivo = require('../controllers/post_producto_masivo');
const putProduct = require('../controllers/put');
const deleteProduct = require('../controllers/delete');

/**
 * DEFINICIÓN DE RUTAS (ENDPOINTS)
 */

// 1. Obtener todos los productos
// GET /api/productos/
router.get('/', getAll);

// 2. Carga masiva desde el JSON (Punto 4 de la consigna)
// POST /api/productos/masivo
router.post('/masivo', postMasivo);

// 3. Búsqueda por término (Buscador inteligente)
// GET /api/productos/buscar?q=termino
router.get('/buscar', getByTerm);

// 4. Filtrar por rango de precio
// GET /api/productos/precio/100-500
router.get('/precio/:min-:max', getByPrice);

// 5. Filtrar por nombre de categoría
// GET /api/productos/categoria/Celulares
router.get('/categoria/:nombre', getByCategory);

// 6. Obtener un producto por su código
// GET /api/productos/101
router.get('/:codigo', getByCode);

// 7. Crear un nuevo producto manualmente
// POST /api/productos/
router.post('/', postProduct);

// 8. Actualizar un producto existente por su código
// PUT /api/productos/101
router.put('/:codigo', putProduct);

// 9. Eliminar un producto por su código
// DELETE /api/productos/101
router.delete('/:codigo', deleteProduct);

// Exportamos el enrutador para que sea usado en el index.js de routes
module.exports = router;
