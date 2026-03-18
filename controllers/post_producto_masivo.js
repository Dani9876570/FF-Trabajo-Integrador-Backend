// 1. IMPORTACIÓN DEL MODELO
// Traemos el modelo de Producto para poder comunicarnos con la colección en MongoDB.
const Product = require('../../models/Product'); 

// 2. IMPORTACIÓN DE LOS DATOS
// Traemos el archivo JSON que contiene la lista de objetos (productos electrónicos).
const productsData = require('../../data/electronicos.json'); 

/**
 * CONTROLADOR PARA LA CARGA MASIVA (BULK CREATE)
 * Este endpoint permite insertar muchos documentos de una sola vez.
 */
const postProductoMasivo = async (req, res) => {
    try {
        /**
         * 3. INSERCIÓN MASIVA
         * .insertMany() es un método de Mongoose que recibe un arreglo de objetos.
         * Es mucho más eficiente que hacer un .create() por cada producto individual.
         * Mongoose validará cada objeto contra tu esquema antes de guardarlo.
         */
        const products = await Product.insertMany(productsData);

        /**
         * 4. RESPUESTA DE ÉXITO
         * Enviamos un status 201 (Creado) indicando que la carga fue exitosa.
         * Devolvemos la cantidad (count) de productos que se guardaron realmente.
         */
        res.status(201).json({ 
            message: "¡Carga masiva de electrónicos finalizada con éxito!", 
            count: products.length 
        });

    } catch (error) {
        /**
         * 5. CONTROL DE ERRORES
         * Un error común aquí es el de "Duplicate Key" si intentás cargar dos veces 
         * productos con el mismo 'codigo' (ya que pusimos unique: true en el modelo).
         */
        res.status(500).json({ 
            message: "Error durante el proceso de carga masiva", 
            error: error.message 
        });
    }
};

// Exportamos la función para que el enrutador la asocie al método POST /masivo
module.exports = postProductoMasivo;