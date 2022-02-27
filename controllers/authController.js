const Usuario = require("../models/UsuarioModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.autenticarUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;

    /* buscar si existe el usuario */
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ msg: "El usuario no existe" });
    }

    /* comparar los passwords */
    const passswordCorrecto = await bcrypt.compare(password, usuario.password);
    if (!passswordCorrecto) {
      return res.status(400).json({ msg: "El password es incorrecto" });
    }

    /* firmar el jwt */
    const payload = {
      usuario: {
        id: usuario.id,
        categoria: usuario.categoria,
      },
    };
    jwt.sign(payload, process.env.PALABRASUPERSECRETA, (error, token) => {
      if (error) throw error;

      return res.json({ token });
    });
  } catch (error) {
    console.log(error);
  }
};

exports.usuarioAutenticado = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario.id).select("-password");
    res.json({ usuario });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error" });
  }
};
