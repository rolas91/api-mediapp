import express from "express";
const router = express.Router();
import { validatedJWT } from "../middlewares/jwt-validator.js"
import {upload} from '../lib/upload'


import { getProfiles,saveDoctorProfile } from "../controllers/profileController.js";

export default function () {
  router.get("/profile", getProfiles);
  router.post("/profile",[validatedJWT, upload.single('profileImg')],saveDoctorProfile);
  // router.post("/profile-upload-image",, )

  return router;
}
