import Schedule from '../database/models/Schedule.js'
import User from '../database/models/User.js'
import ScheduleHoursDoctor from '../database/models/ScheduleHoursDoctor.js'
import DoctorInfo from "../database/models/DoctorInfo.js"
import Days from '../database/models/Days.js'
import Country from '../database/models/Country.js'
import City from '../database/models/City.js'

export const addUserSchedule = async(req, res, next) => {
    try {
        const user = await User.findOne({
            where:{id:req.userid},
            include: [
                {
                  model: DoctorInfo,
                  as: "isDoctor",
                  attributes: ["health_code", "specialty_id", "bio"],
                },
            ],
            attributes: ["id"],
        });
        if(!user.isDoctor){
            return  res.status(400).json({code:"error", message:"unauthorized transaction"})
        }

        const day = await Days.findOne({where:{day:req.body.day}});

        if(!day){
            return  res.status(400).json({code:"error", message:"please add a day of week valid"})
        }

        const ifExistSchedule = await Schedule.findOne({
            where:{
                dayId:day.id,
                userId:user.id
            }
        })
        if(ifExistSchedule){
            return  res.status(400).json({code:"error", message:"this day has already been registered"})
        }

        const newSchedule = await Schedule.create({
            initial_schedule:req.body.initialSchedule,
            end_schedule:req.body.endSchedule,
            dayId:day.id,
            userId:user.id
        });
       
        res.status(200).json({code:"success", data:newSchedule})
    } catch (error) {
        res.status(200).json({code:"error", error})
    }
}

export const getDoctorScheduleByDay = async(req, res, next) => {
    try {
        const schedule = await Schedule.findAll({
            where:{userId:req.userid}, 
            include:[
                {
                    model:Days,
                    as:"day",
                    where:{day:req.params.day}
                },
                {
                    model:ScheduleHoursDoctor,
                    as:"hours"
                }
            ]
        })
        res.status(200).json({code:"success", schedule})
    } catch (error) {
        console.log(error)
        res.status(400).json({code:"success", error})
    }
}