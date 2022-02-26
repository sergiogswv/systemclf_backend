/* Ruta para crear usuarios */
const express = require("express");
const router = express.Router();
/* Se agrega el controller del usuario */
const UsuarioModel = require("../controllers/usuarioController");
/* Agregar validaciones */
const { check } = require("express-validator");

/* Crear un usuario */
/* api/usuarios */
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe ser al menos de 6 caracteres").isLength(
      { min: 6 }
    ),
    check("email", "El email no es válido").isEmail(),
  ],
  UsuarioModel.crearUsuario
);

module.exports = router;
