import express from 'express'
const router = express.Router()
import {addUserSchedule} from '../controllers/scheduleController.js'

export default function(){
    router.post("/schedule",addUserSchedule)

    return router;
}