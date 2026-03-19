// 1. Importamos Mongoose para conectarnos a la base de datos
const mongoose = require("mongoose");
// 2. Importamos Dotenv para leer variables de entorno (como usuarios y contraseñas)
const dotenv = require("dotenv");

// 3. Cargamos la configuración de variables de entorno.
// En local buscará el archivo .env, pero en Railway leerá directamente del sistema.
dotenv.config();

/**
 * FUNCIÓN DE CONEXIÓN (ASÍNCRONA)
 * Usamos async/await porque la conexión a internet con la DB puede demorar.
 */
const connectDB = async () => {
  try {
    /**
     * 4. OBTENCIÓN DE VARIABLES
     * Intentamos obtener MONGO_URL (que es el string completo que da Railway)
     * o las piezas sueltas (DB_USER, DB_PASS, etc.) para armar la conexión.
     */
    const {
      DB_PROTOCOL,
      DB_USER,
      DB_PASS,
      DB_HOST,
      DB_NAME,
      DB_OPTIONS,
      MONGO_URL,
    } = process.env;

    /**
     * 5. CONSTRUCCIÓN DE LA URI
     * Si MONGO_URL existe (prioridad Railway), usamos esa.
     * Si no existe, la armamos uniendo todas las partes (formato estándar de MongoDB).
     */
    // Usamos exactamente los nombres que configuraste en el panel de Railway
    const uri =
      process.env.MONGO_URL ||
      `${process.env.DB_PROTOCOL}://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}${process.env.DB_OPTIONS || ""}`;

    // 6. EJECUCIÓN DE LA CONEXIÓN
    // mongoose.connect es la función que efectivamente abre la puerta a la base de datos.
    await mongoose.connect(uri);

    // 7. LOGS DE CONFIRMACIÓN
    // Si llegamos acá sin errores, mostramos estos mensajes en la consola de Railway.
    console.log("---------------------------------------------------------");
    console.log(`✅ Conexión exitosa a MongoDB`);
    console.log(
      `🌍 Entorno detectado: ${process.env.NODE_ENV || "producción"}`,
    );
    console.log("---------------------------------------------------------");
  } catch (error) {
    /**
     * 8. MANEJO DE ERRORES
     * Si la contraseña está mal o el servidor no responde, mostramos el mensaje exacto.
     */
    console.error("❌ Error crítico al conectar a MongoDB:", error.message);

    // Cerramos el proceso con código (1) para avisarle a Railway que la app falló.
    process.exit(1);
  }
};

// 9. Exportamos la función para que el index.js pueda usarla al arrancar la app.
module.exports = connectDB;
