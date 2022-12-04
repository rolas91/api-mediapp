import Schedule from '../database/models/Schedule.js'
import User from '../database/models/User.js'
import Days from '../database/models/Days.js'

export const addUserSchedule = async(req, res, next) => {
    try {
        const result = await User.findOne({where:{id:req.userid}})

        res.status(200).json({code:"success", data:result})
    } catch (error) {
        console.log(error)
    }
}