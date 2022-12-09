import { Sequelize } from "sequelize"
import db from "../conexion.js"

export default db.define("cv_data", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name:Sequelize.STRING,
  placeHolder:Sequelize.STRING,
  controlType:Sequelize.STRING,
  value:Sequelize.STRING,
  categoryCVId:Sequelize.INTEGER,
  doctorDataId:Sequelize.INTEGER
})
