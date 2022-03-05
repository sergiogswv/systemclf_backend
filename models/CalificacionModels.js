const mongoose = require("mongoose");

const CalificacionModels = mongoose.Schema({
  creado: {
    type: Date,
    default: Date.now(),
  },
  creador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
  },
  alumnoId: {
    type: String,
    required: true,
    trim: true,
  },
  alumnoCuenta: {
    type: String,
    required: true,
    trim: true,
  },
  grado: {
    type: Number,
    required: true,
  },
  materia: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: false,
  },
  calificacion: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Calificaciones", CalificacionModels);
