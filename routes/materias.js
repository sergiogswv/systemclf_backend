const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check } = require("express-validator");
const materiaController = require("../controllers/materiaController");

/* rutas para las materias */
/* api/materias */
router.post(
  "/",
  auth,
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("grado", "El grado es obligatorio").not().isEmpty(),
    check("creditos", "El número de creditos es obligatorio").not().isEmpty(),
    check("opcion", "La opción es obligatoria").not().isEmpty(),
    check("clave", "La clave es obligatoria").not().isEmpty(),
  ],
  materiaController.crearMateria
);
router.get("/", auth, materiaController.obtenerMaterias);
router.delete("/:id", auth, materiaController.eliminarMateria);
router.put(
  "/:id",
  auth,
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("grado", "El grado es obligatorio").not().isEmpty(),
    check("creditos", "El número de creditos es obligatorio").not().isEmpty(),
    check("opcion", "La opción es obligatoria").not().isEmpty(),
    check("clave", "La clave es obligatoria").not().isEmpty(),
  ],
  materiaController.editarMateria
);

module.exports = router;
