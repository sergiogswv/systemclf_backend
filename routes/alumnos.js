const express = require("express");
const router = express.Router();
const alumnoController = require("../controllers/alumnoController");
const { check } = require("express-validator");
const auth = require("../middleware/auth");

/* rutas para alumnos */
/* api/alumnos */
router.post(
  "/",
  auth,
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("paterno", "El apellido paterno es obligatorio").not().isEmpty(),
    check("materno", "El apellido materno es obligatorio").not().isEmpty(),
    check("grado", "El grado es obligatorio").not().isEmpty(),
    check("cuenta", "El número de cuenta es obligatorio").not().isEmpty(),
  ],
  alumnoController.crearAlumnos
);
router.get("/", auth, alumnoController.obtenerAlumnos);
router.delete("/:id", auth, alumnoController.eliminarAlumnos);
router.put("/:id", auth, alumnoController.editarAlumno);

module.exports = router;
