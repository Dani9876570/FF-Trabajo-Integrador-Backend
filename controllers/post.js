// 1. IMPORTACIÓN DEL MODELO
// Requerimos el modelo Product para poder realizar operaciones de escritura en la base de datos.
const Product = require('../../models/Product');

/**
 * CONTROLADOR PARA CREAR UN PRODUCTO INDIVIDUAL
 * Recibe los datos desde el cuerpo de la petición (req.body) y los guarda en MongoDB.
 */
const createProduct = async (req, res) => {
    try {
        /**
         * 2. CREACIÓN DEL DOCUMENTO
         * .create() es un método de Mongoose que hace dos cosas en una:
         * - Valida que los datos de 'req.body' cumplan con el esquema (Product.js).
         * - Si son válidos, los guarda automáticamente en la colección.
         */
        const newProduct = await Product.create(req.body);

        /**
         * 3. RESPUESTA DE ÉXITO
         * Enviamos un status 201 (Created), que es el código HTTP correcto para creaciones.
         * Devolvemos el objeto del producto tal cual se guardó en la DB.
         */
        res.status(201).json(newProduct);

    } catch (error) {
        /**
         * 4. GESTIÓN DE ERRORES DE VALIDACIÓN
         * Usamos status 400 (Bad Request) porque generalmente el error aquí es del cliente:
         * - Falta un campo obligatorio (como el nombre).
         * - El código está duplicado.
         * - El tipo de dato es incorrecto (ej: texto en lugar de número en el precio).
         */
        res.status(400).json({ 
            message: "Error al crear el producto. Verifique los datos enviados.", 
            error: error.message 
        });
    }
};

// Exportamos la función para que el router la use en el método POST
module.exports = createProduct;