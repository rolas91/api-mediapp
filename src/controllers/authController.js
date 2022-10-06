import User from "../models/User.js";
import UserMedicalData from "../models/UserMedicalData.js";
import Profile from "../models/Profile.js";
import DoctorInfo from "../models/DoctorInfo.js";
import { genSalt, hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { PROFILE_DOCTOR, PROFILE_USER } from "../utils/constants.js";

const createToken = (user, secret, expiresIn) => {
  const { id, email } = user;
  return jwt.sign({ id, email }, secret, { expiresIn });
};

export const registerUser = async (req, res) => {
  let {
    names,
    email,
    password,
    phone,
    birthday,
    id_number,
    blood_type,
    weight,
    height,
    age,
    profile_id,
    health_code,
    specialty_id,
  } = req.body;

  let errors = [];
  if (!profile_id) {
    errors.push({ code: "error", message: "Please selected profile" });
  }
  if (!names) {
    errors.push({ code: "error", message: "Please add your names" });
  }

  if (names.split(" ", 4).length < 4) {
    errors.push({ code: "error", message: "Please complete your names" });
  }

  if (!email) {
    errors.push({ code: "error", message: "Please add your email" });
  }

  if (!password) {
    errors.push({ code: "error", message: "Please add your password" });
  }
  if (!phone) {
    errors.push({ code: "error", message: "Please add your phone" });
  }
  if (!birthday) {
    errors.push({ code: "error", message: "Please add your birthday" });
  }
  if (!id_number) {
    errors.push({ code: "error", message: "Please add your ID" });
  }
  if (!blood_type) {
    errors.push({ code: "error", message: "Please add your blood type" });
  }
  if (!weight) {
    errors.push({ code: "error", message: "Please add your weight" });
  }
  if (!height) {
    errors.push({ code: "error", message: "Please add your height" });
  }
  if (!age) {
    errors.push({ code: "error", message: "Please add your age" });
  }
  const profile = await Profile.findOne({ where: { id: profile_id } });
  if (profile.code === PROFILE_DOCTOR) {
    if (!health_code) {
      errors.push({ code: "error", message: "Please add your health code" });
    }
    if (!specialty_id.length > 0) {
      errors.push({ code: "error", message: "Please add your specialities" });
    }
  }

  const user = await User.findOne({ where: { email: email } });
  if (user) {
    errors.push({ code: "error", message: "User allready register" });
  }

  const name = `${names.split(" ", 4)[0]} ${names.split(" ", 4)[1]}`;
  const lastname = `${names.split(" ", 4)[2]} ${names.split(" ", 4)[3]}`;
  if (errors.length > 0) {
    res.status(500).json({ code: "error", errors: errors });
  } else {
    try {
      const salt = await genSalt(10);
      password = await hash(password, salt);
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
      });
      if (profile.code === PROFILE_USER) {
        await UserMedicalData.create({
          blood_type,
          weight,
          height,
          age,
          userId: userSaved.id,
        });
      } else if (profile.code === PROFILE_DOCTOR) {
        await DoctorInfo.create({
          health_code: health_code,
          specialty_id: JSON.stringify(specialty_id),
        });
      }

      if (userSaved) {
        res.status(200).json({
          code: "success",
          user: { names: userSaved.names, lastname: userSaved.lastnames },
        });
      }
    } catch (error) {
      res.status(500).json({ code: "error", error });
    }
  }
};

export const authenticateUser = async (req, res) => {
  const { email, password } = req.body;
  let errors = [];
  if (!email) {
    errors.push({ code: errors, message: "Please add your email" });
  }
  if (!password) {
    errors.push({ code: errors, message: "Please add your password" });
  }

  const user = await User.findOne({ email: email });
  if (!user) {
    errors.push({ code: "error", message: "user does not exist" });
  }

  if (user) {
    const comparePass = await compare(password, user.password);
    if (!comparePass) {
      errors.push({ code: "error", message: "Incorrect password" });
    }
  }

  if (errors.length > 0) {
    res.status(200).json({ code: "error", errors });
  } else {
    res.status(200).json({
      code: "success",
      token: createToken(user, process.env.SECRET, "4hr"),
    });
  }
};
