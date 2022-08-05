import express from "express";
import "dotenv/config";
const app = express();
import routes from "./src/routes/index.js";
import bodyParser from "body-parser";
import db from "./src/config/conexion.js";

db.authenticate()
  .then(() => {
    console.log("db connection success");
    db.sync({ force: false });
  })
  .catch((error) => console.log(error));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

for (let i in routes) {
  app.use("/api", routes[i]());
}

app.listen(process.env.PORT || 3000, () =>
  console.log(`server running is port ${process.env.PORT}`)
);
