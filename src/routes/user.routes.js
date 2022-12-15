import express from "express";
const router = express.Router();
import { validatedJWT } from "../middlewares/jwt-validator.js"

import { updateUser } from "../controllers/userController.js";

export default function () {
  router.put("/user/:id", validatedJWT ,updateUser);
  return router;
}
