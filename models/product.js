const mongoose = require('mongoose');

/**
 * DEFINICIÓN DEL ESQUEMA (Schema)
 * El esquema define la estructura de los documentos que guardaremos en la colección 'products'.
 */
const productSchema = new mongoose.Schema({
    codigo: { 
        type: Number, 
        required: [true, 'El código es obligatorio'], // Mensaje de error personalizado
        unique: true // Evita que existan dos productos con el mismo código
    },
    nombre: { 
        type: String, 
        required: [true, 'El nombre es obligatorio'],
        trim: true // Elimina espacios en blanco accidentales al principio y al final
    },
    precio: { 
        type: Number, 
        required: [true, 'El precio es obligatorio'],
        min: [0, 'El precio no puede ser un valor negativo'] // Validación de valor mínimo
    },
    categoria: { 
        type: [String], // Define que es un arreglo de cadenas de texto
        required: [true, 'Debe especificar al menos una categoría'] 
    },

}, { 
    // CONFIGURACIONES ADICIONALES
    versionKey: false, // Elimina el campo __v que Mongoose añade por defecto
    timestamps: true   // Crea automáticamente los campos 'createdAt' y 'updatedAt'
});

/**
 * EXPORTACIÓN DEL MODELO
 * 'Product' es el nombre del modelo. 
 * Mongoose buscará automáticamente la colección llamada 'products' (en plural) en tu base de datos.
 */
module.exports = mongoose.model('Product', productSchema);