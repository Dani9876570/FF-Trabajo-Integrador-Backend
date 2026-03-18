// Importamos el modelo de Producto para interactuar con la colección de la base de datos
const Product = require('../../models/Product');

/**
 * CONTROLADOR PARA ELIMINAR UN PRODUCTO
 * Se encarga de buscar un producto por su código y removerlo de la base de datos.
 */
const deleteProduct = async (req, res) => {
    try {
        // 1. Extraemos el 'codigo' de los parámetros de la URL (req.params)
        const { codigo } = req.params;

        /**
         * 2. BUSCAR Y ELIMINAR
         * findOneAndDelete: Busca un documento que coincida con el filtro y lo borra.
         * Usamos Number(codigo) para asegurarnos de que la búsqueda sea con un valor numérico.
         */
        const deletedProduct = await Product.findOneAndDelete({ codigo: Number(codigo) });
        
        /**
         * 3. VALIDACIÓN DE EXISTENCIA
         * Si findOneAndDelete no encuentra nada, devuelve 'null'. 
         * En ese caso, respondemos con un error 404 (No encontrado).
         */
        if (!deletedProduct) {
            return res.status(404).json({ 
                message: "Producto no encontrado. No se pudo realizar la eliminación." 
            });
        }
        
        /**
         * 4. RESPUESTA DE ÉXITO
         * Si se eliminó correctamente, enviamos un mensaje de confirmación 
         * y devolvemos los datos del producto que acabamos de borrar.
         */
        res.status(200).json({ 
            message: "Producto eliminado correctamente", 
            producto: deletedProduct 
        });

    } catch (error) {
        /**
         * 5. MANEJO DE ERRORES
         * Si ocurre un fallo en el servidor o en la base de datos, 
         * enviamos un código 500 con el mensaje del error.
         */
        res.status(500).json({ 
            message: "Hubo un error al procesar la eliminación",
            error: error.message 
        });
    }
};

// Exportamos la función para que pueda ser utilizada en el archivo de rutas
module.exports = deleteProduct;