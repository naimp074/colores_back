import Colores from "../models/colores.js";

export const listarColores = async (req, res) => {
  try {
    const colores = await Colores.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: colores,
      total: colores.length,
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
    const { nombreColor, codigo_hex, codigo_rgb } = req.body;

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
      data: nuevoColor,
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
      data: colorBuscado,
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
    const { id } = req.params;
    const { nombreColor, codigo_hex, codigo_rgb } = req.body;

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
    if (nombreColor) datosActualizados.nombreColor = nombreColor.trim();
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
      data: colorBuscado,
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
      data: colorBuscado,
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

