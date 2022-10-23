import User from "../database/models/User.js"
import UserMedicalData from "../database/models/UserMedicalData.js"
import DoctorInfo from "../database/models/DoctorInfo.js"
import City from "../database/models/City.js"
import Country from "../database/models/Country.js"
import { genSalt, hash, compare } from "bcrypt"
import { generatedJWT } from "../helpers/jwt.js"
import { PROFILE_DOCTOR, PROFILE_USER } from "../utils/constants.js"

export const registerDoctor = async (req, res) => {
  try {
    let {
      names = "",
      email = "",
      password = "",
      phone = "",
      birthday = "",
      id_number = "",
      health_code = "",
      specialty_id = "",
      country_id = "",
      city_id = "",
    } = req.body
    const name = `${names.split(" ", 4)[0]} ${names.split(" ", 4)[1]}`
    const lastname = `${names.split(" ", 4)[2]} ${names.split(" ", 4)[3]}`
    const user = await User.findOne({ where: { email: email } })
    if (user) {
      return res
        .status(400)
        .json({ code: "error", message: "User allready register" })
    }
    const salt = await genSalt(10)
    password = await hash(password, salt)
    const userSaved = await User.create({
      names: name,
      lastnames: lastname,
      email,
      password,
      phone,
      dateofbirth: birthday,
      id_number,
      countryId: country_id,
      cityId: city_id,
    })
    await DoctorInfo.create({
      health_code: health_code,
      specialty_id: JSON.stringify(specialty_id),
      userId: userSaved.id,
    })
    res.status(201).json({
      code: "success",
      user: { names: userSaved.names, lastname: userSaved.lastnames },
      token: await generatedJWT(userSaved),
    })
  } catch (error) {
    res.status(500).json({ code: "error", message: error.message })
  }
}

export const registerUser = async (req, res) => {
  let {
    names = "",
    email = "",
    password = "",
    phone = "",
    birthday = "",
    id_number = "",
    blood_type = "",
    weight = "",
    height = "",
    age = "",
    country_id = "",
    city_id = "",
  } = req.body

  const name = `${names.split(" ", 4)[0]} ${names.split(" ", 4)[1]}`
  const lastname = `${names.split(" ", 4)[2]} ${names.split(" ", 4)[3]}`
  try {
    const user = await User.findOne({ where: { email: email } })
    if (user) {
      return res
        .status(400)
        .json({ code: "error", message: "User allready register" })
    }

    const salt = await genSalt(10)
    password = await hash(password, salt)
    const userSaved = await User.create({
      names: name,
      lastnames: lastname,
      email,
      password,
      phone,
      dateofbirth: birthday,
      id_number,
      countryId: country_id,
      cityId: city_id,
    })
    await UserMedicalData.create({
      blood_type,
      weight,
      height,
      age,
      userId: userSaved.id,
    })
    res.status(201).json({
      code: "success",
      user: { names: userSaved.names, lastname: userSaved.lastnames },
      token: await generatedJWT(userSaved),
    })
  } catch (error) {
    res.status(500).json({ code: "error", message: error.message })
  }
}

export const authenticateUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email: email })
    if (!user) {
      return res
        .status(400)
        .json({ code: "error", message: "user does not exist" })
    }

    const comparePass = await compare(password, user.password)
    if (!comparePass) {
      return res
        .status(400)
        .json({ code: "error", message: "Incorrect password" })
    }
    res.status(200).json({
      code: "success",
      user: Object.keys(user.dataValues)
        .map((item) => {
          if (item === "password") {
            delete user[item]
          }
          if (item === "picture") {
            if (user[item] === null) {
              user[item] = "https://mediapp.up.railway.app/static/doctors/1.jpg"
            }
          }
          return user
        })
        .filter((item) => {
          if (item != null) {
            return item
          }
        })[0],
      token: await generatedJWT(user),
    })
  } catch (error) {
    res.status(500).json({ code: "error", message: error })
  }
}
