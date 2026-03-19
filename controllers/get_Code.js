// 1. Importamos el modelo de Producto para interactuar con la base de datos de MongoDB
const Product = require('../../models/Product');

/**
 * CONTROLADOR PARA BUSCAR UN PRODUCTO POR CÓDIGO
 * Este endpoint se utiliza para obtener la información detallada de un solo artículo.
 */
const getByCode = async (req, res) => {
    try {
        /**
         * 2. OBTENCIÓN DEL PARÁMETRO DE RUTA
         * Extraemos el 'codigo' que viene en la URL (ejemplo: /api/productos/4815).
         */
        const { codigo } = req.params; 

        // 3. VALIDACIÓN DE ENTRADA (Seguridad Extra)
        // Antes de ir a la DB, verificamos que lo que recibimos sea realmente un número.
        // Si no lo es, respondemos con 400 (Bad Request).
        if (isNaN(codigo)) {
            return res.status(400).json({ 
                message: "El código debe ser un valor numérico válido." 
            });
        }

        /**
         * 4. BÚSQUEDA EN LA BASE DE DATOS
         * .findOne() busca el primer documento que coincida exactamente con el filtro.
         * Es fundamental usar Number(codigo) porque en el Schema definimos 'codigo' como Number.
         */
        const product = await Product.findOne({ codigo: Number(codigo) });
        
        /**
         * 5. VALIDACIÓN DE EXISTENCIA
         * Si Mongoose no encuentra el documento, devuelve 'null'.
         * En ese caso, informamos al cliente con un código 404 (Not Found).
         */
        if (!product) {
            return res.status(404).json({ 
                message: "Producto no encontrado en nuestro catálogo." 
            });
        }
        
        /**
         * 6. RESPUESTA EXITOSA
         * Si el producto existe, lo enviamos al cliente con status 200 (OK).
         */
        res.status(200).json(product);

    } catch (error) {
        /**
         * 7. MANEJO DE ERRORES TÉCNICOS
         * Capturamos fallos de conexión o errores internos del servidor.
         */
        res.status(500).json({ 
            message: "Error al procesar la búsqueda por código",
            error: error.message 
        });
    }
};

// 8. Exportamos la función para que el enrutador pueda vincularla a la ruta GET.
module.exports = getByCode;