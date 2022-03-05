const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const calificacionController = require("../controllers/calificacionController");

/* Rutas para las calificaciones */
router.get("/", auth, calificacionController.obtenerCalificacion);
router.post(
  "/",
  auth,
  [
    check("grado", "El grado es obligatorio").not().isEmpty(),
    check("materia", "La materia es obligatoria").not().isEmpty(),
    check("calificacion", "La calificación es obligatorio").not().isEmpty(),
    check("alumnoId", "El alumno es obligatorio").not().isEmpty(),
    check("alumnoCuenta", "El alumno es obligatorio").not().isEmpty(),
  ],
  calificacionController.agregarCalificacion
);
router.put(
  "/",
  auth,
  [
    check("grado", "El grado es obligatorio").not().isEmpty(),
    check("materia", "La materia es obligatoria").not().isEmpty(),
    check("calificacion", "La calificación es obligatorio").not().isEmpty(),
    check("alumnoId", "La calificación es obligatorio").not().isEmpty(),
    check("alumnoCuenta", "La calificación es obligatorio").not().isEmpty(),
  ],
  calificacionController.editarCalificacion
);
router.delete("/", auth, calificacionController.eliminarCalificacion);

module.exports = router;
