const mongoose = require("mongoose");

const ProfesoresModels = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  paterno: {
    type: String,
    required: true,
    trim: true,
  },
  materno: {
    type: String,
    required: true,
    trim: true,
  },
  cuenta: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  creador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
  },
  creado: {
    type: Date,
    default: Date.now(),
  },
  categoria: {
    type: String,
    default: "5000",
  },
});

module.exports = mongoose.model("Profesor", ProfesoresModels);
