import express from "express";
const router = express.Router();

import { getShops } from "../controllers/shopsController.js";

export default function () {
  router.get("/shops", getShops);
  return router;
}
