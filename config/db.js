const mongoose = require("mongoose");
require("dotenv").config({ path: "variables.env" });

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("db conectada");
  } catch (error) {
    console.log(error);
    console.log("Hubo un error");
    process.exit(1);
  }
};

module.exports = conectarDB;
