import mongoose from "mongoose";
import { Schema } from "mongoose";

const coloresSchema = new Schema(
  {
    nombreColor: {
      type: String,
      minLength: 1,
      maxLength: 50,
      required: [true, "El nombre del color es requerido"],
      unique: true,
      trim: true,
    },
    codigo_hex: {
      type: String,
      match: [/^#([0-9A-Fa-f]{3}){1,2}$/, "El código hexadecimal debe tener el formato #RRGGBB o #RGB"],
      trim: true,
    },
    codigo_rgb: {
      type: String,
      match: [
        /^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(,\s*[\d.]+\s*)?\)$/,
        "El código RGB debe tener el formato rgb(r, g, b) o rgba(r, g, b, a)",
      ],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Índice único para codigo_hex solo si existe
coloresSchema.index(
  { codigo_hex: 1 },
  {
    unique: true,
    sparse: true,
    partialFilterExpression: { codigo_hex: { $exists: true, $ne: null, $ne: "" } },
  }
);

// Índice único para codigo_rgb solo si existe
coloresSchema.index(
  { codigo_rgb: 1 },
  {
    unique: true,
    sparse: true,
    partialFilterExpression: { codigo_rgb: { $exists: true, $ne: null, $ne: "" } },
  }
);

// Evitar redefinir el modelo si ya existe (importante para Vercel/serverless)
const Colores = mongoose.models.color || mongoose.model("color", coloresSchema);

export default Colores;

