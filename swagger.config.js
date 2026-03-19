/**
 * CONFIGURACIÓN DE SWAGGER (OpenAPI 3.0)
 * Este objeto define la estructura y documentación de la API para que sea 
 * interpretada por 'swagger-ui-express' y se visualice en /api-docs.
 */
const swaggerDocument = {
  // Versión de la especificación OpenAPI utilizada
  openapi: '3.0.0',

  // 1. INFORMACIÓN GENERAL DE LA API
  info: {
    title: 'API de Productos Electrónicos',
    version: '1.0.0',
    description: 'API REST para la gestión de catálogo de productos electrónicos. Incluye filtrado por código, precio, categoría y carga masiva.',
    contact: {
      name: 'Daniela - Web Developer',
      email: 'daniela@example.com'
    }
  },

  // 2. CONFIGURACIÓN DE SERVIDORES
  // Define las URLs base donde Swagger realizará las peticiones de prueba.
  servers: [
    {
      /**
       * Lógica de detección: Si existe la variable RAILWAY_PUBLIC_DOMAIN (producida por Railway),
       * usa esa URL segura (HTTPS). De lo contrario, asume que estamos en desarrollo Local.
       */
      url: process.env.RAILWAY_PUBLIC_DOMAIN 
        ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}` 
        : 'http://localhost:3000',
      description: process.env.RAILWAY_PUBLIC_DOMAIN ? 'Servidor Producción (Railway)' : 'Servidor Local (Desarrollo)'
    }
  ],

  // 3. ETIQUETAS (TAGS)
  // Permiten agrupar y organizar visualmente los endpoints en la interfaz.
  tags: [
    { name: 'Productos', description: 'Operaciones CRUD y filtros de electrónicos' },
    { name: 'Sistema', description: 'Carga masiva y utilidades' }
  ],

  // 4. MAPEO DE RUTAS (PATHS)
  // Aquí se describe detalladamente cada endpoint de la API.
  paths: {
    // Endpoints para obtener todos o crear uno nuevo
    '/api/productos': {
      get: {
        tags: ['Productos'],
        summary: 'Obtener todos los productos',
        responses: {
          '200': {
            description: 'Lista de productos recuperada con éxito',
            content: { 
              'application/json': { 
                schema: { type: 'array', items: { $ref: '#/components/schemas/Product' } } 
              } 
            }
          }
        }
      },
      post: {
        tags: ['Productos'],
        summary: 'Crear un producto nuevo',
        requestBody: {
          required: true,
          content: { 
            'application/json': { schema: { $ref: '#/components/schemas/ProductInput' } } 
          }
        },
        responses: { '201': { description: 'Producto creado' } }
      }
    },

    // Endpoint de búsqueda parcial por término de texto
    '/api/productos/buscar': {
      get: {
        tags: ['Productos'],
        summary: 'Buscador inteligente',
        description: 'Busca productos por coincidencia de texto en el nombre.',
        parameters: [
          { 
            name: 'q', 
            in: 'query', 
            description: 'Término de búsqueda (ej: Samsung)', 
            required: true, 
            schema: { type: 'string' } 
          }
        ],
        responses: { '200': { description: 'Resultados encontrados' } }
      }
    },

    // Endpoint administrativo para cargar los datos del JSON inicial
    '/api/productos/masivo': {
      post: {
        tags: ['Sistema'],
        summary: 'Carga masiva desde JSON',
        description: 'Lee el archivo electronicos.json e inserta todos los productos en la DB.',
        responses: { '201': { description: 'Carga masiva completada con éxito' } }
      }
    },

    // Operaciones específicas sobre un producto usando su código único
    '/api/productos/{codigo}': {
      get: {
        tags: ['Productos'],
        summary: 'Buscar por código numérico',
        parameters: [{ name: 'codigo', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: { '200': { description: 'Producto encontrado' }, '404': { description: 'No encontrado' } }
      },
      put: {
        tags: ['Productos'],
        summary: 'Actualizar producto por código',
        parameters: [{ name: 'codigo', in: 'path', required: true, schema: { type: 'integer' } }],
        requestBody: {
          content: { 'application/json': { schema: { $ref: '#/components/schemas/ProductInput' } } }
        },
        responses: { '200': { description: 'Actualizado correctamente' } }
      },
      delete: {
        tags: ['Productos'],
        summary: 'Eliminar producto por código',
        parameters: [{ name: 'codigo', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: { '200': { description: 'Producto eliminado' } }
      }
    },

    // Filtrado por nombre exacto de categoría
    '/api/productos/categoria/{nombre}': {
      get: {
        tags: ['Productos'],
        summary: 'Filtrar por categoría',
        parameters: [{ name: 'nombre', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'Éxito' } }
      }
    },

    // Filtrado por rango numérico de precios
    '/api/productos/precio/{min}-{max}': {
      get: {
        tags: ['Productos'],
        summary: 'Filtrar por rango de precio',
        parameters: [
          { name: 'min', in: 'path', required: true, schema: { type: 'number' } },
          { name: 'max', in: 'path', required: true, schema: { type: 'number' } }
        ],
        responses: { '200': { description: 'Éxito' } }
      }
    }
  },

  // 5. COMPONENTES (ESQUEMAS)
  // Definiciones de modelos de datos reutilizables para las respuestas y peticiones.
  components: {
    schemas: {
      // Esquema que representa un producto completo (incluyendo el ID de MongoDB)
      Product: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          codigo: { type: 'number' },
          nombre: { type: 'string' },
          precio: { type: 'number' },
          categoria: { type: 'array', items: { type: 'string' } },
          imagen: { type: 'string' },
          descripcion: { type: 'string' }
        }
      },
      // Esquema para la entrada de datos (usado en POST y PUT)
      ProductInput: {
        type: 'object',
        required: ['codigo', 'nombre', 'precio', 'categoria'],
        properties: {
          codigo: { type: 'number' },
          nombre: { type: 'string' },
          precio: { type: 'number' },
          categoria: { type: 'array', items: { type: 'string' } },
          imagen: { type: 'string' },
          descripcion: { type: 'string' }
        }
      }
    }
  }
};

// Exportamos el objeto de configuración para que sea importado en index.js
module.exports = swaggerDocument;