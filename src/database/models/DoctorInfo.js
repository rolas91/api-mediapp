import { Sequelize } from "sequelize"
import db from "../conexion.js"

export default db.define("doctor_data", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  health_code: Sequelize.STRING,
  specialty_id: Sequelize.STRING,
  userId: Sequelize.INTEGER,
})
