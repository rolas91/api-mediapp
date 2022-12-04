import { Sequelize } from "sequelize"
import db from "../conexion.js"

export default db.define("days", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  day: Sequelize.STRING
})
