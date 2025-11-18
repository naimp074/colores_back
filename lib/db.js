import mongoose from "mongoose";

// Cachear la conexión globalmente para reutilizarla
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  // Priorizar MONGODB_URI (recomendado para producción/Vercel)
  // Usar MONGODB como fallback (compatibilidad)
  const connectionString = process.env.MONGODB_URI || process.env.MONGODB;

  if (!connectionString) {
    const error = new Error("Falta MONGODB_URI en las variables de entorno");
    console.error("═══════════════════════════════════════");
    console.error("❌ ERROR DE CONFIGURACIÓN");
    console.error("═══════════════════════════════════════");
    console.error("💬", error.message);
    console.error("📋 SOLUCIÓN:");
    console.error("   Local: Crea un archivo .env con MONGODB_URI=...");
    console.error("   Vercel: Settings → Environment Variables → MONGODB_URI");
    console.error("═══════════════════════════════════════");
    throw error;
  }

  // Si ya hay una conexión, retornarla
  if (cached.conn) {
    return cached.conn;
  }

  // Si no hay una promesa de conexión en curso, crear una
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(connectionString, {
        bufferCommands: false, // Desactivar buffering para evitar timeout (importante para Vercel)
        serverSelectionTimeoutMS: 10000, // Timeout de 10 segundos
        maxPoolSize: 5, // Máximo de conexiones en el pool
      })
      .then((m) => {
        const env = process.env.VERCEL ? "Vercel" : "Local";
        console.info(`✅ Conexión con MongoDB exitosa (${env})`);
        return m;
      })
      .catch((err) => {
        console.error("❌ Error al conectar con MongoDB:", err.message);
        cached.promise = null; // Resetear la promesa en caso de error
        throw err;
      });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (err) {
    cached.promise = null;
    throw err;
  }
}

