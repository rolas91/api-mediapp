import { Sequelize } from "sequelize";
import db from "../config/conexion.js";

export default db.define("", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  blood_type:Sequelize.STRING,
  
});
