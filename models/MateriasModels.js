const mongoose = require("mongoose");

const MateriasModels = mongoose.Schema({
  nombre: {
    type: String,
    trim: true,
    required: true,
  },
  grado: {
    type: Number,
    trim: true,
    required: true,
  },
  creditos: {
    type: Number,
    trim: true,
    required: true,
  },
  opcion: {
    type: String,
    trim: true,
    required: true,
  },
  clave: {
    type: String,
    trim: true,
    required: true,
  },
  creador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
  },
  creado: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Materia", MateriasModels);
