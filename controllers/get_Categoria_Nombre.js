// 1. Importamos el modelo de Producto para realizar consultas a la colección de electrónicos
const Product = require('../../models/Product');

/**
 * CONTROLADOR PARA FILTRAR POR CATEGORÍA
 * Permite obtener todos los productos que pertenecen a una categoría específica.
 */
const getByCategory = async (req, res) => {
    try {
        /**
         * 2. OBTENCIÓN DEL PARÁMETRO
         * Extraemos el 'nombre' de la categoría desde la URL.
         * Ejemplo de ruta: /api/productos/categoria/Computacion
         */
        const { nombre } = req.params; 

        /**
         * 3. BÚSQUEDA FLEXIBLE EN ARREGLO
         * Usamos una Expresión Regular con la bandera 'i' (case-insensitive).
         * Esto permite que si el usuario busca "audio", encuentre "Audio" o "AUDIO".
         * Mongoose buscará automáticamente si este string existe dentro del Array 'categoria'.
         */
        const products = await Product.find({ 
            categoria: { $regex: new RegExp(nombre, 'i') } 
        });

        /**
         * 4. VALIDACIÓN DE RESULTADOS
         * Si el array viene vacío, es bueno avisarle al usuario que esa categoría 
         * no existe o no tiene productos actualmente.
         */
        if (products.length === 0) {
            return res.status(404).json({
                message: `No se encontraron productos en la categoría: ${nombre}`
            });
        }

        /**
         * 5. RESPUESTA AL CLIENTE
         * Enviamos la lista de productos encontrados con código 200 (Éxito).
         */
        res.status(200).json(products);

    } catch (error) {
        /**
         * 6. MANEJO DE EXCEPCIONES
         * Si falla la conexión a MongoDB o hay un error de sintaxis, devolvemos 500.
         */
        res.status(500).json({ 
            message: "Error al filtrar por categoría",
            error: error.message 
        });
    }
};

// 7. Exportamos la función para vincularla a la ruta en productRoutes.js
module.exports = getByCategory;