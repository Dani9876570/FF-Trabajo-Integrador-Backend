// 1. Importamos el modelo de Producto para acceder a la colección de electrónicos
const Product = require('../models/product');

/**
 * CONTROLADOR PARA FILTRAR POR RANGO DE PRECIO
 * Permite buscar productos que estén entre un valor mínimo y uno máximo.
 */
const getByPriceRange = async (req, res) => {
    try {
        /**
         * 2. OBTENCIÓN DE PARÁMETROS DE RUTA
         * Los valores 'min' y 'max' se extraen de la URL (req.params).
         * Ejemplo de ruta esperada en el router: /precio/:min/:max
         */
        const { min, max } = req.params; 

        // 3. VALIDACIÓN DE ENTRADA (Seguridad y Lógica)
        // Convertimos a número de antemano para facilitar las comparaciones.
        const precioMin = Number(min);
        const precioMax = Number(max);

        // Verificamos que sean números válidos y que el mínimo no supere al máximo.
        if (isNaN(precioMin) || isNaN(precioMax)) {
            return res.status(400).json({ 
                message: "Los valores de precio deben ser numéricos." 
            });
        }

        if (precioMin > precioMax) {
            return res.status(400).json({ 
                message: "El precio mínimo no puede ser mayor al precio máximo." 
            });
        }

        /**
         * 4. BÚSQUEDA CON OPERADORES LÓGICOS DE MONGODB
         * $gte (Greater Than or Equal): Mayor o igual que el mínimo.
         * $lte (Less Than or Equal): Menor o igual que el máximo.
         */
        const products = await Product.find({
            precio: { 
                $gte: precioMin, 
                $lte: precioMax 
            }
        });

        /**
         * 5. RESPUESTA AL CLIENTE
         * Si no hay productos en ese rango, enviamos un 404 o un array vacío con mensaje.
         */
        if (products.length === 0) {
            return res.status(404).json({
                message: `No se encontraron productos entre $${precioMin} y $${precioMax}`
            });
        }

        // Si hay resultados, enviamos el array con status 200 (Éxito).
        res.status(200).json(products);

    } catch (error) {
        /**
         * 6. MANEJO DE ERRORES TÉCNICOS
         * Capturamos fallos de conexión o errores internos del servidor.
         */
        res.status(500).json({ 
            message: "Error al filtrar por rango de precio",
            error: error.message 
        });
    }
};

// 7. Exportamos la función para que el enrutador pueda utilizarla en productRoutes.js
module.exports = getByPriceRange;