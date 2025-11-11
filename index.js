import router from "./src/routes/index.routes.js";
import Server from "./src/server/config.js";

const server = new Server();
server.app.use("/api", router);

// Exportar para Vercel (serverless function)
export default server.app;

// Solo iniciar servidor en desarrollo local
if (!process.env.VERCEL) {
  server.listen();
}

