const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const asignarController = require("../controllers/asignarController");
const { check } = require("express-validator");

/* rutas para asignar la materia */
/* api/asginar */
router.post(
  "/",
  [
    check("idProfesor", "El profesor es obligatorio").not().isEmpty(),
    check("idMateria", "La materia es obligatoria").not().isEmpty(),
    check("uid", "El uid es obligatorio").not().isEmpty(),
  ],
  auth,
  asignarController.crearAsignacion
);

module.exports = router;
