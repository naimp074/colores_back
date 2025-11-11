import router from "./src/routes/index.routes.js";
import Server from "./src/server/config.js";

const server = new Server();
server.app.use("/api", router);

// Exportar handler para Vercel (serverless function)
// Vercel espera que exportemos el app de Express directamente
export default server.app;

// Solo iniciar servidor en desarrollo local
if (!process.env.VERCEL) {
  server.listen();
}

