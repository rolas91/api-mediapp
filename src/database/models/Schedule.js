import { Sequelize } from "sequelize"
import db from "../conexion.js"

export default db.define("schedule", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    },
    initial_schedule:{
        type: Sequelize.TIME
    },
    end_schedule:{
        type: Sequelize.TIME
    },
    dayId:Sequelize.INTEGER,
    userId:Sequelize.INTEGER
})
