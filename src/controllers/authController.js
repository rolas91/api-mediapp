import User from "../database/models/User.js"
import UserMedicalData from "../database/models/UserMedicalData.js"
import Profile from "../database/models/Profile.js"
import DoctorInfo from "../database/models/DoctorInfo.js"
import { genSalt, hash, compare } from "bcrypt"
import jwt from "jsonwebtoken"
import { PROFILE_DOCTOR, PROFILE_USER } from "../utils/constants.js"

const createToken = (user, secret, expiresIn) => {
  const { id, email } = user
  return jwt.sign({ id, email }, secret, { expiresIn })
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
    profilecode = "",
    health_code = "",
    specialty_id = "",
    country_id = "",
    city_id = "",
  } = req.body

  const name = `${names.split(" ", 4)[0]} ${names.split(" ", 4)[1]}`
  const lastname = `${names.split(" ", 4)[2]} ${names.split(" ", 4)[3]}`
  try {
    const profile = await Profile.findOne({ where: { code: profilecode } })
    const user = await User.findOne({ where: { email: email } })
    if (user) {
      res.status(500).json({ code: "error", message: "User allready register" })
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
      blood_type,
      weight,
      height,
      age,
      countryId: country_id,
      cityId: city_id,
    })
    if (
      (profile != null || profile != undefined) &&
      profile.code === PROFILE_USER
    ) {
      await UserMedicalData.create({
        blood_type,
        weight,
        height,
        age,
        userId: userSaved.id,
      })
    } else if (
      (profile != null || profile != undefined) &&
      profile.code === PROFILE_DOCTOR
    ) {
      await DoctorInfo.create({
        health_code: health_code,
        specialty_id: JSON.stringify(specialty_id),
        userId: userSaved.id,
      })
    }

    if (userSaved) {
      res.status(200).json({
        code: "success",
        user: { names: userSaved.names, lastname: userSaved.lastnames },
      })
    }
  } catch (error) {
    res.status(500).json({ code: "error", message: error.message })
  }
}

export const authenticateUser = async (req, res) => {
  const { email, password } = req.body
  let errors = []
  if (!email) {
    errors.push({ code: errors, message: "Please add your email" })
  }
  if (!password) {
    errors.push({ code: errors, message: "Please add your password" })
  }

  const user = await User.findOne({ email: email })
  if (!user) {
    errors.push({ code: "error", message: "user does not exist" })
  }

  if (user) {
    const comparePass = await compare(password, user.password)
    if (!comparePass) {
      errors.push({ code: "error", message: "Incorrect password" })
    }
  }
  if (errors.length > 0) {
    res.status(200).json({ code: "error", errors })
  } else {
    res.status(200).json({
      code: "success",
      user: Object.keys(user.dataValues)
        .map((item) => {
          if (item === "password") {
            user[item] = ""
            return user
          }
        })
        .filter((item) => {
          if (item != null) {
            return item
          }
        })[0],
      token: createToken(user, process.env.SECRET, "4hr"),
    })
  }
}
