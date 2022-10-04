import express from "express";
const router = express.Router();

import { getCities, createCity } from "../controllers/cityController.js";

export default function () {
  router.get("/city", getCities);
  router.post("/city", createCity);
  return router;
}
