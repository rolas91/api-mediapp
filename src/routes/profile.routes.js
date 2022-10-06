import express from "express";
const router = express.Router();

import { getProfiles } from "../controllers/profileController.js";

export default function () {
  router.get("/profile", getProfiles);
  return router;
}
