const mongoose = require("mongoose");

const AlumnosModels = mongoose.Schema({
  nombre: {
    type: String,
    trim: true,
    required: true,
  },
  paterno: {
    type: String,
    trim: true,
    required: true,
  },
  materno: {
    type: String,
    trim: true,
    required: true,
  },
  cuenta: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  grado: {
    type: Number,
    trim: true,
    required: true,
  },
  creado: {
    type: Date,
    default: Date.now(),
  },
  categoria: {
    type: String,
    default: "7000",
  },
  creador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
  },
});

module.exports = mongoose.model("Alumno", AlumnosModels);
