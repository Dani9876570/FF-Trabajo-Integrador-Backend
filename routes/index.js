const express = require('express');
const router = express.Router();

/**
 * IMPORTACIÓN DE RUTAS ESPECÍFICAS
 * Aquí traeremos cada archivo de rutas que creemos (productos, usuarios, etc.)
 */
const productRoutes = require('./productRoutes');

/**
 * DEFINICIÓN DE PREFIJOS
 * Asociamos cada archivo de rutas a un prefijo de URL.
 * En este caso, todas las rutas de electrónicos empezarán con /productos
 */
router.use('/productos', productRoutes);

/**
 * RUTA DE BIENVENIDA (Opcional)
 * Una ruta simple para verificar que la API está respondiendo en la raíz de las rutas.
 */
router.get('/', (req, res) => {
    res.status(200).json({
        message: "Bienvenido a la API de Electrónicos - Diplomatura Web",
        status: "Online"
    });
});

module.exports = router;