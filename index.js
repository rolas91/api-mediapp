import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";
const app = express();
import routes from "./src/routes/index.js";
import bodyParser from "body-parser";
import db from "./src/config/conexion.js";
import {
  addSpecialties,
  addCountries,
  addShops,
  addProfileCode,
} from "./src/lib/setup.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

db.authenticate()
  .then(() => {
    console.log("db connection success");
    db.sync({ force: true });
  })
  .catch((error) => console.log(error))
  .finally(() => {
    setTimeout(() => {
      addSpecialties();
      addCountries();
      addShops();
      addProfileCode();
    }, 10000);
  });
//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/static", express.static(path.join(__dirname, "/public")));

for (let i in routes) {
  app.use("/api", routes[i]());
}

app.listen(process.env.PORT || 3000, () => {
  console.log(`server running is port ${process.env.PORT}`);
});
