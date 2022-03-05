const { validationResult } = require("express-validator");
const CalificacionModels = require("../models/CalificacionModels");

/* Obtener las calificaciones */
exports.obtenerCalificacion = async (req, res) => {
  /* Validar que no haya errores */
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  const calificaciones = await CalificacionModels.aggregate([
    {
      $lookup: {
        from: "materias",
        localField: "materia",
        foreignField: "_id",
        as: "MateriaData",
      },
    },
  ])
    .match({ alumnoId: req.params.id })
    .sort({ grado: 1 });

  if (!calificaciones) {
    return res.status(400).json({ msg: "Este alumno no tiene calificaciones" });
  }

  res.json({ calificaciones });
};

/* Agregar calificacion */
exports.agregarCalificacion = async (req, res) => {
  /* Validar que no haya errores */
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  const { materia, alumnoId } = req.body;
  const materiaExiste = await CalificacionModels.findOne({ materia, alumnoId });
  if (materiaExiste !== null) {
    return res.status(400).json({
      msg: "El alumno ya tiene una calificación asignada a esta materia",
    });
  }

  const calificacion = new CalificacionModels(req.body);
  calificacion.creador = req.usuario.id;

  calificacion.save();
  res.json({ calificacion });
};

/* Editar calificación */
exports.editarCalificacion = (req, res) => {};
/* Eliminar calificación */
exports.eliminarCalificacion = (req, res) => {};
