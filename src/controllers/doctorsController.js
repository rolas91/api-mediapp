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
    // const data = [
    //   {
    //     id: 1,
    //     name: "Fidel Guzman Sevilla",
    //     specialities_id: [1, 2, 3],
    //     descriptiom: "Medico General & Ginecologia con 20 años de experiencia",
    //     image: `${process.env.URL}/static/doctors/1.jpg`,
    //   },
    // ]
    const users = await User.findAll({
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
    const result = users
      .map((user) => user)
      .filter((item) =>
        JSON.parse(item.isDoctor.specialty_id).includes(
          Number(req.params.specialty_id)
        )
      )
    res.status(200).json({
      code: "success",
      data: result,
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({ code: "error", error })
  }
}
