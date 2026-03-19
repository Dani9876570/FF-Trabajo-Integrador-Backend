// 1. IMPORTACIÓN DE EXPRESS
// Usamos el Router de Express para agrupar y organizar las rutas de la aplicación.
const express = require('express');
const router = express.Router();

/**
 * 2. IMPORTACIÓN DE RUTAS ESPECÍFICAS
 * Traemos el archivo 'productRoutes.js' que contiene todos los endpoints (GET, POST, etc.)
 * relacionados con los artículos electrónicos.
 */
const productRoutes = require('./productRoutes');

/**
 * 3. DEFINICIÓN DE PREFIJOS (Middleware de Rutas)
 * Asociamos el archivo de rutas al prefijo '/productos'.
 * De esta forma, cualquier ruta definida dentro de 'productRoutes' 
 * se accederá anteponiendo '/productos' en la URL.
 */
router.use('/productos', productRoutes);

/**
 * 4. RUTA DE BIENVENIDA / TEST
 * Una ruta simple en la raíz del enrutador para confirmar que la API 
 * está activa y respondiendo correctamente.
 */
router.get('/', (req, res) => {
    res.status(200).json({
        message: "Bienvenido a la API de Electrónicos - Diplomatura Web",
        status: "Online",
        timestamp: new Date().toLocaleString() // Agregamos la hora actual para el test
    });
});

// 5. EXPORTACIÓN
// Exportamos el enrutador configurado para que el index.js principal lo pueda utilizar.
module.exports = router;