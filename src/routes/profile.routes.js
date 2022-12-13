import express from "express";
const router = express.Router();
import { validatedJWT } from "../middlewares/jwt-validator.js"
import {upload} from '../lib/upload.js'


import { getProfiles,saveDoctorProfile, uploadImage } from "../controllers/profileController.js";

export default function () {
  router.get("/profile", getProfiles);
  router.post("/profile",validatedJWT,saveDoctorProfile);
  router.post("/profile-upload-image", upload.single('profileImg'), uploadImage)

  return router;
}
