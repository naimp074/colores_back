import mongoose from "mongoose";

// Cachear la conexión globalmente para reutilizarla
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  // Verificar variables de entorno al conectar, no al importar
  const { MONGODB_URI, MONGODB } = process.env;
  const connectionString = MONGODB_URI || MONGODB;

  if (!connectionString) {
    throw new Error("Falta MONGODB_URI o MONGODB en las variables de entorno");
  }

  // Si ya hay una conexión, retornarla
  if (cached.conn) {
    return cached.conn;
  }

  // Si no hay una promesa de conexión en curso, crear una
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(connectionString, {
        bufferCommands: false, // Desactivar buffering para evitar timeout
        serverSelectionTimeoutMS: 10000, // Timeout de 10 segundos
        maxPoolSize: 5, // Máximo de conexiones en el pool
      })
      .then((m) => {
        console.info("✅ Conexión con BD exitosa");
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

