import { Router } from "express";
import {
  listarColores,
  agregarColor,
  eliminarColor,
  editarColor,
  obtenerColorID,
} from "../controllers/colores.controllers.js";

const router = Router();

router.route("/").get(listarColores).post(agregarColor);
router
  .route("/:id")
  .get(obtenerColorID)
  .put(editarColor)
  .delete(eliminarColor);

export default router;

