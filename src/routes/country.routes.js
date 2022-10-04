import express from "express";
const router = express.Router();

import {
  getCountries,
  createCountry,
} from "../controllers/countryController.js";

export default function () {
  router.get("/country", getCountries);
  router.post("/country", createCountry);
  return router;
}
