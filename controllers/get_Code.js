// Importamos el modelo de Producto para interactuar con la base de datos
const Product = require('../../models/Product');

/**
 * CONTROLADOR PARA BUSCAR UN PRODUCTO POR CÓDIGO
 * Se utiliza para obtener la información detallada de un solo artículo.
 */
const getByCode = async (req, res) => {
    try {
        /**
         * 1. OBTENCIÓN DEL PARÁMETRO DE RUTA
         * El 'codigo' viene de la URL (ejemplo: /productos/101).
         * Se recibe a través del objeto 'req.params'.
         */
        const { codigo } = req.params; 

        /**
         * 2. BÚSQUEDA EN LA BASE DE DATOS
         * .findOne() busca el primer documento que cumpla con la condición.
         * Es fundamental usar Number(codigo) porque en la base de datos el campo
         * 'codigo' es de tipo numérico, y lo que viene por URL es un string.
         */
        const product = await Product.findOne({ codigo: Number(codigo) });
        
        /**
         * 3. VALIDACIÓN DE RESULTADOS
         * Si Mongoose no encuentra nada, 'product' será null.
         * En ese caso, cortamos la ejecución y devolvemos un código 404 (Not Found).
         */
        if (!product) {
            return res.status(404).json({ 
                message: "Producto no encontrado en nuestro catálogo." 
            });
        }
        
        /**
         * 4. RESPUESTA EXITOSA
         * Si el producto existe, lo enviamos al cliente en formato JSON con un status 200.
         */
        res.status(200).json(product);

    } catch (error) {
        /**
         * 5. MANEJO DE ERRORES TÉCNICOS
         * Si hay un fallo de conexión o un error inesperado, devolvemos status 500.
         */
        res.status(500).json({ 
            message: "Error al procesar la búsqueda por código",
            error: error.message 
        });
    }
};

// Exportamos la función para que sea utilizada en el enrutador
module.exports = getByCode;