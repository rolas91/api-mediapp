import express from "express";
const router = express.Router();

import { getProfiles,saveDoctorProfile } from "../controllers/profileController.js";

export default function () {
  router.get("/profile", getProfiles);
  router.post("/profile", saveDoctorProfile);
  return router;
}
