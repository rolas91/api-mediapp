import User from "../models/User.js";
import { genSalt, hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (user, secret, expiresIn) => {
  const { id, email } = user;
  return jwt.sign({ id, email }, secret, { expiresIn });
};

export const registerUser = async (req, res) => {
  let { names, lastnames, email, password, phone } = req.body;
  let errors = [];
  if (!names) {
    errors.push({ code: "error", message: "Please add your names" });
  }

  if (!lastnames) {
    errors.push({ code: "error", message: "Please add your lastnames" });
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

  const user = await User.findOne({ where: { email: email } });
  if (user) {
    errors.push({ code: "error", message: "User allready register" });
  }

  if (errors.length > 0) {
    res.status(500).json({ code: "error", errors: errors });
  } else {
    try {
      const salt = await genSalt(10);
      password = await hash(password, salt);
      const userSaved = await User.create({
        names,
        lastnames,
        email,
        password,
        phone,
      });
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
