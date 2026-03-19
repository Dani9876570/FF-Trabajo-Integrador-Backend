// 1. IMPORTACIÓN DEL MODELO
// Requerimos el modelo Product para realizar operaciones de actualización en la base de datos de Atlas.
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
         */
        const { codigo } = req.params;

        // 3. VALIDACIÓN DE ENTRADA (Seguridad)
        // Verificamos que el código sea un número y que el body no esté vacío.
        if (isNaN(codigo)) {
            return res.status(400).json({ 
                message: "El código proporcionado debe ser un número válido." 
            });
        }

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ 
                message: "No se enviaron datos para actualizar." 
            });
        }

        /**
         * 4. ACTUALIZACIÓN EN MONGODB
         * findOneAndUpdate recibe:
         * - Filtro: Para encontrar el producto.
         * - Datos: Los nuevos campos a actualizar ($set).
         * - Opciones: 
         * new: true -> Devuelve el producto ya cambiado.
         * runValidators: true -> Valida los datos nuevos contra el Schema.
         */
        const updatedProduct = await Product.findOneAndUpdate(
            { codigo: Number(codigo) }, 
            req.body, 
            { new: true, runValidators: true } 
        );
        
        /**
         * 5. VALIDACIÓN DE EXISTENCIA
         * Si el código no existe en la DB, 'updatedProduct' será null.
         */
        if (!updatedProduct) {
            return res.status(404).json({ 
                message: "No se encontró ningún producto con ese código para actualizar." 
            });
        }

        /**
         * 6. RESPUESTA EXITOSA
         * Enviamos el producto actualizado con un status 200 (OK).
         */
        res.status(200).json({
            message: "Producto actualizado correctamente",
            producto: updatedProduct
        });

    } catch (error) {
        /**
         * 7. MANEJO DE ERRORES
         * Capturamos fallos de validación (ej: precio inválido) o de conexión.
         */
        res.status(500).json({ 
            message: "Error al intentar actualizar el producto",
            error: error.message 
        });
    }
};

// 8. Exportamos la función para que el enrutador la use con el método PUT
module.exports = updateProduct;