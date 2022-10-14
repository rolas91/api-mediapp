import express from "express"
const router = express.Router()
import {
  getDoctors,
  getDoctorBySpecialitiesId,
} from "../controllers/doctorsController.js"
export default function () {
  router.get("/doctors", getDoctors)

  router.get("/doctors/:specialty_id", getDoctorBySpecialitiesId)
  return router
}
