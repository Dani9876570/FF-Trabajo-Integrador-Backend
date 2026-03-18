/**
 * Configuración de Swagger (OpenAPI 3.0) para el proyecto de Electrónicos
 * Este objeto define manualmente los endpoints para que aparezcan en /api-docs
 */
const swaggerDocument = {
  openapi: '3.0.0', // Especificación estándar

  // 1. INFORMACIÓN GENERAL
  info: {
    title: 'API de Productos Electrónicos',
    version: '1.0.0',
    description: 'API REST para la gestión de catálogo de productos electrónicos. Incluye filtrado por código, precio, categoría y carga masiva.',
    contact: {
      name: 'Daniela - Web Developer',
      email: 'daniela@example.com'
    }
  },

  // 2. SERVIDORES
  servers: [
    {
      // Soporte para Railway o Localhost
      url: process.env.RAILWAY_PUBLIC_DOMAIN 
        ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}` 
        : 'http://localhost:3000',
      description: process.env.RAILWAY_PUBLIC_DOMAIN ? 'Servidor Producción (Railway)' : 'Servidor Local (Desarrollo)'
    }
  ],

  // 3. ETIQUETAS (Categorías)
  tags: [
    { name: 'Productos', description: 'Operaciones CRUD y filtros de electrónicos' },
    { name: 'Sistema', description: 'Carga masiva y utilidades' }
  ],

  // 4. MAPEO DE RUTAS (PATHS)
  paths: {
    '/api/productos': {
      get: {
        tags: ['Productos'],
        summary: 'Obtener todos los productos',
        responses: {
          '200': {
            description: 'Lista de productos recuperada con éxito',
            content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Product' } } } }
          }
        }
      },
      post: {
        tags: ['Productos'],
        summary: 'Crear un producto nuevo',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/ProductInput' } } }
        },
        responses: { '201': { description: 'Producto creado' } }
      }
    },
    '/api/productos/masivo': {
      post: {
        tags: ['Sistema'],
        summary: 'Carga masiva desde JSON',
        description: 'Lee el archivo electronicos.json e inserta todos los productos en la DB.',
        responses: { '201': { description: 'Carga masiva completada' } }
      }
    },
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
    '/api/productos/categoria/{nombre}': {
      get: {
        tags: ['Productos'],
        summary: 'Filtrar por categoría',
        parameters: [{ name: 'nombre', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'Éxito' } }
      }
    },
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
  components: {
    schemas: {
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

module.exports = swaggerDocument;