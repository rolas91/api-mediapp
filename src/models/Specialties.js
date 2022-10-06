import { Sequelize } from "sequelize";
import db from "../config/conexion.js";

export default db.define("specialties", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  image: Sequelize.STRING,
});