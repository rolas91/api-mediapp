import { Sequelize } from "sequelize";
import db from "../config/conexion.js";

export default db.define("profile", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  code: Sequelize.STRING,
  name: Sequelize.STRING,
  description: Sequelize.STRING,
});
