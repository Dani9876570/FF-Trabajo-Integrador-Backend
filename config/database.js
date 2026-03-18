// Requerimos las dependencias necesarias: mongoose para la DB y dotenv para las variables
const mongoose = require('mongoose');
const dotenv = require('dotenv');

/**
 * 1. CONFIGURACIÓN DINÁMICA DE ENTORNOS
 * Cargamos el archivo .env correspondiente según la variable de entorno NODE_ENV.
 * Si NODE_ENV no existe, usamos por defecto '.env.development'.
 */
dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

/**
 * 2. FUNCIÓN DE CONEXIÓN (ASÍNCRONA)
 * Intentamos conectar con los parámetros obtenidos de las variables de entorno.
 */
const connectDB = async () => {
    try {
        // Desestructuramos las variables del proceso para que el código sea más limpio
        const { DB_PROTOCOL, DB_USER, DB_PASS, DB_HOST, DB_NAME, DB_OPTIONS } = process.env;
        
        /**
         * 3. CONSTRUCCIÓN DE LA URI (CADENA DE CONEXIÓN)
         * Unimos todas las piezas en un solo string siguiendo el formato oficial de MongoDB.
         * El operador || '' al final evita errores si DB_OPTIONS no está definida.
         */
        const uri = `${DB_PROTOCOL}://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}${DB_OPTIONS || ''}`;

        // 4. CONEXIÓN A LA BASE DE DATOS
        // mongoose.connect devuelve una promesa, por eso usamos 'await'
        await mongoose.connect(uri);

        // 5. MENSAJES DE ÉXITO (Log visual en consola)
        console.log('---------------------------------------------------------');
        console.log(`✅ Conexión exitosa a MongoDB`);
        console.log(`🌍 Entorno: ${process.env.NODE_ENV || 'development'}`);
        console.log(`📦 Base de datos: ${DB_NAME}`);
        console.log('---------------------------------------------------------');

    } catch (error) {
        // 6. MANEJO DE ERRORES
        // Si algo falla (clave incorrecta, host caído, etc.), mostramos el error y cerramos la app
        console.error('❌ Error al conectar a MongoDB:', error.message);
        process.exit(1); 
    }
};

// Exportamos la función para que pueda ser ejecutada desde el index.js (archivo principal)
module.exports = connectDB;