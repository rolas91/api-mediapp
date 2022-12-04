import Schedule from '../database/models/Schedule.js'
import User from '../database/models/User.js'
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
            attributes: ["id","isDoctor"],
        });
        if(!user.isDoctor){
            return  res.status(200).json({code:"error", message:"unauthorized transaction"})
        }

        const day = await User.findOne({where:{}})
       
        res.status(200).json({code:"success", data:result})
    } catch (error) {
        console.log(error)
    }
}

export const getDoctorScheduleByDay = async(req, res, next) => {
    try {
        console.log(req.paramsday)
        const schedule = await Schedule.findAll({
            where:{userId:req.userid}, 
            include:[
                {
                    model:Days,
                    as:"day",
                    where:{day:req.params.day}
                }
            ]
        })
        res.status(200).json({code:"success", schedule})
    } catch (error) {
        console.log(error)
    }
}