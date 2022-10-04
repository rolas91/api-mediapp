import { Sequelize } from "sequelize";
import db from "../config/conexion.js";

export default db.define("user_medical_data", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  blood_type: Sequelize.STRING,
  weight: Sequelize.STRING,
  height: Sequelize.STRING,
  age: Sequelize.STRING,
  userId: Sequelize.INTEGER,
});
