// 1. IMPORTACIONES
// Traemos el modelo de Producto para interactuar con MongoDB
const Product = require('../models/Product');
// Traemos el JSON de electrónicos para la carga masiva
const productsData = require('../data/electronicos.json');

/**
 * SERVICIO DE PRODUCTOS (productService)
 * Este objeto contiene todas las funciones que manipulan los datos.
 * Los controladores llamarán a estos métodos.
 */
const productService = {

    /**
     * Obtener todos los productos de la base de datos.
     */
    getAll: async () => {
        // .find() sin parámetros devuelve todo el catálogo
        return await Product.find();
    },

    /**
     * Buscar un producto por su código de negocio (campo 'codigo').
     */
    getByCode: async (codigo) => {
        // Buscamos un único documento que coincida con el código numérico
        return await Product.findOne({ codigo: Number(codigo) });
    },

    /**
     * Buscar productos por una categoría específica.
     */
    getByCategory: async (nombreCategoria) => {
        // Mongoose filtra dentro del array 'categoria' automáticamente
        return await Product.find({ categoria: nombreCategoria });
    },

    /**
     * Buscar productos dentro de un rango de precio.
     */
    getByPriceRange: async (min, max) => {
        // $gte: mayor o igual | $lte: menor o igual
        return await Product.find({
            precio: { $gte: Number(min), $lte: Number(max) }
        });
    },

    /**
     * Buscar productos por coincidencia de texto en el nombre.
     */
    getByTerm: async (termino) => {
        // Usamos una Expresión Regular para búsqueda parcial e insensible a mayúsculas
        return await Product.find({
            nombre: { $regex: termino, $options: 'i' }
        });
    },

    /**
     * Crear un nuevo producto manualmente.
     */
    create: async (dataProducto) => {
        // Guardamos el nuevo producto según los datos del body
        return await Product.create(dataProducto);
    },

    /**
     * Realizar la carga masiva desde el archivo JSON.
     */
    bulkCreate: async () => {
        // Opcional: Podrías limpiar la base antes con await Product.deleteMany({});
        return await Product.insertMany(productsData);
    },

    /**
     * Actualizar los datos de un producto por su código.
     */
    update: async (codigo, nuevosDatos) => {
        // { new: true } devuelve el objeto ya modificado
        return await Product.findOneAndUpdate(
            { codigo: Number(codigo) },
            nuevosDatos,
            { new: true, runValidators: true }
        );
    },

    /**
     * Eliminar un producto de la base de datos por su código.
     */
    delete: async (codigo) => {
        // Busca y remueve el documento que coincida con el código
        return await Product.findOneAndDelete({ codigo: Number(codigo) });
    }
};

// Exportamos el servicio para que sea usado por los controladores
module.exports = productService;