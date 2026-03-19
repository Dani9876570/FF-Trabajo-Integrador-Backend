// 1. IMPORTACIONES DE MÓDULOS ESENCIALES
const express = require('express'); 
const dotenv = require('dotenv'); 
const cors = require('cors');

// 2. CONFIGURACIÓN DE VARIABLES DE ENTORNO (¡MOVER AQUÍ ARRIBA!)
// Primero configuramos dotenv para que todo lo que venga después ya tenga las variables
dotenv.config({ path: process.env.NODE_ENV === 'development' ? '.env.development' : '.env' });

// 3. AHORA SÍ, IMPORTAMOS LOS ARCHIVOS QUE USAN ESAS VARIABLES
const connectDB = require('./config/database');
const swaggerUi = require('swagger-ui-express'); 
const swaggerDocument = require('./swagger.config'); 
const routes = require('./routes/index'); 


// 4. INICIALIZACIÓN DE LA APP
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