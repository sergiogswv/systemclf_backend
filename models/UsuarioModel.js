/* Modelo del usuario */
const mongoose = require("mongoose");

/* Modelo = campos que lleva el usuario para agregar en la bd */
const usuarioSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  fechaCreate: {
    type: Date,
    default: Date.now(),
  },
  categoria: {
    type: String,
    default: "1000",
  },
});

module.exports = mongoose.model("Usuario", usuarioSchema);
