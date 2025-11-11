# 🚀 Guía Completa para Probar el Backend con Postman

## 📋 Configuración Inicial

### Opción 1: Desarrollo Local
**Base URL:** `http://localhost:3001/api`

1. Asegúrate de que el backend esté corriendo:
```bash
cd administrarcolores_back
npm start
```

2. Deberías ver: `El servidor se esta ejecutando en http://localhost:3001`

### Opción 2: Producción (Vercel)
**Base URL:** `https://colores-back-five.vercel.app/api`

---

## 🔧 Configurar Postman

### Paso 1: Crear una Variable de Entorno en Postman

1. Abre Postman
2. Click en el ícono de **ojo** (👁️) en la parte superior derecha
3. Click en **"Add"** o **"+"** para crear una nueva variable
4. Crea una variable llamada: `base_url`
5. Para desarrollo local, usa: `http://localhost:3001/api`
6. Para producción, usa: `https://colores-back-five.vercel.app/api`

### Paso 2: Configurar Headers Globales (Opcional)

1. Ve a **Settings** (⚙️) → **Variables**
2. O crea un **Environment** con la variable `base_url`
3. En cada request, usa: `{{base_url}}/colores`

---

## 📝 Endpoints para Probar

### 1️⃣ **GET - Listar Todos los Colores**

**Método:** `GET`  
**URL:** `{{base_url}}/colores`  
O directamente: `http://localhost:3001/api/colores`

**Headers:**
```
Content-Type: application/json
```

**Pasos:**
1. Selecciona método **GET**
2. Ingresa la URL
3. Click en **Send**

