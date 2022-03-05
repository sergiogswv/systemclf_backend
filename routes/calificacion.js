const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const calificacionController = require("../controllers/calificacionController");

/* Rutas para las calificaciones */
router.post("/:id", auth, calificacionController.obtenerCalificacion);

module.exports = router;
