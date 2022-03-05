const mongoose = require("mongoose");

const ProfMateriaSchema = mongoose.Schema({
  creado: {
    type: Date,
    default: Date.now(),
  },
  creador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
  },
  idProfesor: {
    type: String,
    required: true,
  },
  idMateria: {
    type: String,
    required: true,
  },
  uid: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Materia_Profesor", ProfMateriaSchema);
