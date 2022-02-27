const express = require("express");
const conectarDB = require("./config/db");
const cors = require("cors");

/* crear el servidor */
const app = express();

/* conectar a la bd */
conectarDB();

/* habilitar cors */
app.use(cors());

/* Habilitar express.json */
app.use(express.json({ extended: true }));

/* Asignar puerto */
const port = process.env.PORT || 4000;

/* crear e importar las rutas */
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/admins", require("./routes/admins"));
app.use("/api/profesores", require("./routes/profesores"));
app.use("/api/alumnos", require("./routes/alumnos"));
app.use("/api/materias", require("./routes/materias"));

/* Iniciar la app */
app.listen(port, "0.0.0.0", () => {
  console.log(`El servidor esta funcionando en el puerto ${port}`);
});
