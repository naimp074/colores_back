import { Router } from "express";
import coloresRoutes from "./colores.routes.js";

const router = Router();
router.use("/colores", coloresRoutes);

export default router;

