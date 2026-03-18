// 1. IMPORTACIONES DE MÓDULOS ESENCIALES
const express = require('express'); 
const mongoose = require('mongoose'); 
const dotenv = require('dotenv'); 
const swaggerUi = require('swagger-ui-express'); // Importante para la documentación
const swaggerDocument = require('./swagger.config'); // Importamos tu config de Swagger

/**
 * CORRECCIÓN DE RUTA: 
 * Como no tenés 'src', apuntamos directo a la carpeta 'routes' en la raíz.
 */
const routes = require('./routes/index'); 

// 2. CONFIGURACIÓN DE VARIABLES DE ENTORNO
dotenv.config();

// 3. INICIALIZACIÓN DE LA APP
const app = express();

/**
 * 4. MIDDLEWARES
 */
app.use(express.json()); 

/**
 * 5. DOCUMENTACIÓN (Swagger)
 * Agregamos esto para que puedas ver tu API interactiva en /api-docs
 */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/**
 * 6. CONEXIÓN A LA BASE DE DATOS
 */
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Conexión exitosa a la base de datos de Electrónicos'))
    .catch((error) => console.error('❌ Error crítico al conectar a MongoDB:', error));

/**
 * 7. REGISTRO DE RUTAS
 * Ahora usa las rutas corregidas sin el prefijo 'src'.
 */
app.use('/api', routes);

/**
 * 8. MANEJO DE RUTAS NO ENCONTRADAS (404)
 */
app.use((req, res) => {
    res.status(404).json({ 
        message: "Lo sentimos, la ruta que buscas no existe. Probá en /api-docs" 
    });
});

/**
 * 9. PUESTA EN MARCHA DEL SERVIDOR
 */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`--------------------------------------------------`);
    console.log(`🚀 Servidor activo en: http://localhost:${PORT}`);
    console.log(`📖 Documentación: http://localhost:${PORT}/api-docs`);
    console.log(`--------------------------------------------------`);
});

module.exports = app;