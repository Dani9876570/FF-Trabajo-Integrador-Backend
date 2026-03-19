// 1. IMPORTACIÓN DEL MODELO
// Requerimos el modelo Product para poder consultar la colección en la base de datos de Atlas.
const Product = require('../models/product'); // Nota: Solo lleva dos puntos (..), no cuatro.

/**
 * CONTROLADOR PARA OBTENER TODOS LOS PRODUCTOS
 * Se encarga de traer la lista completa de documentos de la colección 'products'.
 */
const getAllProducts = async (req, res) => {
    try {
        /**
         * 2. CONSULTA GENERAL CON ORDENAMIENTO
         * .find(): Busca todos los documentos al no tener filtros.
         * .sort({ codigo: 1 }): Ordena los resultados por el campo 'codigo' de forma ascendente (1).
         * Esto hace que tu lista de 30 productos se vea organizada del 1 al 30.
         */
        const products = await Product.find().sort({ codigo: 1 });

        /**
         * 3. RESPUESTA EXITOSA
         * Si la base de datos está vacía, 'products' será un array vacío [].
         * Enviamos status 200 (OK) y el array de objetos en formato JSON.
         */
        res.status(200).json(products);

    } catch (error) {
        /**
         * 4. GESTIÓN DE ERRORES DE SERVIDOR
         * Si falla la conexión o hay un error interno (ej: error de sintaxis), devolvemos 500.
         */
        res.status(500).json({ 
            message: "Error al obtener la lista de productos", 
            error: error.message 
        });
    }
};

// 5. Exportamos la función para que el router la asocie al método GET (/)
module.exports = getAllProducts;