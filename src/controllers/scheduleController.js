import Schedule from '../database/models/Schedule.js'
import User from '../database/models/User.js'
import DoctorInfo from "../database/models/DoctorInfo.js"
import Days from '../database/models/Days.js'

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
                { model: Country, attributes: ["country", "code"] },
                { model: City, as: "city", attributes: ["city"] },
              ],
              attributes: [
                "id",
                "names",
                "lastnames",
                "email",
                "id_number",
                "phone",
                "picture",
              ],
        })
       
        res.status(200).json({code:"success", data:result})
    } catch (error) {
        console.log(error)
    }
}