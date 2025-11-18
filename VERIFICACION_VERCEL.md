# ✅ Verificación de Endpoints en Vercel

## 🌐 URL Base de Vercel

**URL:** `https://colores-back-five.vercel.app`

---

## 📋 Endpoints para Probar

### 1️⃣ **GET - Listar Todos los Colores**

**URL:** `https://colores-back-five.vercel.app/api/colores`

**Método:** `GET`

**Headers:**
```
Content-Type: application/json
```

**Respuesta esperada (200):**
```json
{
  "success": true,
  "data": [...],
  "total": 0
}
```

---

### 2️⃣ **POST - Agregar un Color**

**URL:** `https://colores-back-five.vercel.app/api/colores`

**Método:** `POST`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "nombreColor": "Rojo",
  "codigo_hex": "#FF0000",
  "codigo_rgb": "rgb(255, 0, 0)"
}
```

**Respuesta esperada (201):**
```json
{
  "success": true,
  "mensaje": "Color agregado exitosamente",
  "data": {
    "id": "...",
    "nombre": "Rojo",
    "hex": "#FF0000",
    "rgb": "rgb(255, 0, 0)",
    ...
  }
}
```

---

### 3️⃣ **GET - Obtener Color por ID**

**URL:** `https://colores-back-five.vercel.app/api/colores/:id`

**Método:** `GET`

**Ejemplo:** `https://colores-back-five.vercel.app/api/colores/507f1f77bcf86cd799439011`

**Respuesta esperada (200):**
```json
{
  "success": true,
  "data": {
    "id": "...",
    "nombre": "Rojo",
    ...
  }
}
```

---

### 4️⃣ **PUT - Editar un Color**

**URL:** `https://colores-back-five.vercel.app/api/colores/:id`

**Método:** `PUT`

**Body (JSON):**
```json
{
  "nombreColor": "Rojo Oscuro",
  "codigo_hex": "#CC0000"
}
```

**Respuesta esperada (200):**
```json
{
  "success": true,
  "mensaje": "Color actualizado correctamente",
  "data": {
    "id": "...",
    "nombre": "Rojo Oscuro",
    ...
  }
}
```

---

### 5️⃣ **DELETE - Eliminar un Color**

**URL:** `https://colores-back-five.vercel.app/api/colores/:id`

**Método:** `DELETE`

**Respuesta esperada (200):**
```json
{
  "success": true,
  "mensaje": "Color eliminado correctamente",
  "data": {...}
}
```

---

## 🧪 Secuencia de Prueba Completa

### Paso 1: Verificar que el servidor responde
```
GET https://colores-back-five.vercel.app
```
Deberías ver el `index.html` con el mensaje "Servidor funcionando correctamente"

### Paso 2: Listar colores (puede estar vacío)
```
GET https://colores-back-five.vercel.app/api/colores
```

### Paso 3: Agregar un color
```
POST https://colores-back-five.vercel.app/api/colores
Body: {
  "nombreColor": "Azul",
  "codigo_hex": "#0000FF",
  "codigo_rgb": "rgb(0, 0, 255)"
}
```
**Guarda el `_id` o `id` de la respuesta**

### Paso 4: Verificar que se agregó
```
GET https://colores-back-five.vercel.app/api/colores
```
Deberías ver el color que acabas de agregar

### Paso 5: Obtener el color específico
```
GET https://colores-back-five.vercel.app/api/colores/[ID_DEL_PASO_3]
```

### Paso 6: Editar el color
```
PUT https://colores-back-five.vercel.app/api/colores/[ID_DEL_PASO_3]
Body: {
  "nombreColor": "Azul Marino",
  "codigo_hex": "#000080"
}
```

### Paso 7: Verificar que se editó
```
GET https://colores-back-five.vercel.app/api/colores/[ID_DEL_PASO_3]
```

### Paso 8: Eliminar el color
```
DELETE https://colores-back-five.vercel.app/api/colores/[ID_DEL_PASO_3]
```

### Paso 9: Verificar que se eliminó
```
GET https://colores-back-five.vercel.app/api/colores
```
La lista debería estar vacía o sin el color eliminado

---

## ✅ Checklist de Verificación

- [ ] GET `/api/colores` funciona
- [ ] POST `/api/colores` crea un color correctamente
- [ ] GET `/api/colores/:id` obtiene un color específico
- [ ] PUT `/api/colores/:id` edita un color correctamente
- [ ] DELETE `/api/colores/:id` elimina un color correctamente
- [ ] CORS funciona (no hay errores de CORS en el navegador)
- [ ] El `index.html` se muestra en la raíz

---

## 🔧 Configuración Requerida en Vercel

### Variables de Entorno

Asegúrate de tener configurada en Vercel:

**Variable:** `MONGODB_URI` o `MONGODB`  
**Valor:** Tu cadena de conexión de MongoDB (debe incluir el nombre de la base de datos)

Ejemplo:
```
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/colores?retryWrites=true&w=majority
```

### Cómo Configurar en Vercel:

1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Agrega `MONGODB_URI` con tu cadena de conexión
4. Selecciona los ambientes (Production, Preview, Development)
5. Guarda y haz un redeploy

---

## 🐛 Solución de Problemas

### Error 500 - "Ocurrio un error al listar los colores"
**Causa:** MongoDB no está configurado o la conexión falla  
**Solución:** Verifica que `MONGODB_URI` esté configurada en Vercel

### Error 404 - "Cannot GET /api/colores"
**Causa:** La ruta no está configurada correctamente  
**Solución:** Verifica que `vercel.json` tenga la configuración correcta

### Error CORS
**Causa:** CORS no está configurado correctamente  
**Solución:** Ya está configurado para permitir todos los orígenes

### Timeout en Vercel
**Causa:** La conexión a MongoDB tarda mucho  
**Solución:** Ya está configurado `connectDB()` para evitar buffering timeout

---

## 📝 Notas Importantes

1. ✅ Todos los endpoints están configurados para funcionar en Vercel
2. ✅ CORS está configurado para permitir todas las solicitudes
3. ✅ La conexión a MongoDB se hace bajo demanda (importante para Vercel)
4. ✅ El backend acepta ambos formatos: `nombreColor`/`nombre`, `codigo_hex`/`hex`, `codigo_rgb`/`rgb`
5. ✅ Los archivos estáticos se sirven desde `/public`

---

## 🎯 Prueba Rápida con cURL

### GET - Listar
```bash
curl https://colores-back-five.vercel.app/api/colores
```

### POST - Agregar
```bash
curl -X POST https://colores-back-five.vercel.app/api/colores \
  -H "Content-Type: application/json" \
  -d '{"nombreColor":"Rojo","codigo_hex":"#FF0000"}'
```

### GET - Obtener por ID
```bash
curl https://colores-back-five.vercel.app/api/colores/[ID]
```

### PUT - Editar
```bash
curl -X PUT https://colores-back-five.vercel.app/api/colores/[ID] \
  -H "Content-Type: application/json" \
  -d '{"nombreColor":"Rojo Oscuro"}'
```

### DELETE - Eliminar
```bash
curl -X DELETE https://colores-back-five.vercel.app/api/colores/[ID]
```

---

¡Todo debería funcionar correctamente en Vercel! 🚀

