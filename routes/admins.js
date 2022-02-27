const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const adminController = require("../controllers/adminController");
const { check } = require("express-validator");

/* Agregar un nuevo admin */
router.post(
  "/",
  auth,
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("paterno", "El apellido paterno es obligatorio").not().isEmpty(),
    check("materno", "El apellido materno es obligatorio").not().isEmpty(),
    check("cuenta", "El número de cueta es obligatorio").not().isEmpty(),
    check("privilegios", "Los privilegios son obligatorios").not().isEmpty(),
  ],
  adminController.crearAdmin
);

router.get("/", auth, adminController.obtenerAdmins);
router.delete("/:id", auth, adminController.eliminarAdmins);
router.put(
  "/:id",
  auth,
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("paterno", "El apellido paterno es obligatorio").not().isEmpty(),
    check("materno", "El apellido materno es obligatorio").not().isEmpty(),
    check("cuenta", "El número de cueta es obligatorio").not().isEmpty(),
    check("privilegios", "Los privilegios son obligatorios").not().isEmpty(),
  ],
  adminController.editarAdmin
);
module.exports = router;
