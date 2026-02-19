require("dotenv").config();
const {Sequelize} = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: process.env.DB_DIALECT,
  }
);

sequelize.authenticate()
    .then(()=> console.log('Conexion Exitosa'))
    .catch((err)=> console.log('Ocurrio un error en la conexion de BD', err));

module.exports=sequelize