# 📋 Resumen Rápido - Postman

## 🔗 URLs

**Local:** `http://localhost:3001/api`  
**Vercel:** `https://colores-back-five.vercel.app/api`

---

## 🚀 Endpoints

### 1. GET - Listar Colores
```
GET {{base_url}}/colores
```

### 2. POST - Agregar Color
```
POST {{base_url}}/colores
Body (JSON):
{
  "nombreColor": "Rojo",
  "codigo_hex": "#FF0000",
  "codigo_rgb": "rgb(255, 0, 0)"
}
```

### 3. GET - Obtener Color por ID
```
GET {{base_url}}/colores/ID_AQUI
```

### 4. PUT - Editar Color
```
PUT {{base_url}}/colores/ID_AQUI
Body (JSON):
{
  "nombreColor": "Rojo Oscuro",
  "codigo_hex": "#CC0000"
}
```

### 5. DELETE - Eliminar Color
```
DELETE {{base_url}}/colores/ID_AQUI
```

---

## 📝 Ejemplos de Body (POST/PUT)

**Mínimo requerido:**
```json
{
  "nombreColor": "Verde"
}
```

**Con hex:**
```json
{
  "nombreColor": "Azul",
  "codigo_hex": "#0000FF"
}
```

**Con rgb:**
```json
{
  "nombreColor": "Amarillo",
  "codigo_rgb": "rgb(255, 255, 0)"
}
```

**Completo:**
```json
{
  "nombreColor": "Morado",
  "codigo_hex": "#800080",
  "codigo_rgb": "rgb(128, 0, 128)"
}
```

---

## ✅ Secuencia de Prueba Rápida

1. **GET** `/colores` → Ver lista
2. **POST** `/colores` → Agregar color
3. **GET** `/colores` → Verificar que se agregó
4. **GET** `/colores/:id` → Obtener el color agregado
5. **PUT** `/colores/:id` → Editar el color
6. **DELETE** `/colores/:id` → Eliminar el color
7. **GET** `/colores` → Verificar que se eliminó

---

## ⚠️ Errores Comunes

| Error | Causa | Solución |
|-------|-------|----------|
| Cannot GET | Backend no está corriendo | Ejecuta `npm start` |
| Connection refused | Puerto incorrecto | Verifica puerto 3001 |
| 400 - Nombre requerido | Falta nombreColor | Agrega `"nombreColor": "..."` |
| 400 - Hex inválido | Formato incorrecto | Usa `#RRGGBB` o `#RGB` |
| 400 - Nombre duplicado | Ya existe ese nombre | Usa otro nombre |
| 404 - No encontrado | ID incorrecto | Verifica el ID |
| 500 - Error servidor | MongoDB no conectado | Verifica MONGODB |

---

## 🎯 Headers Necesarios

```
Content-Type: application/json
```

---

## 📌 Notas Importantes

- ✅ `nombreColor` es **obligatorio** y **único**
- ✅ `codigo_hex` y `codigo_rgb` son **opcionales**
- ✅ Hex válido: `#FF0000` o `#F00`
- ✅ RGB válido: `rgb(255, 0, 0)` o `rgba(255, 0, 0, 0.5)`
- ✅ El backend acepta ambos formatos: `nombreColor`/`nombre`, `codigo_hex`/`hex`, `codigo_rgb`/`rgb`

