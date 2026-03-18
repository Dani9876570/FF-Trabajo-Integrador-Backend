// 1. IMPORTACIÓN DEL MODELO
// Requerimos el modelo Product para realizar operaciones de actualización en la base de datos.
const Product = require('../../models/Product');

/**
 * CONTROLADOR PARA ACTUALIZAR UN PRODUCTO
 * Permite modificar los datos de un electrónico existente buscando por su código.
 */
const updateProduct = async (req, res) => {
    try {
        /**
         * 2. OBTENCIÓN DEL IDENTIFICADOR
         * El 'codigo' viene de los parámetros de la URL (req.params).
         * Es el criterio que usaremos para encontrar el producto a editar.
         */
        const { codigo } = req.params;

        /**
         * 3. ACTUALIZACIÓN EN MONGODB
         * findOneAndUpdate recibe tres argumentos principales:
         * - Filtro: { codigo: Number(codigo) } para encontrar el producto correcto.
         * - Datos: req.body contiene los nuevos campos a actualizar.
         * - Opciones: { new: true } le indica a Mongoose que devuelva el objeto 
         * YA MODIFICADO. Si no lo pones, te devuelve el objeto viejo.
         */
        const updatedProduct = await Product.findOneAndUpdate(
            { codigo: Number(codigo) }, 
            req.body, 
            { new: true, runValidators: true } // runValidators asegura que lo nuevo cumpla el esquema
        );
        
        /**
         * 4. VALIDACIÓN DE EXISTENCIA
         * Si no se encuentra un producto con ese código, informamos al cliente con un 404.
         */
        if (!updatedProduct) {
            return res.status(404).json({ 
                message: "No se encontró ningún producto con ese código para actualizar." 
            });
        }

        /**
         * 5. RESPUESTA EXITOSA
         * Enviamos el producto actualizado con un status 200.
         */
        res.status(200).json(updatedProduct);

    } catch (error) {
        /**
         * 6. MANEJO DE ERRORES
         * Capturamos fallos de validación o de conexión y enviamos status 500.
         */
        res.status(500).json({ 
            message: "Error al intentar actualizar el producto",
            error: error.message 
        });
    }
};

// Exportamos la función para que el enrutador la use con el método PUT o PATCH
module.exports = updateProduct;