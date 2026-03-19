// 1. Importamos el modelo de Producto para realizar búsquedas en la colección de electrónicos
const Product = require('../models/product');

/**
 * CONTROLADOR PARA BÚSQUEDA POR TÉRMINOS (SEARCH)
 * Permite buscar productos cuyo nombre contenga una palabra o letra específica.
 */
const getByTerm = async (req, res) => {
    try {
        /**
         * 2. OBTENCIÓN DEL QUERY PARAMETER
         * Usamos 'req.query' para capturar lo que viene después del signo '?'. 
         * Ejemplo en URL: /api/productos/buscar?q=smart
         */
        const { q } = req.query; 

        // 3. VALIDACIÓN DE ENTRADA
        // Si el usuario no envió el parámetro 'q' o está vacío, 
        // devolvemos un error 400 (Bad Request).
        if (!q || q.trim() === "") {
            return res.status(400).json({ 
                message: "Debes proporcionar un término de búsqueda en el parámetro 'q'." 
            });
        }

        /**
         * 4. BÚSQUEDA CON EXPRESIÓN REGULAR (Regex)
         * .find() busca coincidencias parciales en el campo 'nombre'.
         * $regex: Es el texto que buscamos (el valor de 'q').
         * $options: 'i' (insensibilidad) ignora mayúsculas y minúsculas.
         */
        const products = await Product.find({
            nombre: { 
                $regex: q, 
                $options: 'i' 
            }
        });

        /**
         * 5. VALIDACIÓN DE RESULTADOS
         * Si la búsqueda no arroja ningún producto, avisamos al usuario.
         */
        if (products.length === 0) {
            return res.status(404).json({
                message: `No se encontraron productos que coincidan con: "${q}"`
            });
        }

        /**
         * 6. RESPUESTA EXITOSA
         * Enviamos el array de productos que coinciden con la búsqueda con status 200.
         */
        res.status(200).json(products);

    } catch (error) {
        /**
         * 7. GESTIÓN DE ERRORES TÉCNICOS
         * Capturamos fallos de conexión o errores en la consulta a MongoDB.
         */
        res.status(500).json({ 
            message: "Error al realizar la búsqueda por término",
            error: error.message 
        });
    }
};

// 8. Exportamos el controlador para vincularlo a la ruta en productRoutes.js
module.exports = getByTerm;