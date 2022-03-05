const express = require("express");
const conectarDB = require("./config/db");
const cors = require("cors");

/* crear el servidor */
const app = express();

/* conectar a la bd */
conectarDB();

/* habilitar cors */
const whitelist = [process.env.FRONTEND_URL];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin)) {
      //puede consutlar la api
      callback(null, true);
    } else {
      callback(new Error("error de cors"));
    }
  },
};
app.use(cors(corsOptions));

/* Habilitar express.json */
app.use(express.json({ extended: true }));

/* Asignar puerto */
const port = process.env.PORT || 5000;

/* crear e importar las rutas */
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/admins", require("./routes/admins"));
app.use("/api/profesores", require("./routes/profesores"));
app.use("/api/alumnos", require("./routes/alumnos"));
app.use("/api/materias", require("./routes/materias"));
app.use("/api/materiasFilter", require("./routes/materiasFilter"));
app.use("/api/asignacion", require("./routes/asignacion"));
app.use("/api/calificaciones", require("./routes/calificaciones"));
app.use("/api/calificacion", require("./routes/calificacion"));

/* Iniciar la app */
app.listen(port, "0.0.0.0", () => {
  console.log(`El servidor esta funcionando en el puerto ${port}`);
});
