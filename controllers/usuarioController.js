const Usuario = require("../models/UsuarioModel");
/* dependencia para hashear/cifrar el password*/
const bcrypt = require("bcryptjs");
/* jsonwebtoken */
const jwt = require("jsonwebtoken");
/* Regresar los errores */
const { validationResult } = require("express-validator");

/* funciones que lleva para crear el usuario */
exports.crearUsuario = async (req, res) => {
  /* Verificar si existen errores */
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  /* Extraer los valores de email y password */
  const { email, password } = req.body;

  try {
    /* Revisar que el usuario registrado sea unico */
    let usuario = await Usuario.findOne({ email });

    if (usuario) {
      return res.status(400).json({ msg: "El usuario ya existe" });
    }

    /* crear el usuario */
    usuario = new Usuario(req.body);

    /* hashear el password */
    const salt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash(password, salt);

    /* guardar el usuario */
    await usuario.save();

    /* crear el jwt */
    const payload = {
      usuario: {
        id: usuario.id,
        categoria: usuario.categoria,
      },
    };

    /* Firmar el jwt */
    jwt.sign(
      payload,
      process.env.PALABRASUPERSECRETA,
      {
        expiresIn: "24h",
      },
      (error, token) => {
        if (error) throw error;

        /* mensaje de confirmacion */
        res.json({ token });
      }
    );
  } catch (error) {
    console.log(error);
  }
};
