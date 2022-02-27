const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");

  /* Revisar que exista un token */
  if (!token) {
    return res.status(400).json({ msg: "El token no es válido" });
  }

  /* validar el token */
  try {
    const cifrado = jwt.verify(token, process.env.PALABRASUPERSECRETA);
    req.usuario = cifrado.usuario;
    next();
  } catch (error) {
    res.status(400).json({ msg: "El token no es válido" });
  }
};
