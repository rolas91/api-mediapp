import express from 'express'
const router = express.Router()
import { validatedJWT } from "../middlewares/jwt-validator.js"
import {addUserSchedule,getDoctorScheduleByDay} from '../controllers/scheduleController.js'

export default function(){
    router.post("/schedule",validatedJWT,addUserSchedule)
    router.get("/schedule/:doctor/:day",validatedJWT,getDoctorScheduleByDay)
    return router;
}