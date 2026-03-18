// 1. IMPORTACIÓN DEL MODELO
// Requerimos el modelo Product para poder consultar la colección en la base de datos.
const Product = require('../../models/Product');

/**
 * CONTROLADOR PARA OBTENER TODOS LOS PRODUCTOS
 * Se encarga de traer la lista completa de documentos de la colección 'products'.
 */
const getAllProducts = async (req, res) => {
    try {
        /**
         * 2. CONSULTA GENERAL
         * .find() es el método de Mongoose para buscar documentos.
         * Al no pasarle ningún objeto de filtro (está vacío), Mongoose 
         * interpreta que debe traer TODOS los productos existentes.
         * Usamos 'await' porque es una operación que toma tiempo en la base de datos.
         */
        const products = await Product.find();

        /**
         * 3. RESPUESTA EXITOSA
         * Enviamos un status 200 (OK), que indica que la petición fue procesada correctamente.
         * Devolvemos el array de objetos 'products' en formato JSON.
         */
        res.status(200).json(products);

    } catch (error) {
        /**
         * 4. GESTIÓN DE ERRORES DE SERVIDOR
         * Si falla la conexión con MongoDB o hay un error interno, devolvemos status 500.
         * Incluimos el mensaje de error para facilitar el debug durante el desarrollo.
         */
        res.status(500).json({ 
            message: "Error al obtener la lista de productos", 
            error: error.message 
        });
    }
};

// Exportamos la función para que el router la asocie al método GET (/)
module.exports = getAllProducts;