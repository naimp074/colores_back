import { connectDB } from "../../lib/db.js";

// Conectar al importar el módulo (solo en desarrollo local)
// En Vercel, la conexión se hará bajo demanda en cada request
if (!process.env.VERCEL) {
  connectDB().catch((err) => {
    console.error("❌ Error al conectar con MongoDB:", err.message);
  });
}

// Exportar la función de conexión para uso en controladores
export { connectDB };
export default connectDB;

