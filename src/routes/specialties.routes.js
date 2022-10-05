import express from "express";
const router = express.Router();

import { getSpecialties } from "../controllers/specialtiesController.js";

export default function () {
  router.get("/specialties", getSpecialties);
  return router;
}
