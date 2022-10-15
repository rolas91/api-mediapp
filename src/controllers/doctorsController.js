import User from "../database/models/User.js"
import DoctorInfo from "../database/models/DoctorInfo.js"
import Country from "../database/models/Country.js"
import City from "../database/models/City.js"

export const getDoctors = async (req, res) => {
  try {
    const userDoctor = await User.findAll({
      include: [
        {
          model: DoctorInfo,
          as: "isDoctor",
          attributes: ["health_code", "specialty_id"],
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
    const result = users
      .map((user) => user)
      .filter((item) =>
        JSON.parse(item.isDoctor.specialty_id).includes(
          Number(req.params.specialty_id)
        )
      )
    res.status(200).json({
      code: "success",
      data: result.map((item) => {
        item.picture === null
          ? (item.picture =
              "https://mediapp.up.railway.app/static/doctors/1.jpg")
          : item.picture
        return item
      }),
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({ code: "error", error })
  }
}
