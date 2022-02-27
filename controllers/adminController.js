const AdminsModels = require("../models/AdminsModels");
const { validationResult } = require("express-validator");

/* Crear un admin */
exports.crearAdmin = async (req, res) => {
  /* Verificar que no haya errores */
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    /* Crea nuevo admin */
    const admin = new AdminsModels(req.body);
    const { cuenta } = req.body;

    const verificarAdmin = await AdminsModels.findOne({ cuenta });
    if (verificarAdmin) {
      return res
        .status(400)
        .json({ msg: "Ya existe un admin con este número de cuenta" });
    }

    /* Guardar el creador via jwt */
    admin.creador = req.usuario.id;

    /* guardamos el admin */
    admin.save();
    res.json(admin);
  } catch (error) {
    console.log(error);
    res.status(500).json("Hubo un error");
  }
};

/* Obtener los admin */

exports.obtenerAdmins = async (req, res) => {
  try {
    const admins = await AdminsModels.find({ creador: req.usuario.id }).sort({
      paterno: 1,
    });
    res.json({ admins });
  } catch (error) {
    console.log(error);
    res.status(500).json("Hubo un error");
  }
};

/* eliminar los admins */

exports.eliminarAdmins = async (req, res) => {
  try {
    /* revisar el id */
    let adminEliminar = await AdminsModels.findById(req.params.id);

    /* si el admin existe */
    if (!adminEliminar) {
      return res.status(400).json({ msg: "Admin no encontrado" });
    }
    /* Verificar el creador del admin */
    if (adminEliminar.creador.toString() !== req.usuario.id) {
      return res.status(400).json({ msg: "No autorizado" });
    }

    /* Eliminar el admin */
    await AdminsModels.findByIdAndRemove({ _id: req.params.id });
    res.json({ msg: "El administrador fue eliminado correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json("Hubo un error");
  }
};

/* Editar el admin */
exports.editarAdmin = async (req, res) => {
  /* Verificar que no haya errores */
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  /* Extraer la info del admin */
  const { nombre, paterno, materno, cuenta, privilegios } = req.body;
  const nuevoAdmin = {};

  if (nombre) {
    nuevoAdmin.nombre = nombre;
  }
  if (paterno) {
    nuevoAdmin.paterno = paterno;
  }
  if (materno) {
    nuevoAdmin.materno = materno;
  }
  if (cuenta) {
    nuevoAdmin.cuenta = cuenta;
  }
  if (privilegios) {
    nuevoAdmin.privilegios = privilegios;
  }
  try {
    /* Buscar y vericar que el administrador exista */
    let admin = await AdminsModels.findById(req.params.id);
    if (!admin) {
      return res.status(400).json({ msg: "Administrador no encontrado" });
    }

    /* verificar el creador del administrador */
    if (admin.creador.toString() !== req.usuario.id) {
      return res.status(400).json({ msg: "No autorizado" });
    }

    admin = await AdminsModels.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: nuevoAdmin },
      { new: true }
    );

    res.json({ admin });
  } catch (error) {
    console.log(error);
    res.status(500).json("Hubo un error");
  }
};
