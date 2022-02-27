const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const { check } = require("express-validator");
const profesorController = require("../controllers/profesorController");

/* rutas de prof */
/* api/profesores */
router.post(
  "/",
  auth,
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("paterno", "El apellido paterno es obligatorio").not().isEmpty(),
    check("materno", "El apellido materno es obligatorio").not().isEmpty(),
    check("cuenta", "El número de cuenta es obligatorio").not().isEmpty(),
  ],
  profesorController.crearProfesor
);

router.get("/", auth, profesorController.obtenerProfesores);
router.delete("/:id", auth, profesorController.eliminarProfesores);
router.put(
  "/:id",
  auth,
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("paterno", "El apellido paterno es obligatorio").not().isEmpty(),
    check("materno", "El apellido materno es obligatorio").not().isEmpty(),
    check("cuenta", "El número de cuenta es obligatorio").not().isEmpty(),
  ],
  profesorController.editarProfesor
);
module.exports = router;
