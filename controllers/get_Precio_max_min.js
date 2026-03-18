// Importamos el modelo de Producto para acceder a la colección de electrónicos
const Product = require('../../models/Product');

/**
 * CONTROLADOR PARA FILTRAR POR RANGO DE PRECIO
 * Permite buscar productos que estén entre un valor mínimo y uno máximo.
 */
const getByPriceRange = async (req, res) => {
    try {
        /**
         * 1. OBTENCIÓN DE PARÁMETROS DE RUTA
         * Los valores 'min' y 'max' se extraen de la URL.
         * Ejemplo de ruta esperada: /productos/precio/500-1500
         */
        const { min, max } = req.params; 

        /**
         * 2. BÚSQUEDA CON OPERADORES LÓGICOS
         * .find() busca todos los documentos que cumplan la condición del objeto.
         * $gte (Greater Than or Equal): Busca valores mayores o iguales al 'min'.
         * $lte (Less Than or Equal): Busca valores menores o iguales al 'max'.
         * Convertimos los parámetros a Number() para que la comparación sea numérica.
         */
        const products = await Product.find({
            precio: { 
                $gte: Number(min), 
                $lte: Number(max) 
            }
        });

        /**
         * 3. RESPUESTA AL CLIENTE
         * Enviamos el array de productos encontrados. 
         * Si no hay coincidencias, el array estará vacío [].
         */
        res.status(200).json(products);

    } catch (error) {
        /**
         * 4. MANEJO DE ERRORES
         * En caso de fallo, devolvemos el código 500 con el detalle del error.
         */
        res.status(500).json({ 
            message: "Error al filtrar por rango de precio",
            error: error.message 
        });
    }
};

// Exportamos la función para que el enrutador pueda utilizarla
module.exports = getByPriceRange;