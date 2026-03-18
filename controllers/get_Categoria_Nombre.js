// Importamos el modelo de Producto para realizar consultas a la colección de electrónicos
const Product = require('../../models/Product');

/**
 * CONTROLADOR PARA FILTRAR POR CATEGORÍA
 * Permite obtener todos los productos que pertenecen a una categoría específica.
 */
const getByCategory = async (req, res) => {
    try {
        /**
         * 1. OBTENCIÓN DEL PARÁMETRO
         * Extraemos el 'nombre' de la categoría desde la URL.
         * Ejemplo de ruta: /productos/categoria/Computacion
         */
        const { nombre } = req.params; 

        /**
         * 2. BÚSQUEDA EN ARREGLO
         * Aunque 'categoria' es un Array en nuestro modelo ([String]), 
         * Mongoose es inteligente: si le pasamos un string, buscará todos los 
         * documentos donde ese string esté incluido dentro del arreglo.
         */
        const products = await Product.find({ categoria: nombre });

        /**
         * 3. RESPUESTA AL CLIENTE
         * Enviamos la lista de productos encontrados (si no hay ninguno, devolverá un array vacío []).
         * El código 200 indica que la petición fue exitosa.
         */
        res.status(200).json(products);

    } catch (error) {
        /**
         * 4. MANEJO DE EXCEPCIONES
         * Si ocurre un error técnico (falla de conexión, etc.), devolvemos un código 500.
         */
        res.status(500).json({ 
            message: "Error al filtrar por categoría",
            error: error.message 
        });
    }
};

// Exportamos la función para vincularla a la ruta en productRoutes.js
module.exports = getByCategory;