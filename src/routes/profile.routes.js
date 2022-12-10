import express from "express";
const router = express.Router();
import { validatedJWT } from "../middlewares/jwt-validator.js"


import { getProfiles,saveDoctorProfile } from "../controllers/profileController.js";

export default function () {
  router.get("/profile", getProfiles);
  router.post("/profile",validatedJWT,saveDoctorProfile);
  return router;
}
