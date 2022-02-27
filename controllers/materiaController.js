const { validationResult } = require("express-validator");
const MateriasModels = require("../models/MateriasModels");

/* Crear materia */
exports.crearMateria = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    const materia = new MateriasModels(req.body);
    const { clave } = req.body;

    /* Validar si exite la materia */
    const materiaExiste = await MateriasModels.findOne({ clave });
    if (materiaExiste) {
      return res
        .status(400)
        .json({ msg: "Ya existe una materia con esa clave" });
    }

    /* Agregar el creador via jwt */
    materia.creador = req.usuario.id;

    materia.save();
    res.json({ materia });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error" });
  }
};

/* Obtener las materias */
exports.obtenerMaterias = async (req, res) => {
  try {
    const materias = await MateriasModels.find({
      creador: req.usuario.id,
    }).sort({ grado: 1 });
    res.json({ materias });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error" });
  }
};

/* Eliminar materia */
exports.eliminarMateria = async (req, res) => {
  try {
    /* Validar que la materia existe */
    const materiaEliminar = await MateriasModels.findById(req.params.id);
    if (!materiaEliminar) {
      return res.status(400).json({ msg: "La materia no existe" });
    }

    /* Validar que estoy autorizado */
    if (materiaEliminar.creador.toString() !== req.usuario.id) {
      return res.status(400).json({ msg: "No autorizado" });
    }

    /* eliminar la materia */
    await MateriasModels.findByIdAndRemove({ _id: req.params.id });
    res.json({ msg: "La materia fue eliminada correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error" });
  }
};

/* Editar materia */
exports.editarMateria = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  const nuevaMateria = {};
  const { nombre, grado, creditos, opcion, clave } = req.body;
  if (nombre) {
    nuevaMateria.nombre = nombre;
  }
  if (grado) {
    nuevaMateria.grado = grado;
  }
  if (creditos) {
    nuevaMateria.creditos = creditos;
  }
  if (opcion) {
    nuevaMateria.opcion = opcion;
  }
  if (clave) {
    nuevaMateria.clave = clave;
  }
  try {
    /* verificar que la materia existe*/
    let materia = await MateriasModels.findById(req.params.id);
    if (!materia) {
      return res.status(400).json({ msg: "La materia no existe" });
    }

    /* Verificar que estoy autorizado */
    if (materia.creador.toString() !== req.usuario.id) {
      return res.status(400).json({ msg: "No autorizado" });
    }

    /* editar la materia */
    await MateriasModels.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: nuevaMateria },
      { new: true }
    );
    res.json({ nuevaMateria });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error" });
  }
};
