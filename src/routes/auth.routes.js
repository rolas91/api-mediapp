import express from "express"
const router = express.Router()
import { check } from "express-validator"
import { validateFields } from "../middlewares/field-validators.js"
import { validatedJWT } from "../middlewares/jwt-validator.js"

import {
  authenticateUser,
  registerUser,
  registerDoctor,
  refreshToken,
} from "../controllers/authController.js"

export default function () {
  router.post(
    "/auth/register",
    [
      check("names", "Los nombres son obligatorios").not().isEmpty(),
      check("email", "El correo es obligatorio").isEmail(),
      check("password", "La contraseña es obligatoria").isLength({ min: 6 }),
      check("phone", "El número de teléfono es obligatorio").isNumeric(),
      check("birthday", "La fecha de su cumpleaños es obligatoria")
        .not()
        .isEmpty(),
      check("id_number", "Su cédula es obligatoria").not().isEmpty(),
      check("blood_type", "Su tipo de sangre es obligatorio").not().isEmpty(),
      check("weight", "Debe agregar su peso corporal").not().isEmpty(),
      check("height", "Debe agregar su altura").not().isEmpty(),
      check("age", "Diganos su edad").isNumeric(),
      check("country_id", "Seleccione el país en el que reside").isNumeric(),
      check(
        "city_id",
        "Seleccione la ciudad en la que se encuentra"
      ).isNumeric(),
      validateFields,
    ],
    registerUser
  )
  router.post(
    "/auth/doctor/register",
    [
      check("names", "Los nombres son obligatorios").not().isEmpty(),
      check("email", "El correo es obligatorio").isEmail(),
      check("password", "La contraseña es obligatoria").isLength({ min: 6 }),
      check("phone", "El número de teléfono es obligatorio").not().isEmpty(),
      check("birthday", "La fecha de su cumpleaños es obligatoria")
        .not()
        .isEmpty(),
      check("id_number", "Su cédula es obligatoria").not().isEmpty(),
      check("health_code", "Agrege su código sanitario").not().isEmpty(),
      check("specialty_id", "Seleccione su especialidad").isNumeric(),
      check("country_id", "Seleccione el país en el que reside").isNumeric(),
      check(
        "city_id",
        "Seleccione la ciudad en la que se encuentra"
      ).isNumeric(),
      validateFields,
    ],
    registerDoctor
  )
  router.post(
    "/auth/login",
    [
      check("email", "Correo electrónico es erroneo").isEmail(),
      check("password", "Password incorrecto").isLength({ min: 6 }),
      validateFields,
    ],
    authenticateUser
  )

  router.get("/refresh-token", validatedJWT, refreshToken)

  return router
}
