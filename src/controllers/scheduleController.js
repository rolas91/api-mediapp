import Schedule from '../database/models/Schedule.js'
import User from '../database/models/User.js'
import DoctorInfo from "../database/models/DoctorInfo.js"
import Days from '../database/models/Days.js'
import Country from '../database/models/Country.js'
import City from '../database/models/City.js'

export const addUserSchedule = async(req, res, next) => {
    try {
        const result = await User.findOne({
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
        if(!result.isDoctor){
            return  res.status(200).json({code:"error", message:"unauthorized transaction"})
        }
       
        res.status(200).json({code:"success", data:result})
    } catch (error) {
        console.log(error)
    }
}