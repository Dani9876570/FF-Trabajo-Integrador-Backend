// Importamos el modelo de Producto para realizar búsquedas en la colección
const Product = require('../../models/Product');

/**
 * CONTROLADOR PARA BÚSQUEDA POR TÉRMINOS (SEARCH)
 * Permite buscar productos cuyo nombre contenga una palabra o letra específica.
 */
const getByTerm = async (req, res) => {
    try {
        /**
         * 1. OBTENCIÓN DEL QUERY PARAMETER
         * A diferencia de los anteriores, este usa 'req.query'.
         * Se usa en la URL después del signo '?'. 
         * Ejemplo: /productos/buscar?q=smart
         */
        const { q } = req.query; 

        /**
         * 2. BÚSQUEDA CON EXPRESIÓN REGULAR (Regex)
         * .find() busca coincidencias en el campo 'nombre'.
         * $regex: Es el patrón de búsqueda (el texto 'q' que envió el usuario).
         * $options: 'i' (insensibilidad) hace que no importe si es MAYÚSCULA o minúscula.
         */
        const products = await Product.find({
            nombre: { 
                $regex: q, 
                $options: 'i' 
            }
        });

        /**
         * 3. RESPUESTA EXITOSA
         * Enviamos los productos que coinciden con la búsqueda.
         */
        res.status(200).json(products);

    } catch (error) {
        /**
         * 4. GESTIÓN DE ERRORES
         * Si algo falla en la consulta, devolvemos el error 500.
         */
        res.status(500).json({ 
            message: "Error al realizar la búsqueda por término",
            error: error.message 
        });
    }
};

// Exportamos el controlador para usarlo en las rutas
module.exports = getByTerm;