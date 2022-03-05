const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const materiaController = require("../controllers/materiaController");

/* rutas para las materias */
/* api/materiasFilter */
router.post("/", auth, materiaController.obtenerMateriasFilter);

module.exports = router;
