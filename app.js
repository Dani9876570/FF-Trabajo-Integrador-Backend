### Variables Globales
@hostname = localhost
@port = 3000
@host = http://{{hostname}}:{{port}}/api

### 1. BIENVENIDA / TEST DE CONEXIÓN
GET {{host}}/
Content-Type: application/json

### ---------------------------------------------------------
### SECCIÓN DE PRODUCTOS
### ---------------------------------------------------------

### 2. CARGA MASIVA (Ejecutar primero para llenar la base de datos)
POST {{host}}/productos/masivo
Content-Type: application/json

### 3. OBTENER TODOS LOS PRODUCTOS
GET {{host}}/productos
Content-Type: application/json

### 4. BUSCAR POR CÓDIGO (Ejemplo: Código 101)
GET {{host}}/productos/101
Content-Type: application/json

### 5. FILTRAR POR CATEGORÍA (Ejemplo: Celulares)
GET {{host}}/productos/categoria/Celulares
Content-Type: application/json

### 6. FILTRAR POR RANGO DE PRECIO (Ejemplo: entre 100 y 500)
GET {{host}}/productos/precio/100-500
Content-Type: application/json

### 7. BUSCADOR POR TÉRMINO (Ejemplo: busca "Samsung")
GET {{host}}/productos/buscar?q=Samsung
Content-Type: application/json

### 8. CREAR UN PRODUCTO NUEVO (Manual)
POST {{host}}/productos
Content-Type: application/json

{
    "codigo": 999,
    "nombre": "Teclado Mecánico RGB Pro",
    "precio": 120.50,
    "categoria": ["Periféricos", "Gaming"],
    "imagen": "https://link-a-la-foto.jpg",
    "descripcion": "Teclado con switches blue y retroiluminación personalizada."
}

### 9. ACTUALIZAR UN PRODUCTO (Por código)
PUT {{host}}/productos/999
Content-Type: application/json

{
    "precio": 99.99,
    "descripcion": "Oferta especial: Teclado con switches blue."
}

### 10. ELIMINAR UN PRODUCTO (Por código)
DELETE {{host}}/productos/999
Content-Type: application/json