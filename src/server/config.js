import express from "express";
import cors from "cors";
import morgan from "morgan";
import { dirname } from "path";
import { fileURLToPath } from "url";
import "./dbConfig.js";

export default class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3001;
    this.middlewares();
  }
  middlewares() {
    // Configurar CORS para permitir solicitudes desde Netlify y localhost
    const allowedOrigins = [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://naimal.netlify.app",
      // Agregar más dominios si es necesario
    ];

    this.app.use(cors({
      origin: (origin, cb) => {
        // Permitir requests sin origin (Postman, etc.) o desde orígenes permitidos
        if (!origin || allowedOrigins.includes(origin)) {
          cb(null, true);
        } else {
          cb(null, true); // Permitir todos por ahora, ajustar si es necesario
        }
      },
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    }));

    // Responder explícitamente a OPTIONS (preflight)
    this.app.options("*", cors());

    this.app.use(express.json());
    this.app.use(morgan("dev"));
    const __dirname = dirname(fileURLToPath(import.meta.url));
    console.log(__dirname);
    console.log(__dirname + "/../../public");
    this.app.use(express.static(__dirname + "/../../public"));
  }
  listen() {
    this.app.listen(this.port, () => {
      console.info(
        `El servidor se esta ejecutando en http://localhost:${this.port}`
      );
    });
  }
}

