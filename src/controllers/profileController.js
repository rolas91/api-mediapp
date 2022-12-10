import Profile from "../database/models/Profile.js"
import Cv_data from "../database/models/cv_data.js"
import Category_cv from "../database/models/category_cv.js"
import User from "../database/models/User.js"
import DoctorInfo from "../database/models/DoctorInfo.js"


export const getProfiles = async (req, res, next) => {
  try {
    const result = await Profile.findAll()
    res.status(200).json({ code: "success", data: result })
  } catch (error) {
    console.log(error)
    res.status(500).json({ code: "error", data: [] })
  }
}

export const saveDoctorProfile = async(req, res) => {
  try {
    const {bio, cv_data,specialties,health_code } = req.body;
    const user = await  User.findOne({
      where: { id: req.userid },
      include: [
        {
          model: DoctorInfo,
          as: "isDoctor",
        },
      ],
    })

    cv_data.forEach(async(item) => {
      const categorycv = await Category_cv.findOne({where:{name:item.name}});
      await Cv_data.create({
        name:item.name,
        placeHolder:item.placeHolder,
        controlType:item.controlType,
        value:item.value,
        categoryCVId:categorycv.id,
        doctorDataId:user.isDoctor.id
      })
    })

    if(user.isDoctor.length > 0){
      await DoctorInfo.update(
        {
          health_code,
          specialty_id:specialties,
          bio
        },
        {
          where:{id:user.isDoctor.id
        }
      })
    }

  } catch (error) {
    console.log(error);
  }
}
