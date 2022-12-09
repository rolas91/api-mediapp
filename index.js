import express from "express"
import path from "path"
import { fileURLToPath } from "url"
import "dotenv/config"
import cors from "cors"
const app = express()
import routes from "./src/routes/index.js"
import bodyParser from "body-parser"
import db from "./src/database/conexion.js"
import asociations from "./src/database/asociations.js"
import {
  addSpecialties,
  addCountries,
  addShops,
  addProfileCode,
  addDays
} from "./src/lib/setup.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

//middleware
app.use(cors({ origin: "*", credentials: true }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use("/static", express.static(path.join(__dirname, "/public")))

for (let i in routes) {
  app.use("/api", routes[i]())
}

app.listen(process.env.PORT || 3000, () => {
  console.log(`server running is port ${process.env.PORT}`)
  db.authenticate()
    .then(() => {
      db.sync({ force: true })
      console.log("db connection success")
    })
    .catch((error) => console.log(error))
    .finally(() => {
      //relations tables
      asociations()
      setTimeout(() => {
        addSpecialties()
        addCountries()
        addShops()
        addProfileCode()
        addDays()
      }, 30000)
    })
})
