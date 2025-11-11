# Configuración del Backend en Vercel

## ⚠️ PROBLEMA COMÚN: Error 500

Si ves un error 500 al intentar listar colores, **es porque falta configurar la variable de entorno MONGODB en Vercel**.

## Pasos para solucionar:

### 1. Obtener la URL de MongoDB

Tienes dos opciones:

#### Opción A: MongoDB Atlas (Recomendado - Gratis)

1. Ve a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crea una cuenta o inicia sesión
3. Crea un cluster (gratis)
4. Crea un usuario de base de datos
5. Obtén la cadena de conexión (Connection String)
   - Click en "Connect" → "Connect your application"
   - Copia la URL, ejemplo: `mongodb+srv://usuario:password@cluster0.xxxxx.mongodb.net/paletacolores?retryWrites=true&w=majority`

#### Opción B: MongoDB Local (Solo para desarrollo)

Si tienes MongoDB instalado localmente:
```
mongodb://localhost:27017/paletacolores
```

### 2. Configurar en Vercel

1. Ve a tu proyecto en Vercel: https://vercel.com/dashboard
2. Selecciona el proyecto `administrarcolores_back`
3. Ve a **Settings** → **Environment Variables**
4. Agrega la siguiente variable:

   **Variable name:**
   ```
   MONGODB
   ```

   **Value:**
   ```
   mongodb+srv://usuario:password@cluster0.xxxxx.mongodb.net/paletacolores?retryWrites=true&w=majority
   ```
   (Reemplaza con tu URL real de MongoDB Atlas)

5. Selecciona los **Environments** donde aplicará:
   - ✅ Production
   - ✅ Preview
   - ✅ Development (opcional)

6. Click en **Save**

### 3. Redesplegar

Después de agregar la variable de entorno:

1. Ve a **Deployments**
2. Click en los tres puntos (⋯) del último deployment
3. Selecciona **Redeploy**
4. O simplemente haz un nuevo push a GitHub (si tienes auto-deploy)

### 4. Verificar que funciona

1. Espera a que termine el redeploy
2. Prueba acceder a: `https://colores-back-five.vercel.app/api/colores`
3. Deberías ver una respuesta JSON con `success: true` y un array de colores (puede estar vacío)

## Variables de entorno necesarias en Vercel:

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `MONGODB` | URL de conexión a MongoDB | `mongodb+srv://user:pass@cluster.mongodb.net/paletacolores` |

## Solución de problemas

### Error 500: "Ocurrio un error al listar los colores"

**Causa:** La variable `MONGODB` no está configurada o la URL es incorrecta.

**Solución:**
1. Verifica que la variable `MONGODB` esté en Vercel
2. Verifica que la URL sea correcta (debe incluir el nombre de la base de datos)
3. Si usas MongoDB Atlas, verifica que:
   - El cluster esté activo
   - El usuario tenga permisos
   - La IP esté en la whitelist (0.0.0.0/0 para permitir todas)

### Error: "MongoNetworkError"

**Causa:** Problema de conexión a MongoDB.

**Solución:**
1. Verifica que la URL de conexión sea correcta
2. En MongoDB Atlas, verifica la whitelist de IPs
3. Asegúrate de que el cluster esté activo

### Ver logs en Vercel

1. Ve a tu proyecto en Vercel
2. Click en **Deployments**
3. Selecciona un deployment
4. Click en **Functions** → Ver los logs de la función
5. Busca errores relacionados con MongoDB

## Estructura de la URL de MongoDB

```
mongodb+srv://[usuario]:[password]@[cluster]/[nombre-base-datos]?[opciones]
```

Ejemplo completo:
```
mongodb+srv://admin:miPassword123@cluster0.abc123.mongodb.net/paletacolores?retryWrites=true&w=majority
```

## Notas importantes

- ⚠️ **NUNCA** subas la URL de MongoDB con credenciales a GitHub
- ✅ Usa variables de entorno siempre
- ✅ En MongoDB Atlas, permite todas las IPs (0.0.0.0/0) para Vercel
- ✅ El nombre de la base de datos puede ser cualquier cosa (ej: `paletacolores`)

