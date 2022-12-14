import express from "express";
const router = express.Router();
import { validatedJWT } from "../middlewares/jwt-validator.js"

import { getProfiles,saveDoctorProfile, saveImage } from "../controllers/profileController.js";

export default function () {
  router.get("/profile", getProfiles);
  router.post("/profile",validatedJWT,saveDoctorProfile);
  router.post("/profile-upload-image",validatedJWT, saveImage )
  return router;
}
