import { Sequelize } from "sequelize";
import db from "../config/conexion.js";

export default db.define("countries", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  country: Sequelize.STRING,
  code: Sequelize.STRING,
  iso: Sequelize.STRING,
});
