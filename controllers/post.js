// 1. IMPORTACIÓN DEL MODELO
// Traemos el modelo Product para poder comunicarnos con la colección en MongoDB.
const Product = require('../../models/Product');

/**
 * CONTROLADOR PARA CREAR UN PRODUCTO INDIVIDUAL
 * Recibe los datos desde el cuerpo de la petición (req.body) y los guarda en MongoDB Atlas.
 */
const createProduct = async (req, res) => {
    try {
        // 2. VALIDACIÓN DE ENTRADA BÁSICA
        // Verificamos que el cuerpo de la petición (body) contenga datos.
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ 
                message: "No se enviaron datos para crear el producto." 
            });
        }

        /**
         * 3. CREACIÓN DEL DOCUMENTO
         * .create() realiza la validación contra el Schema y guarda en la DB.
         * Mongoose automáticamente rechazará la carga si falta un campo 'required'
         * o si el 'codigo' ya existe (gracias al unique: true).
         */
        const newProduct = await Product.create(req.body);

        /**
         * 4. RESPUESTA DE ÉXITO
         * Status 201: El recurso fue creado exitosamente.
         * Devolvemos el producto completo (incluyendo el _id generado por MongoDB).
         */
        res.status(201).json({
            message: "Producto creado con éxito",
            producto: newProduct
        });

    } catch (error) {
        /**
         * 5. GESTIÓN DE ERRORES (Validation / Duplicate Key)
         * Usamos 400 (Bad Request) porque el error suele ser un dato mal formado 
         * o un código que ya existe en la base de datos.
         */
        res.status(400).json({ 
            message: "Error al crear el producto. Verifique los datos enviados.", 
            error: error.message 
        });
    }
};

// 6. Exportamos la función para que el router la asocie al método POST
module.exports = createProduct;