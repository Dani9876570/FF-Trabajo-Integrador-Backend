// 1. IMPORTACIÓN DEL MODELO
// Traemos el modelo de Producto para comunicarnos con la colección en MongoDB Atlas.
const Product = require('../../models/Product'); 

// 2. IMPORTACIÓN DE LOS DATOS
// Traemos el archivo JSON corregido con el array de 30 productos electrónicos.
const productsData = require('../../data/electronicos.json'); 

/**
 * CONTROLADOR PARA LA CARGA MASIVA (BULK CREATE)
 * Este endpoint permite insertar muchos documentos de una sola vez de forma eficiente.
 */
const postProductoMasivo = async (req, res) => {
    try {
        /**
         * 3. LIMPIEZA PREVIA (Opcional pero Recomendado)
         * Borramos los productos existentes antes de la carga masiva. 
         * Esto evita errores de "Código Duplicado" si ejecutás el test varias veces.
         */
        await Product.deleteMany({}); 

        /**
         * 4. INSERCIÓN MASIVA
         * .insertMany() recibe el arreglo de objetos de tu JSON.
         * Mongoose validará que cada producto cumpla con tu Schema (codigo, nombre, precio, etc.).
         */
        const products = await Product.insertMany(productsData);

        /**
         * 5. RESPUESTA DE ÉXITO
         * Status 201 (Created): Indica que se crearon recursos en el servidor.
         * Devolvemos el mensaje y la cantidad de productos insertados.
         */
        res.status(201).json({ 
            message: "¡Carga masiva finalizada con éxito!", 
            detalles: {
                totalInsertados: products.length,
                origen: "electronicos.json"
            }
        });

    } catch (error) {
        /**
         * 6. CONTROL DE ERRORES
         * Capturamos errores de validación, conexión o de formato en el JSON.
         */
        res.status(500).json({ 
            message: "Error durante el proceso de carga masiva", 
            error: error.message 
        });
    }
};

// 7. Exportamos la función para que productRoutes.js la asocie al método POST /masivo
module.exports = postProductoMasivo;