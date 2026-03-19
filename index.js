// 1. IMPORTACIONES DE MÓDULOS ESENCIALES
const express = require('express'); 
const dotenv = require('dotenv'); 
const swaggerUi = require('swagger-ui-express'); 
const swaggerDocument = require('./swagger.config'); 
const cors = require('cors');


// IMPORTANTE: Traemos la conexión lógica que armamos en config/database.js
const connectDB = require('./config/database');

// Importamos el enrutador central
const routes = require('./routes/index'); 

// 2. CONFIGURACIÓN DE VARIABLES DE ENTORNO
// Esto debe ir antes que cualquier otra lógica que use process.env
dotenv.config();

// 3. INICIALIZACIÓN DE LA APP
const app = express();

/**
 * 4. CONEXIÓN A LA BASE DE DATOS
 * Usamos la función que ya tiene la lógica para Railway y Atlas.
 */
connectDB();

/**
 * 5. MIDDLEWARES
 */
app.use(express.json()); // Necesario para procesar el JSON de tus 30 productos
app.use(cors()); // Permite solicitudes desde cualquier origen (útil para desarrollo y pruebas)
/**
 * 6. DOCUMENTACIÓN (Swagger)
 * Tu API interactiva estará disponible en /api-docs
 */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/**
 * 7. REGISTRO DE RUTAS
 * Todas tus rutas de electrónicos empezarán con /api/productos
 */
app.use('/api', routes);

/**
 * 8. MANEJO DE RUTAS NO ENCONTRADAS (404)
 */
app.use((req, res) => {
    res.status(404).json({ 
        message: "Lo sentimos, la ruta que buscas no existe. Probá en /api-docs para ver las disponibles." 
    });
});

/**
 * 9. PUESTA EN MARCHA DEL SERVIDOR
 * El puerto es dinámico para que Railway pueda asignarlo.
 */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`--------------------------------------------------`);
    console.log(`🚀 Servidor activo en: http://localhost:${PORT}`);
    console.log(`📖 Documentación: http://localhost:${PORT}/api-docs`);
    console.log(`--------------------------------------------------`);
});

// Exportamos para posibles tests automatizados
module.exports = app;