const ProfMateriaModels = require("../models/ProfMateriaModels");
const { validationResult } = require("express-validator");

exports.crearAsignacion = async (req, res) => {
  try {
    //console.log(req.body);
    const materiaAsignada = new ProfMateriaModels(req.body);
    const { uid } = req.body;

    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }

    const uidExiste = await ProfMateriaModels.findOne({ uid });
    if (uidExiste) {
      return res
        .status(400)
        .json({ msg: "El profesor ya tiene esta materia asignada" });
    }

    /* guardar el creado */
    materiaAsignada.creador = req.usuario.id;
    materiaAsignada.save();
    res.json({ materiaAsignada });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error" });
  }
};
