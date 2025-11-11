import Colores from "../models/colores.js";
import { connectDB } from "../../lib/db.js";

// Función helper para transformar el formato de la BD al formato del frontend
const transformarColor = (color) => {
  if (!color) return null;
  const colorObj = color.toObject ? color.toObject() : color;
  return {
    id: colorObj._id.toString(),
    nombre: colorObj.nombreColor,
    hex: colorObj.codigo_hex || undefined,
    rgb: colorObj.codigo_rgb || undefined,
    // Mantener compatibilidad con formato original
    _id: colorObj._id,
    nombreColor: colorObj.nombreColor,
    codigo_hex: colorObj.codigo_hex,
    codigo_rgb: colorObj.codigo_rgb,
    createdAt: colorObj.createdAt,
    updatedAt: colorObj.updatedAt,
  };
};

export const listarColores = async (req, res) => {
  try {
    // Conectar a la BD antes de consultar (importante para Vercel)
    await connectDB();
    const colores = await Colores.find().sort({ createdAt: -1 });
    const coloresTransformados = colores.map(transformarColor);
    res.status(200).json({
      success: true,
      data: coloresTransformados,
      total: coloresTransformados.length,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      mensaje: "Ocurrio un error al listar los colores",
      error: err.message,
    });
  }
};

export const agregarColor = async (req, res) => {
  try {
    // Conectar a la BD antes de consultar (importante para Vercel)
    await connectDB();
    // Aceptar ambos formatos: nombreColor/nombre, codigo_hex/hex, codigo_rgb/rgb
    const nombreColor = req.body.nombreColor || req.body.nombre;
    const codigo_hex = req.body.codigo_hex || req.body.hex;
    const codigo_rgb = req.body.codigo_rgb || req.body.rgb;

    // Validar que al menos nombreColor esté presente
    if (!nombreColor || !nombreColor.trim()) {
      return res.status(400).json({
        success: false,
        mensaje: "El nombre del color es requerido",
      });
    }

    // Validar formato de hex si se proporciona
    if (codigo_hex && !/^#([0-9A-Fa-f]{3}){1,2}$/.test(codigo_hex)) {
      return res.status(400).json({
        success: false,
        mensaje: "El código hexadecimal debe tener el formato #RRGGBB o #RGB",
      });
    }

    // Validar formato de RGB si se proporciona
    if (
      codigo_rgb &&
      !/^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(,\s*[\d.]+\s*)?\)$/.test(
        codigo_rgb
      )
    ) {
      return res.status(400).json({
        success: false,
        mensaje:
          "El código RGB debe tener el formato rgb(r, g, b) o rgba(r, g, b, a)",
      });
    }

    const nuevoColor = new Colores({
      nombreColor: nombreColor.trim(),
      codigo_hex: codigo_hex ? codigo_hex.trim() : undefined,
      codigo_rgb: codigo_rgb ? codigo_rgb.trim() : undefined,
    });

    await nuevoColor.save();
    res.status(201).json({
      success: true,
      mensaje: "Color agregado exitosamente",
      data: transformarColor(nuevoColor),
    });
  } catch (err) {
    console.error(err);
    
    // Manejar errores de validación de Mongoose
    if (err.code === 11000) {
      const campo = Object.keys(err.keyPattern)[0];
      return res.status(400).json({
        success: false,
        mensaje: `El ${campo === "nombreColor" ? "nombre del color" : campo} ya existe y debe ser único`,
      });
    }

    if (err.name === "ValidationError") {
      const errores = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        mensaje: "Error de validación",
        errores: errores,
      });
    }

    res.status(500).json({
      success: false,
      mensaje: "Ocurrio un error al agregar el color",
      error: err.message,
    });
  }
};

export const eliminarColor = async (req, res) => {
  try {
    // Conectar a la BD antes de consultar (importante para Vercel)
    await connectDB();
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        mensaje: "El ID del color es requerido",
      });
    }

    const colorBuscado = await Colores.findByIdAndDelete(id);
    if (!colorBuscado) {
      return res.status(404).json({
        success: false,
        mensaje: "No se encontro el color buscado",
      });
    }
    res.status(200).json({
      success: true,
      mensaje: "Color eliminado correctamente",
      data: transformarColor(colorBuscado),
    });
  } catch (err) {
    console.error(err);
    
    if (err.name === "CastError") {
      return res.status(400).json({
        success: false,
        mensaje: "ID de color inválido",
      });
    }

    res.status(500).json({
      success: false,
      mensaje: "Ocurrio un error al eliminar el color",
      error: err.message,
    });
  }
};

