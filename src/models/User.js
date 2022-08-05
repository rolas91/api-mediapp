import { Sequelize } from "sequelize";
import db from "../config/conexion.js";

export default db.define("users", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  names: Sequelize.STRING,
  lastnames: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  phone: Sequelize.STRING,
});
