// 1. IMPORTACIONES
const express = require('express'); 
const dotenv = require('dotenv'); 
const cors = require('cors');

// 2. CONFIGURACIÓN DE VARIABLES (Prioridad: Archivo específico en Local, Variables de Sistema en Railway)
if (process.env.NODE_ENV === 'development') {
    dotenv.config({ path: '.env.development' });
} else if (process.env.NODE_ENV === 'production' && !process.env.RAILWAY_STATIC_URL) {
    // Esto es solo para cuando corres 'npm start' en TU computadora
    dotenv.config({ path: '.env.production' });
} else {
    dotenv.config(); // Para Railway real
}

// 3. IMPORTACIÓN DE CONEXIÓN Y RUTAS
const connectDB = require('./config/database');
const swaggerUi = require('swagger-ui-express'); 
const swaggerDocument = require('./swagger.config'); 
const routes = require('./routes/index'); 

// 4. INICIALIZACIÓN
const app = express();
connectDB();

// 5. MIDDLEWARES
app.use(express.json());
app.use(cors());

// 6. DOCUMENTACIÓN
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 7. RUTAS
app.use('/api', routes);

// 8. 404
app.use((req, res) => {
    res.status(404).json({ 
        message: "Lo sentimos, la ruta que buscas no existe. Probá en /api-docs para ver las disponibles." 
    });
});

/**
 * 9. PUESTA EN MARCHA DEL SERVIDOR
 */
const PORT = process.env.PORT || 3000;
const RAILWAY_LINK = 'https://ff-trabajo-integrador-backend-production.up.railway.app';

app.listen(PORT, () => {
    // Si estamos en production, mostramos el link de Railway. Si no, el de localhost.
    const isProd = process.env.NODE_ENV === 'production';
    const baseLink = isProd ? RAILWAY_LINK : `http://localhost:${PORT}`;

    console.log(`--------------------------------------------------`);
    console.log(`🚀 Servidor activo en: ${baseLink}`);
    console.log(`📖 Documentación: ${baseLink}/api-docs`);
    console.log(`📦 Ver Productos: ${baseLink}/api/productos`);
    console.log(`🌍 Entorno actual: ${process.env.NODE_ENV}`);
    console.log(`--------------------------------------------------`);
});

module.exports = app;