// 1. IMPORTACIONES
// Traemos el modelo de Producto para interactuar con MongoDB Atlas
const Product = require('../models/Product');
// Traemos el JSON de electrónicos para la carga masiva de los 30 productos
const productsData = require('../data/electronicos.json');

/**
 * SERVICIO DE PRODUCTOS (productService)
 * Este objeto contiene toda la lógica de acceso a datos (Data Access Layer).
 * Centraliza las consultas a Mongoose para que los controladores sean más simples.
 */
const productService = {

    /**
     * Obtener todos los productos de la base de datos.
     * Los devuelve ordenados por código de forma ascendente.
     */
    getAll: async () => {
        return await Product.find().sort({ codigo: 1 });
    },

    /**
     * Buscar un producto por su código de negocio único.
     */
    getByCode: async (codigo) => {
        return await Product.findOne({ codigo: Number(codigo) });
    },

    /**
     * Buscar productos por una categoría específica.
     * Aprovecha que Mongoose busca dentro de arrays automáticamente.
     */
    getByCategory: async (nombreCategoria) => {
        return await Product.find({ 
            categoria: { $regex: new RegExp(nombreCategoria, 'i') } 
        });
    },

    /**
     * Buscar productos dentro de un rango de precio definido por el usuario.
     */
    getByPriceRange: async (min, max) => {
        return await Product.find({
            precio: { $gte: Number(min), $lte: Number(max) }
        });
    },

    /**
     * Buscar productos por coincidencia de texto en el nombre (Buscador).
     */
    getByTerm: async (termino) => {
        return await Product.find({
            nombre: { $regex: termino, $options: 'i' }
        });
    },

    /**
     * Crear un nuevo producto individual validando los datos contra el Schema.
     */
    create: async (dataProducto) => {
        return await Product.create(dataProducto);
    },

    /**
     * Realizar la carga masiva desde el archivo JSON de electrónicos.
     * Primero limpia la colección para evitar errores de duplicados.
     */
    bulkCreate: async () => {
        await Product.deleteMany({}); // Limpieza preventiva
        return await Product.insertMany(productsData);
    },

    /**
     * Actualizar los datos de un producto buscando por su código único.
     * runValidators: true asegura que los cambios respeten las reglas del modelo.
     */
    update: async (codigo, nuevosDatos) => {
        return await Product.findOneAndUpdate(
            { codigo: Number(codigo) },
            nuevosDatos,
            { new: true, runValidators: true }
        );
    },

    /**
     * Eliminar un producto de la base de datos definitivamente.
     */
    delete: async (codigo) => {
        return await Product.findOneAndDelete({ codigo: Number(codigo) });
    }
};

// Exportamos el servicio para que sea consumido por los controladores (Controllers)
module.exports = productService;