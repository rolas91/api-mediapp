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
  dateofbirth: Sequelize.STRING,
  id_number: Sequelize.STRING,
  phone: Sequelize.STRING,
  countryId: Sequelize.INTEGER,
  cityId: Sequelize.INTEGER,
  roles: Sequelize.STRING,
});
