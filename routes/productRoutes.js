// 1. IMPORTACIÓN DE DEPENDENCIAS
const express = require('express');
const router = express.Router();

/**
 * 2. IMPORTACIÓN DE CONTROLADORES
 * Traemos cada función lógica desde su archivo correspondiente.
 * Nota: Asegurate de que los nombres de los archivos en la carpeta 'controllers' 
 * coincidan exactamente con estos (mayúsculas/minúsculas).
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
 * 3. DEFINICIÓN DE ENDPOINTS (Puntos clave de la consigna)
 */

// A. RUTA GENERAL: Obtener el listado completo de artículos
// GET /api/productos/
router.get('/', getAll);

// B. CARGA MASIVA: Endpoint para popular la DB con los 30 productos del JSON
// POST /api/productos/masivo
router.post('/masivo', postMasivo);

// C. BÚSQUEDA: Buscador por término (usando req.query.q)
// GET /api/productos/buscar
router.get('/buscar', getByTerm);

// D. FILTRO POR PRECIO: Rango de valores (min y max)
// GET /api/productos/precio/100-500
router.get('/precio/:min-:max', getByPrice);

// E. FILTRO POR CATEGORÍA: Búsqueda dentro del array de categorías
// GET /api/productos/categoria/Celulares
router.get('/categoria/:nombre', getByCategory);

// F. BUSQUEDA POR CÓDIGO: Obtener un producto específico
// GET /api/productos/101
router.get('/:codigo', getByCode);

// G. CREACIÓN: Agregar un nuevo producto manualmente (req.body)
// POST /api/productos/
router.post('/', postProduct);

// H. ACTUALIZACIÓN: Modificar un producto existente por su código
// PUT /api/productos/101
router.put('/:codigo', putProduct);

// I. ELIMINACIÓN: Borrar un producto de la base de datos
// DELETE /api/productos/101
router.delete('/:codigo', deleteProduct);

// 4. EXPORTACIÓN
// El enrutador se exporta para ser integrado en el index.js de la carpeta routes.
module.exports = router;
