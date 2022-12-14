import User from "../database/models/User.js"
import DoctorInfo from "../database/models/DoctorInfo.js"
import Country from "../database/models/Country.js"
import City from "../database/models/City.js"
import Specialties from "../database/models/Specialties.js"

export const getDoctors = async (req, res) => {
  try {
    const userDoctor = await User.findAll({
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
    res.status(200).json({
      code: "success",
      data: userDoctor,
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({ code: "error", error })
  }
}

export const getDoctorBySpecialitiesId = async (req, res) => {
  try {
    let specialties = []
    const users = await User.findAll({
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
    // const [getSpecialties] = await users.map((user) =>
    //   JSON.parse(user.isDoctor.specialty_id)
    // )

    for (let i = 0; i < users.length; i++) {
      let specialtiesArray = new Array()
      if (users[i].isDoctor?.specialty_id != null) {
        for (
          let j = 0;
          j < JSON.parse(users[i].isDoctor.specialty_id).length;
          j++
        ) {
          const { id, name } = await Specialties.findOne({
            where: { id: JSON.parse(users[i].isDoctor.specialty_id)[j] },
          })
          if (JSON.parse(users[i].isDoctor.specialty_id)[j] === id) {
            specialtiesArray.push(name)
            users[i].isDoctor.dataValues["specialties"] = specialtiesArray
          }
        }
      }
    }
    const result = users
      .map((user) => user)
      .filter((item) => {
        if (item.isDoctor !== null) {
          if (
            JSON.parse(item.isDoctor.specialty_id).includes(
              Number(req.params.specialty_id)
            )
          ) {
            return item
          }
        }
      })
    res.status(200).json({
      code: "success",
      data: [
        ...result.map((item) => {
          item.picture === null
            ? (item.picture =
                "https://mediapp.up.railway.app/static/doctors/1.jpg")
            : item.picture
          // item.isDoctor.dataValues["specialties"] = specialties
          return item
        }),
      ],
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({ code: "error", error })
  }
}
