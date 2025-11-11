import { connectDB } from "../../lib/db.js";

// Conectar al importar el módulo (solo en desarrollo local)
// En Vercel, la conexión se hará bajo demanda en cada request usando connectDB()
try {
  if (!process.env.VERCEL) {
    connectDB().then(() => {
      console.info("Conexion con BD exitosa");
    }).catch((err) => {
      console.error(err);
    });
  }
} catch (err) {
  console.error(err);
}

// Exportar mongoose y connectDB para uso en controladores
export { connectDB };
export default connectDB;