export const editarColor = async (req, res) => {
  try {
    // Conectar a la BD antes de consultar (importante para Vercel)
    await connectDB();
    const { id } = req.params;
    // Aceptar ambos formatos: nombreColor/nombre, codigo_hex/hex, codigo_rgb/rgb
    const nombreColor = req.body.nombreColor !== undefined ? req.body.nombreColor : req.body.nombre;
    const codigo_hex = req.body.codigo_hex !== undefined ? req.body.codigo_hex : req.body.hex;
    const codigo_rgb = req.body.codigo_rgb !== undefined ? req.body.codigo_rgb : req.body.rgb;

    if (!id) {
      return res.status(400).json({
        success: false,
        mensaje: "El ID del color es requerido",
      });
    }

    // Validar formato de hex si se proporciona
    if (codigo_hex && !/^#([0-9A-Fa-f]{3}){1,2}$/.test(codigo_hex)) {
      return res.status(400).json({
        success: false,
        mensaje: "El código hexadecimal debe tener el formato #RRGGBB o #RGB",
      });
    }

    // Validar formato de RGB si se proporciona
    if (
      codigo_rgb &&
      !/^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(,\s*[\d.]+\s*)?\)$/.test(
        codigo_rgb
      )
    ) {
      return res.status(400).json({
        success: false,
        mensaje:
          "El código RGB debe tener el formato rgb(r, g, b) o rgba(r, g, b, a)",
      });
    }

    const datosActualizados = {};
    if (nombreColor !== undefined) datosActualizados.nombreColor = nombreColor.trim();
    if (codigo_hex !== undefined) {
      datosActualizados.codigo_hex = codigo_hex ? codigo_hex.trim() : null;
    }
    if (codigo_rgb !== undefined) {
      datosActualizados.codigo_rgb = codigo_rgb ? codigo_rgb.trim() : null;
    }

    const colorBuscado = await Colores.findByIdAndUpdate(
      id,
      datosActualizados,
      { new: true, runValidators: true }
    );

    if (!colorBuscado) {
      return res.status(404).json({
        success: false,
        mensaje: "No se encontro el color buscado",
      });
    }

    res.status(200).json({
      success: true,
      mensaje: "Color actualizado correctamente",
      data: transformarColor(colorBuscado),
    });
  } catch (err) {
    console.error(err);

    if (err.name === "CastError") {
      return res.status(400).json({
        success: false,
        mensaje: "ID de color inválido",
      });
    }

    if (err.code === 11000) {
      const campo = Object.keys(err.keyPattern)[0];
      return res.status(400).json({
        success: false,
        mensaje: `El ${campo === "nombreColor" ? "nombre del color" : campo} ya existe y debe ser único`,
      });
    }

    if (err.name === "ValidationError") {
      const errores = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        mensaje: "Error de validación",
        errores: errores,
      });
    }

    res.status(500).json({
      success: false,
      mensaje: "Ocurrio un error al editar el color",
      error: err.message,
    });
  }
};

export const obtenerColorID = async (req, res) => {
  try {
    // Conectar a la BD antes de consultar (importante para Vercel)
    await connectDB();
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        mensaje: "El ID del color es requerido",
      });
    }

    const colorBuscado = await Colores.findById(id);
    if (!colorBuscado) {
      return res.status(404).json({
        success: false,
        mensaje: "No se encontro el color buscado",
      });
    }
    res.status(200).json({
      success: true,
      data: transformarColor(colorBuscado),
    });
  } catch (err) {
    console.error(err);

    if (err.name === "CastError") {
      return res.status(400).json({
        success: false,
        mensaje: "ID de color inválido",
      });
    }

    res.status(500).json({
      success: false,
      mensaje: "Ocurrio un error al obtener el color",
      error: err.message,
    });
  }
};

