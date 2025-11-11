# Backend - Administrar Colores

Backend para administrar paleta de colores con MongoDB.

## Características

- ✅ CRUD completo de colores
- ✅ Validación de datos antes de guardar
- ✅ Código único por color (MongoDB _id)
- ✅ Nombre del color (requerido, único)
- ✅ Código hexadecimal opcional (formato #RRGGBB o #RGB)
- ✅ Código RGB/RGBA opcional (formato rgb(r, g, b) o rgba(r, g, b, a))

## Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Crear archivo `.env` en la raíz del proyecto:
```
PORT=3001
MONGODB=mongodb://localhost:27017/paletacolores
```

3. Iniciar el servidor:
```bash
npm run dev
```

## Endpoints

### Base URL: `http://localhost:3001/api`

### 1. Listar todos los colores
- **GET** `/colores`
- Respuesta exitosa (200):
```json
{
  "success": true,
  "data": [...],
  "total": 3
}
```

### 2. Obtener un color por ID
- **GET** `/colores/:id`
- Respuesta exitosa (200):
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "nombreColor": "Azul",
    "codigo_hex": "#0000FF",
    "codigo_rgb": "rgb(0, 0, 255)",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

### 3. Agregar un color
- **POST** `/colores`
- Body (JSON) - Formato 1 (Postman):
```json
{
  "nombreColor": "Azul",
  "codigo_hex": "#0000FF",
  "codigo_rgb": "rgb(0, 0, 255)"
}
```
- Body (JSON) - Formato 2 (Frontend):
```json
{
  "nombre": "Azul",
  "hex": "#0000FF",
  "rgb": "rgb(0, 0, 255)"
}
```
- Nota: `codigo_hex`/`hex` y `codigo_rgb`/`rgb` son opcionales. El backend acepta ambos formatos.
- Respuesta exitosa (201):
```json
{
  "success": true,
  "mensaje": "Color agregado exitosamente",
  "data": {...}
}
```

### 4. Editar un color
- **PUT** `/colores/:id`
- Body (JSON) - todos los campos son opcionales. Acepta ambos formatos:
```json
{
  "nombreColor": "Azul Marino",
  "codigo_hex": "#000080",
  "codigo_rgb": "rgb(0, 0, 128)"
}
```
o
```json
{
  "nombre": "Azul Marino",
  "hex": "#000080",
  "rgb": "rgb(0, 0, 128)"
}
```
- Respuesta exitosa (200):
```json
{
  "success": true,
  "mensaje": "Color actualizado correctamente",
  "data": {...}
}
```

### 5. Eliminar un color
- **DELETE** `/colores/:id`
- Respuesta exitosa (200):
```json
{
  "success": true,
  "mensaje": "Color eliminado correctamente",
  "data": {...}
}
```

## Validaciones

- **nombreColor/nombre**: Requerido, único, entre 1 y 50 caracteres
- **codigo_hex/hex**: Opcional, formato #RRGGBB o #RGB, único si se proporciona
- **codigo_rgb/rgb**: Opcional, formato rgb(r, g, b) o rgba(r, g, b, a), único si se proporciona

## Compatibilidad

El backend acepta y responde con ambos formatos:
- **Formato Postman**: `nombreColor`, `codigo_hex`, `codigo_rgb`
- **Formato Frontend**: `nombre`, `hex`, `rgb`, `id` (en lugar de `_id`)

Las respuestas incluyen ambos formatos para máxima compatibilidad.

## Estructura del Proyecto

```
├── index.js                 # Punto de entrada
├── src/
│   ├── server/
│   │   ├── config.js        # Configuración del servidor Express
│   │   └── dbConfig.js      # Configuración de MongoDB
│   ├── models/
│   │   └── colores.js       # Modelo de Color (Mongoose)
│   ├── controllers/
│   │   └── colores.controllers.js  # Controladores CRUD
│   └── routes/
│       ├── index.routes.js   # Rutas principales
│       └── colores.routes.js # Rutas de colores
└── package.json
```

## Autor

**Naim Federico Paz**
