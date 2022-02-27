const { validationResult } = require("express-validator");
const ProfesoresModels = require("../models/ProfesoresModels");

/* Crear profesor */
exports.crearProfesor = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  try {
    const prof = new ProfesoresModels(req.body);
    const { cuenta } = req.body;

    /* Validar que el prof ya exista */
    const profExiste = await ProfesoresModels.findOne({ cuenta });
    if (profExiste) {
      return res
        .status(400)
        .json({ msg: "Ya existe un profesor con ese número de cuenta" });
    }
    /* Asignamos al creador */
    prof.creador = req.usuario.id;

    /* guardamos el prof */
    prof.save();
    res.json({ prof });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

/* obtener profesores */
exports.obtenerProfesores = async (req, res) => {
  try {
    const profesores = await ProfesoresModels.find({ creador: req.usuario.id });
    res.json({ profesores });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

/* Eliminar profesores */
exports.eliminarProfesores = async (req, res) => {
  try {
    /* verificar que exista el prof */
    const profesor = await ProfesoresModels.findById(req.params.id);
    if (!profesor) {
      return res.status(400).json({ msg: "El profesor no existe" });
    }

    /* Verificar que es el creador correcto */
    if (profesor.creador.toString() !== req.usuario.id) {
      return res.status(400).json({ msg: "No autorizado" });
    }

    await ProfesoresModels.findByIdAndRemove({ _id: req.params.id });
    res.json({ msg: "El profesor fue eliminado correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

/* editar profesor- */
exports.editarProfesor = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  const { nombre, paterno, materno, cuenta } = req.body;
  const nuevoProfesor = {};

  if (nombre) {
    nuevoProfesor.nombre = nombre;
  }
  if (paterno) {
    nuevoProfesor.paterno = paterno;
  }
  if (materno) {
    nuevoProfesor.materno = materno;
  }
  if (cuenta) {
    nuevoProfesor.cuenta = cuenta;
  }
  try {
    /* validar que el profesor exista */
    let profesor = await ProfesoresModels.findById(req.params.id);
    if (!profesor) {
      return res.status(400).json({ msg: "El profesor no existe" });
    }

    /* validar que el creador es quien edita */
    if (profesor.creador.toString() !== req.usuario.id) {
      return res.status(400).json({ msg: "No autorizado" });
    }

    /* editar el profesor */
    profesor = await ProfesoresModels.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: nuevoProfesor },
      { new: true }
    );
    res.json({ profesor });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};
