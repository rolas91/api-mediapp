import express from "express";
const router = express.Router();

import {
  authenticateUser,
  registerUser,
} from "../controllers/authController.js";

export default function () {
  router.post("/auth/register", registerUser);
  router.post("/auth/login", authenticateUser);

  return router;
}
