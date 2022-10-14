import { Sequelize } from "sequelize"
import db from "../conexion.js"

export default db.define("cities", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  city: Sequelize.STRING,
  countryId: Sequelize.INTEGER,
})
