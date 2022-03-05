const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const auth = require("../middleware/auth");
const { check } = require("express-validator");

/* Iniciar sesión */
/* api/auth */
router.post(
  "/",
  [
    check("email", "El email no es válido").isEmail(),
    check("password", "El password es obligatorio").not().isEmpty(),
  ],
  authController.autenticarUsuario
);
router.get("/", auth, authController.usuarioAutenticado);

module.exports = router;
