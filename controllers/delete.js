// 1. Importamos el modelo de Producto para interactuar con la colección de la base de datos
const Product = require('../models/product');

/**
 * CONTROLADOR PARA ELIMINAR UN PRODUCTO
 * Se encarga de buscar un producto por su código y removerlo de la base de datos.
 */
const deleteProduct = async (req, res) => {
    try {
        // 2. Extraemos el 'codigo' de los parámetros de la URL (req.params)
        const { codigo } = req.params;

        // 3. VALIDACIÓN PREVIA (Seguridad)
        // Verificamos que el código recibido sea un número válido antes de consultar la DB.
        if (isNaN(codigo)) {
            return res.status(400).json({ 
                message: "El código proporcionado debe ser un número válido." 
            });
        }

        /**
         * 4. BUSCAR Y ELIMINAR
         * findOneAndDelete: Busca un documento que coincida con el filtro y lo borra.
         * Usamos Number(codigo) para asegurar que coincida con el tipo de dato del Schema.
         */
        const deletedProduct = await Product.findOneAndDelete({ codigo: Number(codigo) });
        
        /**
         * 5. VALIDACIÓN DE EXISTENCIA
         * Si findOneAndDelete no encuentra nada, devuelve 'null'. 
         * Respondemos con un error 404 para indicar que el recurso no existe.
         */
        if (!deletedProduct) {
            return res.status(404).json({ 
                message: "Producto no encontrado. No se pudo realizar la eliminación." 
            });
        }
        
        /**
         * 6. RESPUESTA DE ÉXITO
         * Si se eliminó correctamente, enviamos un mensaje de confirmación 
         * y devolvemos los datos del producto que se borró (útil para auditoría).
         */
        res.status(200).json({ 
            message: "Producto eliminado correctamente", 
            producto: deletedProduct 
        });

    } catch (error) {
        /**
         * 7. MANEJO DE ERRORES (Fallo del servidor)
         * Capturamos errores de conexión o de sintaxis de la base de datos.
         */
        res.status(500).json({ 
            message: "Hubo un error al procesar la eliminación",
            error: error.message 
        });
    }
};

// 8. Exportamos la función para que el archivo de rutas (routes) pueda invocarla.
module.exports = deleteProduct;