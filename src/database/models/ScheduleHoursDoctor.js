import { Sequelize } from "sequelize"
import db from "../conexion.js"

export default db.define("schemahoursdoctor", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  hour:Sequelize.TIME,
  scheduleId:Sequelize.INTEGER
})
