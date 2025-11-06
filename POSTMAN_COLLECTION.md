# Colección de Postman - Backend Administrar Colores

## Configuración Base

- **Base URL**: `http://localhost:3001/api`
- **Content-Type**: `application/json`

## Endpoints

### 1. Listar todos los colores

**GET** `http://localhost:3001/api/colores`

**Headers:**
```
Content-Type: application/json
```

**Ejemplo de respuesta exitosa (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "nombreColor": "Azul",
      "codigo_hex": "#0000FF",
      "codigo_rgb": "rgb(0, 0, 255)",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "total": 1
}
```

---

### 2. Obtener un color por ID

**GET** `http://localhost:3001/api/colores/:id`

**Ejemplo:**
```
GET http://localhost:3001/api/colores/507f1f77bcf86cd799439011
```

**Headers:**
```
Content-Type: application/json
```

**Ejemplo de respuesta exitosa (200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "nombreColor": "Azul",
    "codigo_hex": "#0000FF",
    "codigo_rgb": "rgb(0, 0, 255)",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Ejemplo de respuesta error (404):**
```json
{
  "success": false,
  "mensaje": "No se encontro el color buscado"
}
```

---

### 3. Agregar un color

**POST** `http://localhost:3001/api/colores`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON) - Ejemplo 1: Con todos los campos:**
```json
{
  "nombreColor": "Azul",
  "codigo_hex": "#0000FF",
  "codigo_rgb": "rgb(0, 0, 255)"
}
```

**Body (JSON) - Ejemplo 2: Solo nombre (mínimo requerido):**
```json
{
  "nombreColor": "Rojo"
}
```

**Body (JSON) - Ejemplo 3: Con nombre y hex:**
```json
{
  "nombreColor": "Verde",
  "codigo_hex": "#00FF00"
}
```

**Body (JSON) - Ejemplo 4: Con nombre y RGB:**
```json
{
  "nombreColor": "Amarillo",
  "codigo_rgb": "rgb(255, 255, 0)"
}
```

**Body (JSON) - Ejemplo 5: Con RGBA:**
```json
{
  "nombreColor": "Azul Transparente",
  "codigo_rgb": "rgba(0, 0, 255, 0.5)"
}
```

**Ejemplo de respuesta exitosa (201):**
```json
{
  "success": true,
  "mensaje": "Color agregado exitosamente",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "nombreColor": "Azul",
    "codigo_hex": "#0000FF",
    "codigo_rgb": "rgb(0, 0, 255)",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Ejemplo de respuesta error (400) - Nombre faltante:**
```json
{
  "success": false,
  "mensaje": "El nombre del color es requerido"
}
```

**Ejemplo de respuesta error (400) - Hex inválido:**
```json
{
  "success": false,
  "mensaje": "El código hexadecimal debe tener el formato #RRGGBB o #RGB"
}
```

**Ejemplo de respuesta error (400) - RGB inválido:**
```json
{
  "success": false,
  "mensaje": "El código RGB debe tener el formato rgb(r, g, b) o rgba(r, g, b, a)"
}
```

**Ejemplo de respuesta error (400) - Nombre duplicado:**
```json
{
  "success": false,
  "mensaje": "El nombre del color ya existe y debe ser único"
}
```

---

### 4. Editar un color

**PUT** `http://localhost:3001/api/colores/:id`

**Ejemplo:**
```
PUT http://localhost:3001/api/colores/507f1f77bcf86cd799439011
```

**Headers:**
```
Content-Type: application/json
```

**Body (JSON) - Ejemplo 1: Actualizar solo el nombre:**
```json
{
  "nombreColor": "Azul Marino"
}
```

**Body (JSON) - Ejemplo 2: Actualizar todos los campos:**
```json
{
  "nombreColor": "Azul Marino",
  "codigo_hex": "#000080",
  "codigo_rgb": "rgb(0, 0, 128)"
}
```

**Body (JSON) - Ejemplo 3: Limpiar hex y rgb (establecer en null):**
```json
{
  "codigo_hex": null,
  "codigo_rgb": null
}
```

**Ejemplo de respuesta exitosa (200):**
```json
{
  "success": true,
  "mensaje": "Color actualizado correctamente",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "nombreColor": "Azul Marino",
    "codigo_hex": "#000080",
    "codigo_rgb": "rgb(0, 0, 128)",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T01:00:00.000Z"
  }
}
```

**Ejemplo de respuesta error (404):**
```json
{
  "success": false,
  "mensaje": "No se encontro el color buscado"
}
```

---

### 5. Eliminar un color

**DELETE** `http://localhost:3001/api/colores/:id`

**Ejemplo:**
```
DELETE http://localhost:3001/api/colores/507f1f77bcf86cd799439011
```

**Headers:**
```
Content-Type: application/json
```

**Ejemplo de respuesta exitosa (200):**
```json
{
  "success": true,
  "mensaje": "Color eliminado correctamente",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "nombreColor": "Azul",
    "codigo_hex": "#0000FF",
    "codigo_rgb": "rgb(0, 0, 255)",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Ejemplo de respuesta error (404):**
```json
{
  "success": false,
  "mensaje": "No se encontro el color buscado"
}
```

---

## Códigos de Estado HTTP

- **200 OK**: Operación exitosa (GET, PUT, DELETE)
- **201 Created**: Recurso creado exitosamente (POST)
- **400 Bad Request**: Error de validación o datos inválidos
- **404 Not Found**: Recurso no encontrado
- **500 Internal Server Error**: Error del servidor

## Notas Importantes

1. El campo `nombreColor` es **obligatorio** y debe ser **único**
2. Los campos `codigo_hex` y `codigo_rgb` son **opcionales**
3. El formato de `codigo_hex` debe ser: `#RRGGBB` o `#RGB` (ej: `#0000FF` o `#00F`)
4. El formato de `codigo_rgb` debe ser: `rgb(r, g, b)` o `rgba(r, g, b, a)` (ej: `rgb(0, 0, 255)` o `rgba(0, 0, 255, 0.5)`)
5. El `_id` es generado automáticamente por MongoDB y actúa como código único
6. Los campos `createdAt` y `updatedAt` se generan automáticamente

