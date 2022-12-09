import { Sequelize } from "sequelize"
import db from "../conexion.js"

export default db.define("category_cv", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: Sequelize.STRING
})