**Respuesta esperada (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "507f1f77bcf86cd799439011",
      "nombre": "Azul",
      "hex": "#0000FF",
      "rgb": "rgb(0, 0, 255)",
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

### 2️⃣ **POST - Agregar un Color**

**Método:** `POST`  
**URL:** `{{base_url}}/colores`

**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**

**Ejemplo 1: Con todos los campos**
```json
{
  "nombreColor": "Rojo",
  "codigo_hex": "#FF0000",
  "codigo_rgb": "rgb(255, 0, 0)"
}
```

**Ejemplo 2: Solo nombre (mínimo requerido)**
```json
{
  "nombreColor": "Verde"
}
```

**Ejemplo 3: Con nombre y hex**
```json
{
  "nombreColor": "Amarillo",
  "codigo_hex": "#FFFF00"
}
```

**Ejemplo 4: Con nombre y RGB**
```json
{
  "nombreColor": "Morado",
  "codigo_rgb": "rgb(128, 0, 128)"
}
```

**Ejemplo 5: Formato Frontend (también funciona)**
```json
{
  "nombre": "Naranja",
  "hex": "#FFA500",
  "rgb": "rgb(255, 165, 0)"
}
```

**Pasos:**
1. Selecciona método **POST**
2. Ingresa la URL
3. Ve a la pestaña **Body**
4. Selecciona **raw** y **JSON**
5. Pega uno de los ejemplos de arriba
6. Click en **Send**

**Respuesta esperada (201):**
```json
{
  "success": true,
  "mensaje": "Color agregado exitosamente",
  "data": {
    "id": "507f1f77bcf86cd799439012",
    "nombre": "Rojo",
    "hex": "#FF0000",
    "rgb": "rgb(255, 0, 0)",
    "_id": "507f1f77bcf86cd799439012",
    "nombreColor": "Rojo",
    "codigo_hex": "#FF0000",
    "codigo_rgb": "rgb(255, 0, 0)",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**⚠️ Errores comunes:**
- **400 - Nombre faltante:**
```json
{
  "success": false,
  "mensaje": "El nombre del color es requerido"
}
```

- **400 - Hex inválido:**
```json
{
  "success": false,
  "mensaje": "El código hexadecimal debe tener el formato #RRGGBB o #RGB"
}
```

- **400 - Nombre duplicado:**
```json
{
  "success": false,
  "mensaje": "El nombre del color ya existe y debe ser único"
}
```

---

### 3️⃣ **GET - Obtener un Color por ID**

**Método:** `GET`  
**URL:** `{{base_url}}/colores/:id`

**Ejemplo:** `http://localhost:3001/api/colores/507f1f77bcf86cd799439011`

**Headers:**
```
Content-Type: application/json
```

**Pasos:**
1. Primero ejecuta **GET - Listar Todos los Colores** para obtener un ID
2. Copia el `_id` o `id` de un color
3. Selecciona método **GET**
4. Ingresa la URL con el ID al final
5. Click en **Send**

**Respuesta esperada (200):**
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "nombre": "Azul",
    "hex": "#0000FF",
    "rgb": "rgb(0, 0, 255)",
    "_id": "507f1f77bcf86cd799439011",
    "nombreColor": "Azul",
    "codigo_hex": "#0000FF",
    "codigo_rgb": "rgb(0, 0, 255)",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error esperado (404):**
```json
{
  "success": false,
  "mensaje": "No se encontro el color buscado"
}
```

---

### 4️⃣ **PUT - Editar un Color**

**Método:** `PUT`  
**URL:** `{{base_url}}/colores/:id`

**Ejemplo:** `http://localhost:3001/api/colores/507f1f77bcf86cd799439011`

**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**

**Ejemplo 1: Actualizar solo el nombre**
```json
{
  "nombreColor": "Azul Marino"
}
```

**Ejemplo 2: Actualizar todos los campos**
```json
{
  "nombreColor": "Azul Marino",
  "codigo_hex": "#000080",
  "codigo_rgb": "rgb(0, 0, 128)"
}
```

**Ejemplo 3: Formato Frontend**
```json
{
  "nombre": "Azul Cielo",
  "hex": "#87CEEB",
  "rgb": "rgb(135, 206, 235)"
}
```

**Ejemplo 4: Limpiar hex y rgb (establecer en null)**
```json
{
  "codigo_hex": null,
  "codigo_rgb": null
}
```

**Pasos:**
1. Obtén un ID de color (usa GET - Listar Todos los Colores)
2. Selecciona método **PUT**
3. Ingresa la URL con el ID
4. Ve a la pestaña **Body**
5. Selecciona **raw** y **JSON**
6. Pega uno de los ejemplos
7. Click en **Send**

**Respuesta esperada (200):**
```json
{
  "success": true,
  "mensaje": "Color actualizado correctamente",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "nombre": "Azul Marino",
    "hex": "#000080",
    "rgb": "rgb(0, 0, 128)",
    "_id": "507f1f77bcf86cd799439011",
    "nombreColor": "Azul Marino",
    "codigo_hex": "#000080",
    "codigo_rgb": "rgb(0, 0, 128)",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T01:00:00.000Z"
  }
}
```

---

### 5️⃣ **DELETE - Eliminar un Color**

**Método:** `DELETE`  
**URL:** `{{base_url}}/colores/:id`

**Ejemplo:** `http://localhost:3001/api/colores/507f1f77bcf86cd799439011`

**Headers:**
```
Content-Type: application/json
```

**Pasos:**
1. Obtén un ID de color (usa GET - Listar Todos los Colores)
2. Selecciona método **DELETE**
3. Ingresa la URL con el ID
4. Click en **Send**

**Respuesta esperada (200):**
```json
{
  "success": true,
  "mensaje": "Color eliminado correctamente",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "nombre": "Azul",
    "hex": "#0000FF",
    "rgb": "rgb(0, 0, 255)",
    "_id": "507f1f77bcf86cd799439011",
    "nombreColor": "Azul",
    "codigo_hex": "#0000FF",
    "codigo_rgb": "rgb(0, 0, 255)",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

## 🧪 Secuencia de Pruebas Recomendada

### Prueba Completa Paso a Paso:

1. **GET /colores** - Ver lista inicial (puede estar vacía)
2. **POST /colores** - Agregar color "Rojo" con hex `#FF0000`
3. **POST /colores** - Agregar color "Verde" con rgb `rgb(0, 255, 0)`
4. **POST /colores** - Agregar color "Azul" solo con nombre
5. **GET /colores** - Verificar que se agregaron los 3 colores
6. **GET /colores/:id** - Obtener un color específico (usa un ID del paso 5)
7. **PUT /colores/:id** - Editar el color "Azul" para agregarle hex y rgb
8. **GET /colores/:id** - Verificar que se actualizó correctamente
9. **DELETE /colores/:id** - Eliminar uno de los colores
10. **GET /colores** - Verificar que quedan 2 colores

---

## ✅ Checklist de Validaciones

### Validaciones que Debes Probar:

- [ ] ✅ GET lista todos los colores correctamente
- [ ] ✅ POST crea un color con solo nombre
- [ ] ✅ POST crea un color con nombre y hex
- [ ] ✅ POST crea un color con nombre y rgb
- [ ] ✅ POST crea un color con todos los campos
- [ ] ✅ POST rechaza crear color sin nombre (error 400)
- [ ] ✅ POST rechaza hex inválido (error 400)
- [ ] ✅ POST rechaza rgb inválido (error 400)
- [ ] ✅ POST rechaza nombre duplicado (error 400)
- [ ] ✅ GET obtiene un color por ID correctamente
- [ ] ✅ GET devuelve 404 si el ID no existe
- [ ] ✅ PUT actualiza solo el nombre
- [ ] ✅ PUT actualiza todos los campos
- [ ] ✅ PUT devuelve 404 si el ID no existe
- [ ] ✅ DELETE elimina un color correctamente
- [ ] ✅ DELETE devuelve 404 si el ID no existe

---

## 🔍 Formato de Datos

### El Backend Acepta DOS Formatos:

**Formato 1: Postman (recomendado para pruebas)**
```json
{
  "nombreColor": "Rojo",
  "codigo_hex": "#FF0000",
  "codigo_rgb": "rgb(255, 0, 0)"
}
```

**Formato 2: Frontend (también funciona)**
```json
{
  "nombre": "Rojo",
  "hex": "#FF0000",
  "rgb": "rgb(255, 0, 0)"
}
```

### Formatos Válidos:

**Hex:**
- ✅ `#FF0000` (6 dígitos)
- ✅ `#F00` (3 dígitos)
- ❌ `FF0000` (sin #)
- ❌ `#FF00` (4 dígitos)

**RGB:**
- ✅ `rgb(255, 0, 0)`
- ✅ `rgba(255, 0, 0, 0.5)`
- ✅ `rgb( 255 , 0 , 0 )` (con espacios)
- ❌ `255, 0, 0` (sin rgb())
- ❌ `rgb(255,0,0)` (sin espacios, pero funciona)

---

## 🐛 Solución de Problemas

### Error: "Cannot GET /api/colores"
- ✅ Verifica que el backend esté corriendo
- ✅ Verifica que la URL sea correcta
- ✅ Verifica que el puerto sea 3001

### Error: "Connection refused"
- ✅ El backend no está corriendo
- ✅ Ejecuta `npm start` en la carpeta del backend

### Error: "MongoNetworkError"
- ✅ Verifica que MongoDB esté corriendo (si es local)
- ✅ Verifica la variable de entorno MONGODB
- ✅ En Vercel, verifica que MONGODB_URI esté configurada

### Error 500 en Vercel
- ✅ Verifica que MONGODB_URI esté configurada en Vercel
- ✅ Verifica que la URL de MongoDB incluya el nombre de la base de datos

---

## 📊 Códigos de Estado HTTP

- **200 OK**: Operación exitosa (GET, PUT, DELETE)
- **201 Created**: Recurso creado exitosamente (POST)
- **400 Bad Request**: Error de validación o datos inválidos
- **404 Not Found**: Recurso no encontrado
- **500 Internal Server Error**: Error del servidor

---

## 💡 Tips

1. **Guarda los requests** en una colección de Postman para reutilizarlos
2. **Usa variables** para el ID del color y reutilízalo en otros requests
3. **Crea un Environment** para cambiar fácilmente entre local y producción
4. **Usa Tests** en Postman para validar automáticamente las respuestas
5. **Guarda ejemplos** de respuestas exitosas para referencia

---

¡Listo! Ahora puedes probar todos los endpoints del backend con Postman. 🎉

