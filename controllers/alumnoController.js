const AlumnoModels = require("../models/AlumnosModels");
const { validationResult } = require("express-validator");

exports.crearAlumnos = async (req, res) => {
  /* Validar que no haya errores en la captura */
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  try {
    const alumno = new AlumnoModels(req.body);

    const { cuenta } = req.body;
    const alumnoExiste = await AlumnoModels.findOne({ cuenta });
    if (alumnoExiste) {
      return res
        .status(400)
        .json({ msg: "Ya existe un alumno con este número de cuenta" });
    }

    /* guardar el creador via jwt */
    alumno.creador = req.usuario.id;

    alumno.save();
    res.json({ alumno });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error" });
  }
};

/* Obtener alumnos */
exports.obtenerAlumnos = async (req, res) => {
  try {
    const alumnos = await AlumnoModels.find({ creador: req.usuario.id }).sort({
      paterno: 1,
    });
    res.json({ alumnos });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error" });
  }
};

/* Eliminar Alumnos */
exports.eliminarAlumnos = async (req, res) => {
  try {
    /* Validar que el alumno exista */
    const alumnosEliminar = await AlumnoModels.findById(req.params.id);
    if (!alumnosEliminar) {
      return res.status(400).json({ msg: "El alumno no existe" });
    }

    /* Validar que este autorizado */
    const { creador } = alumnosEliminar;
    if (creador.toString() !== req.usuario.id) {
      return res.status(400).json({ msg: "No autorizado" });
    }

    /* Eliminar el alumno */
    await AlumnoModels.findByIdAndRemove({
      _id: req.params.id,
    });
    res.json({ msg: "El alumno fue eliminado correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error" });
  }
};
/* Editar el alumno */
exports.editarAlumno = async (req, res) => {
  /* Validar que no haya errores en la captura */
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  const nuevoAlumno = {};
  const { nombre, paterno, materno, grado, cuenta } = req.body;
  if (nombre) {
    nuevoAlumno.nombre = nombre;
  }
  if (paterno) {
    nuevoAlumno.paterno = paterno;
  }
  if (materno) {
    nuevoAlumno.materno = materno;
  }
  if (grado) {
    nuevoAlumno.grado = grado;
  }
  if (cuenta) {
    nuevoAlumno.cuenta = cuenta;
  }

  try {
    let alumno = await AlumnoModels.findById(req.params.id);
    if (!alumno) {
      return res.status(400).json({ msg: "El alumno no existe" });
    }
    /* Verificar que este autorizado */
    if (alumno.creador.toString() !== req.usuario.id) {
      return res.status(400).json({ msg: "No autorizado" });
    }

    /* modificar */
    await AlumnoModels.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: nuevoAlumno },
      { new: true }
    );
    res.json({ nuevoAlumno });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error" });
  }
};
